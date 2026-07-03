"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ReactCompareSlider } from "react-compare-slider";
import { HexColorPicker } from "react-colorful";
import {
  ArrowRight, Check, Download, Eraser, Lasso,
  Paintbrush, RotateCcw, Undo2, Upload, Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  applyAdjustments, blobToImageData, buildCssFilter,
  buildSharpenKernelValues, canvasToBlob, DEFAULT_ADJUSTMENTS,
  imageDataToCanvas, refineAlphaEdges, type Adjustments,
} from "@/lib/imageEnhancement";

// ─── Constants ───────────────────────────────────────────────────────────────
const CHECKER: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(45deg,#2a2a2a 25%,transparent 25%)," +
    "linear-gradient(-45deg,#2a2a2a 25%,transparent 25%)," +
    "linear-gradient(45deg,transparent 75%,#2a2a2a 75%)," +
    "linear-gradient(-45deg,transparent 75%,#2a2a2a 75%)",
  backgroundSize: "16px 16px",
  backgroundPosition: "0 0,0 8px,8px -8px,-8px 0",
};

// ─── Sub-components ──────────────────────────────────────────────────────────
function AdjRow({ label, value, min, max, onChange, disabled }: {
  label: string; value: number; min: number; max: number;
  onChange: (v: number) => void; disabled?: boolean;
}) {
  return (
    <div className={`space-y-1.5 ${disabled ? "pointer-events-none opacity-30" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="font-condensed text-[11px] font-black uppercase tracking-[0.12em] text-white/50">{label}</span>
        <span className="font-mono text-[11px] text-white/40">{value > 0 ? `+${value}` : value}</span>
      </div>
      <Slider min={min} max={max} step={1} value={[value]} onValueChange={([v]) => onChange(v)} />
    </div>
  );
}

function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-white/8 pb-2 font-condensed text-[10px] font-black uppercase tracking-[0.18em] text-white/30">
      {children}
    </div>
  );
}

// ─── Types ───────────────────────────────────────────────────────────────────
type Stage = "idle" | "processing" | "done" | "error";
type BgMode = "transparent" | "color";
type Tool = "none" | "eraser" | "lasso" | "restore";

// ─── Page ────────────────────────────────────────────────────────────────────
export default function BgRemoverPage() {
  // core state
  const [stage, setStage] = useState<Stage>("idle");
  const [progress, setProgress] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // image data
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [rawData, setRawData] = useState<ImageData | null>(null);
  const [refinedUrl, setRefinedUrl] = useState<string | null>(null);
  const [refinedData, setRefinedData] = useState<ImageData | null>(null);

  // controls
  const [crispness, setCrispness] = useState(60);
  const [adj, setAdj] = useState<Adjustments>(DEFAULT_ADJUSTMENTS);
  const [bgMode, setBgMode] = useState<BgMode>("transparent");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // tools
  const [activeTool, setActiveTool] = useState<Tool>("none");
  const [brushSize, setBrushSize] = useState(20);
  const [canUndo, setCanUndo] = useState(false);

  // loading flags
  const [isRefining, setIsRefining] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const originalNameRef = useRef("image");
  const workingCanvasRef = useRef<HTMLCanvasElement>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const originalCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const snapshotCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const undoStackRef = useRef<ImageData[]>([]);
  const isDrawingRef = useRef(false);
  const prevPointRef = useRef<{ x: number; y: number } | null>(null);
  const lassoPathRef = useRef<Array<{ x: number; y: number }>>([]);
  const wasInToolModeRef = useRef(false);

  // ── CSS filter for real-time preview ──────────────────────────────────────
  const cssFilter = useMemo(() => {
    const sharpen = adj.sharpness > 0 ? "url(#bg-sharpen) " : "";
    const base = buildCssFilter(adj);
    return base === "none" ? sharpen.trim() || "none" : `${sharpen}${base}`;
  }, [adj]);

  const sharpenKernel = useMemo(() => buildSharpenKernelValues(adj.sharpness), [adj.sharpness]);

  // ── Close color picker on outside click ───────────────────────────────────
  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as Node))
        setShowColorPicker(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  // ── Edge refinement — only when rawData or crispness changes, never on tool exit ──
  useEffect(() => {
    // Guard with ref so this never fires when the user clicks "Done"
    if (!rawData || wasInToolModeRef.current) return;
    let cancelled = false;
    setIsRefining(true);
    const timer = setTimeout(async () => {
      const refined = refineAlphaEdges(rawData, crispness);
      if (cancelled) return;
      const canvas = imageDataToCanvas(refined);
      const blob = await canvasToBlob(canvas);
      if (cancelled) return;
      setRefinedData(refined);
      setRefinedUrl(prev => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob); });
      setIsRefining(false);
    }, 80);
    return () => { cancelled = true; clearTimeout(timer); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData, crispness]);

  // ── Initialize working canvas when entering a tool ────────────────────────
  useEffect(() => {
    if (activeTool === "none") return;

    // Only reinitialize when coming from compare mode (not switching between tools)
    if (!wasInToolModeRef.current && refinedData) {
      wasInToolModeRef.current = true;
      const canvas = workingCanvasRef.current!;
      canvas.width = refinedData.width;
      canvas.height = refinedData.height;
      canvas.getContext("2d")!.putImageData(refinedData, 0, 0);

      const snap = document.createElement("canvas");
      snap.width = refinedData.width;
      snap.height = refinedData.height;
      snap.getContext("2d")!.putImageData(refinedData, 0, 0);
      snapshotCanvasRef.current = snap;

      undoStackRef.current = [];
      setCanUndo(false);
    }
  }, [activeTool, refinedData]);

  // ── Exit tool mode: read canvas BEFORE React removes it from the DOM ──────
  const handleDoneEditing = useCallback(async () => {
    const canvas = workingCanvasRef.current;
    if (!canvas || !canvas.width) {
      wasInToolModeRef.current = false;
      setActiveTool("none");
      return;
    }
    setIsSyncing(true);
    const ctx = canvas.getContext("2d")!;
    const newData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setRefinedData(newData);
    const blob = await canvasToBlob(canvas);
    setRefinedUrl(prev => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(blob); });
    wasInToolModeRef.current = false;
    undoStackRef.current = [];
    setCanUndo(false);
    setIsSyncing(false);
    setActiveTool("none");
  }, []);

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (activeTool === "none") return;
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      }
      if (e.key === "Escape") handleDoneEditing();
      if (e.key === "[") setBrushSize(s => Math.max(4, s - 5));
      if (e.key === "]") setBrushSize(s => Math.min(200, s + 5));
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTool, handleDoneEditing]);

  // ─── Canvas helpers ────────────────────────────────────────────────────────
  function getCanvasPoint(clientX: number, clientY: number) {
    const canvas = workingCanvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  }

  function saveUndoSnapshot() {
    const canvas = workingCanvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    undoStackRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (undoStackRef.current.length > 30) undoStackRef.current.shift();
    setCanUndo(true);
  }

  function undo() {
    if (!undoStackRef.current.length) return;
    const canvas = workingCanvasRef.current!;
    canvas.getContext("2d")!.putImageData(undoStackRef.current.pop()!, 0, 0);
    setCanUndo(undoStackRef.current.length > 0);
  }

  function applyBrush(x1: number, y1: number, x2: number, y2: number) {
    const canvas = workingCanvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dist = Math.hypot(x2 - x1, y2 - y1);
    const steps = Math.max(1, Math.ceil(dist / (brushSize * 0.4)));

    if (activeTool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        ctx.beginPath();
        ctx.arc(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, brushSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
    } else if (activeTool === "restore") {
      const restoreSource = originalCanvasRef.current ?? snapshotCanvasRef.current;
      if (!restoreSource) return;
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const cx = x1 + (x2 - x1) * t;
        const cy = y1 + (y2 - y1) * t;
        const r = brushSize;
        const sx = Math.max(0, cx - r), sy = Math.max(0, cy - r);
        const sw = Math.min(canvas.width - sx, r * 2), sh = Math.min(canvas.height - sy, r * 2);
        const sourceScaleX = restoreSource.width / canvas.width;
        const sourceScaleY = restoreSource.height / canvas.height;
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(
          restoreSource,
          sx * sourceScaleX,
          sy * sourceScaleY,
          sw * sourceScaleX,
          sh * sourceScaleY,
          sx,
          sy,
          sw,
          sh,
        );
        ctx.restore();
      }
    }
  }

  function updateOverlay(clientX: number, clientY: number) {
    const overlay = overlayCanvasRef.current;
    const working = workingCanvasRef.current;
    if (!overlay || !working) return;
    const rect = working.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    overlay.width = rect.width * dpr;
    overlay.height = rect.height * dpr;
    overlay.style.width = `${rect.width}px`;
    overlay.style.height = `${rect.height}px`;

    const ctx = overlay.getContext("2d")!;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, rect.height);

    const dx = clientX - rect.left;
    const dy = clientY - rect.top;

    if (activeTool === "eraser" || activeTool === "restore") {
      const displayRadius = brushSize * (rect.width / working.width);
      ctx.beginPath();
      ctx.arc(dx, dy, displayRadius, 0, Math.PI * 2);
      ctx.strokeStyle = activeTool === "eraser" ? "rgba(255,80,80,0.85)" : "rgba(80,255,160,0.85)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(dx, dy, displayRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.lineWidth = 3;
      ctx.setLineDash([3, 3]);
      ctx.stroke();
      ctx.setLineDash([]);
    } else if (activeTool === "lasso" && lassoPathRef.current.length > 1) {
      const sx = rect.width / working.width;
      const sy = rect.height / working.height;
      const pts = lassoPathRef.current;
      ctx.beginPath();
      ctx.moveTo(pts[0].x * sx, pts[0].y * sy);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x * sx, pts[i].y * sy);
      ctx.strokeStyle = "rgba(0,0,0,0.5)";
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.setLineDash([]);
      // Close-path hint dot
      ctx.beginPath();
      ctx.arc(pts[0].x * sx, pts[0].y * sy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
    }
  }

  // ─── Mouse / touch events ─────────────────────────────────────────────────
  function handlePointerDown(clientX: number, clientY: number) {
    if (activeTool === "none") return;
    isDrawingRef.current = true;
    const pt = getCanvasPoint(clientX, clientY);
    prevPointRef.current = pt;

    if (activeTool === "eraser" || activeTool === "restore") {
      saveUndoSnapshot();
      applyBrush(pt.x, pt.y, pt.x, pt.y);
    } else if (activeTool === "lasso") {
      lassoPathRef.current = [pt];
    }
  }

  function handlePointerMove(clientX: number, clientY: number) {
    updateOverlay(clientX, clientY);
    if (!isDrawingRef.current) return;
    const pt = getCanvasPoint(clientX, clientY);
    const prev = prevPointRef.current ?? pt;
    prevPointRef.current = pt;

    if (activeTool === "eraser" || activeTool === "restore") {
      applyBrush(prev.x, prev.y, pt.x, pt.y);
    } else if (activeTool === "lasso") {
      lassoPathRef.current.push(pt);
      updateOverlay(clientX, clientY);
    }
  }

  function handlePointerUp() {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    prevPointRef.current = null;

    if (activeTool === "lasso" && lassoPathRef.current.length > 2) {
      const canvas = workingCanvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      saveUndoSnapshot();
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      const pts = lassoPathRef.current;
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.closePath();
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      // Clear lasso overlay
      const overlay = overlayCanvasRef.current;
      if (overlay) overlay.getContext("2d")!.clearRect(0, 0, overlay.width, overlay.height);
      lassoPathRef.current = [];
    }
  }

  function handlePointerLeave() {
    const overlay = overlayCanvasRef.current;
    if (overlay) overlay.getContext("2d")!.clearRect(0, 0, overlay.width, overlay.height);
    if (isDrawingRef.current) handlePointerUp();
  }

  // ─── File processing ───────────────────────────────────────────────────────
  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) { setError("Please upload an image file."); return; }
    originalNameRef.current = file.name.replace(/\.[^.]+$/, "");
    setOriginalUrl(URL.createObjectURL(file));
    setRawData(null); setRefinedData(null); setRefinedUrl(null);
    setError(null); setAdj(DEFAULT_ADJUSTMENTS); setCrispness(60);
    setActiveTool("none"); wasInToolModeRef.current = false;
    originalCanvasRef.current = null; snapshotCanvasRef.current = null;
    undoStackRef.current = []; setCanUndo(false);
    setStage("processing"); setProgress("Loading model…");

    try {
      originalCanvasRef.current = imageDataToCanvas(await blobToImageData(file));
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(file, {
        model: "isnet",
        output: { format: "image/png", quality: 1.0 },
        progress: (key: string, current: number, total: number) => {
          if (key.includes("fetch")) {
            const pct = total > 0 ? Math.round((current / total) * 100) : 0;
            setProgress(`Downloading model… ${pct}%`);
          } else { setProgress("Removing background…"); }
        },
      });
      setRawData(await blobToImageData(blob));
      setStage("done");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try a different image.");
      setStage("error");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleReset = () => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (refinedUrl) URL.revokeObjectURL(refinedUrl);
    setOriginalUrl(null); setRawData(null); setRefinedData(null); setRefinedUrl(null);
    setError(null); setStage("idle"); setAdj(DEFAULT_ADJUSTMENTS); setCrispness(60);
    setActiveTool("none"); wasInToolModeRef.current = false;
    originalCanvasRef.current = null; snapshotCanvasRef.current = null;
    undoStackRef.current = []; setCanUndo(false);
  };

  const handleDownload = async (format: "png" | "jpg") => {
    // If in tool mode, get data from canvas directly
    let sourceData = refinedData;
    if (activeTool !== "none" && workingCanvasRef.current) {
      const canvas = workingCanvasRef.current;
      sourceData = canvas.getContext("2d")!.getImageData(0, 0, canvas.width, canvas.height);
    }
    if (!sourceData) return;
    setIsExporting(true);
    try {
      const exportBg = format === "jpg" || bgMode === "color" ? bgColor : null;
      const processed = await applyAdjustments(sourceData, adj, exportBg);
      const canvas = imageDataToCanvas(processed);
      const mime = format === "jpg" ? "image/jpeg" : "image/png";
      const blob = await new Promise<Blob>((res, rej) =>
        canvas.toBlob(b => b ? res(b) : rej(), mime, format === "jpg" ? 0.95 : 1.0),
      );
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `${originalNameRef.current}_no-bg.${format}`;
      a.click();
      URL.revokeObjectURL(a.href);
    } finally { setIsExporting(false); }
  };

  const afterBg: React.CSSProperties = bgMode === "color" ? { background: bgColor } : CHECKER;
  const cursorStyle = activeTool === "lasso" ? "crosshair" : activeTool !== "none" ? "none" : "default";

  // ─── JSX ──────────────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-[#090909] text-foreground">
      {adj.sharpness > 0 && (
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="bg-sharpen" colorInterpolationFilters="sRGB">
              <feConvolveMatrix order="3" kernelMatrix={sharpenKernel} preserveAlpha="true" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#090909]/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
          <a href="/" className="flex items-center gap-3">
            <img src="/icon.png" alt="Leandro's Tool" className="h-10 w-10" draggable={false} />
            <span className="font-condensed text-sm font-black uppercase tracking-[0.18em] text-white">
              Leandro's Tool
            </span>
          </a>
          <div className="flex items-center gap-2">
            <a href="/#features" className="hidden px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.18em] text-white/60 transition hover:text-primary sm:inline-flex">Features</a>
            <a href="/bg-remover" className="hidden px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.18em] text-primary sm:inline-flex">BG Remover</a>
            <Button asChild className="font-condensed uppercase tracking-[0.12em]">
              <a href="/tool">Open Tool <ArrowRight className="h-4 w-4" /></a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Idle */}
      {stage === "idle" && (
        <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 font-condensed text-xs font-black uppercase text-primary">
              Free · Runs in browser · No upload
            </div>
            <h1 className="mt-4 font-display text-5xl leading-none text-white sm:text-6xl">Background Remover</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/60">
              Remove backgrounds with crisp edges, then fine-tune with the eraser, lasso, and restore tools.
            </p>
          </div>
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={`flex cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed p-16 transition-all ${
              isDragging ? "border-primary bg-primary/10" : "border-white/15 bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.04]"
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/12 text-primary">
              <Upload className="h-7 w-7" />
            </div>
            <div className="text-center">
              <div className="font-condensed text-base font-black uppercase tracking-[0.12em] text-white">Drop an image or click to browse</div>
              <div className="mt-1.5 text-xs text-white/40">JPG · PNG · WEBP — AI model ~40 MB, cached after first run</div>
            </div>
          </div>
        </div>
      )}

      {/* Processing */}
      {stage === "processing" && (
        <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center gap-6 px-5">
          <div className="relative h-16 w-16">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
          <div className="text-center">
            <div className="font-condensed text-sm font-black uppercase tracking-[0.18em] text-white">{progress || "Processing…"}</div>
            <div className="mt-1.5 text-xs text-white/40">First run downloads AI model — ~10–30 s; instant after</div>
          </div>
          {originalUrl && (
            <img src={originalUrl} alt="Preview" className="mt-2 max-h-48 max-w-xs rounded-xl border border-white/10 object-contain opacity-40" />
          )}
        </div>
      )}

      {/* Error */}
      {stage === "error" && (
        <div className="mx-auto flex max-w-lg flex-col items-center gap-5 px-5 py-20 text-center">
          <div className="font-condensed text-base font-black uppercase tracking-[0.12em] text-destructive">{error}</div>
          <Button variant="outline" onClick={handleReset} className="border-white/20 bg-white/5 font-condensed uppercase tracking-[0.12em]">
            <RotateCcw className="h-4 w-4" /> Try Again
          </Button>
        </div>
      )}

      {/* Done: editor layout */}
      {stage === "done" && (
        <div className="flex h-[calc(100vh-73px)] flex-col lg:flex-row">

          {/* ── Sidebar ── */}
          <aside className="flex-shrink-0 overflow-y-auto border-b border-white/10 bg-[#0d0d0d] lg:w-72 lg:border-b-0 lg:border-r">
            <div className="space-y-5 p-5">

              {/* File */}
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="truncate font-condensed text-xs font-black uppercase tracking-[0.12em] text-white">{originalNameRef.current}</div>
                  <div className="mt-0.5 text-[11px] text-white/40">{rawData ? `${rawData.width} × ${rawData.height} px` : ""}</div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}
                  className="flex-shrink-0 gap-1.5 font-condensed text-xs uppercase tracking-[0.1em] text-white/40 hover:text-white">
                  <RotateCcw className="h-3.5 w-3.5" /> Reset
                </Button>
              </div>

              {/* Tools */}
              <div className="space-y-3">
                <SectionHead>Tools</SectionHead>
                <div className="grid grid-cols-3 gap-1.5">
                  {([
                    { id: "eraser", label: "Eraser", Icon: Eraser },
                    { id: "lasso", label: "Lasso", Icon: Lasso },
                    { id: "restore", label: "Restore", Icon: Paintbrush },
                  ] as const).map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => setActiveTool(prev => prev === id ? "none" : id)}
                      className={`flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 transition ${
                        activeTool === id
                          ? "border-primary bg-primary/12 text-primary"
                          : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="font-condensed text-[10px] font-black uppercase tracking-[0.1em]">{label}</span>
                    </button>
                  ))}
                </div>

                {activeTool !== "none" && (
                  <div className="space-y-3">
                    {activeTool !== "lasso" && (
                      <AdjRow label="Brush Size" value={brushSize} min={4} max={200} onChange={setBrushSize} />
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={undo}
                        disabled={!canUndo}
                        className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 font-condensed text-[11px] font-black uppercase tracking-[0.1em] text-white/50 transition hover:border-white/20 hover:text-white/70 disabled:pointer-events-none disabled:opacity-30"
                      >
                        <Undo2 className="h-3.5 w-3.5" /> Undo
                      </button>
                      <button
                        onClick={handleDoneEditing}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-primary/40 bg-primary/10 px-3 py-2 font-condensed text-[11px] font-black uppercase tracking-[0.1em] text-primary transition hover:bg-primary/20"
                      >
                        <Check className="h-3.5 w-3.5" /> Done
                      </button>
                    </div>
                    <div className="text-[10px] leading-4 text-white/25">
                      {activeTool === "eraser" && "Paint to erase. [ ] keys resize brush."}
                      {activeTool === "lasso" && "Draw around excess area and release to remove it."}
                      {activeTool === "restore" && "Paint to restore removed areas. [ ] keys resize."}
                    </div>
                  </div>
                )}
              </div>

              {/* Edges — disabled in tool mode */}
              <div className="space-y-3">
                <SectionHead>Edges</SectionHead>
                <AdjRow label="Crispness" value={crispness} min={0} max={100} onChange={setCrispness} disabled={activeTool !== "none"} />
                {activeTool !== "none" && (
                  <div className="text-[10px] text-white/25">Exit editing mode to adjust edges</div>
                )}
                {isRefining && activeTool === "none" && (
                  <div className="font-condensed text-[10px] uppercase tracking-[0.12em] text-primary/60">Refining edges…</div>
                )}
              </div>

              {/* Background */}
              <div className="space-y-3">
                <SectionHead>Background</SectionHead>
                <div className="grid grid-cols-2 gap-2">
                  {(["transparent", "color"] as const).map(m => (
                    <button key={m} onClick={() => setBgMode(m)}
                      className={`rounded-lg border px-3 py-2.5 font-condensed text-xs font-black uppercase tracking-[0.1em] transition ${
                        bgMode === m ? "border-primary bg-primary/12 text-primary" : "border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70"
                      }`}>
                      {m === "transparent" ? "Transparent" : "Color"}
                    </button>
                  ))}
                </div>
                {bgMode === "color" && (
                  <div className="relative" ref={colorPickerRef}>
                    <button onClick={() => setShowColorPicker(v => !v)}
                      className="flex w-full items-center gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 transition hover:border-white/20">
                      <span className="h-5 w-5 flex-shrink-0 rounded border border-white/20" style={{ background: bgColor }} />
                      <span className="font-mono text-xs text-white/60">{bgColor.toUpperCase()}</span>
                    </button>
                    {showColorPicker && (
                      <div className="absolute left-0 top-full z-50 mt-2">
                        <HexColorPicker color={bgColor} onChange={setBgColor} />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Adjustments */}
              <div className="space-y-4">
                <SectionHead>Adjustments</SectionHead>
                <AdjRow label="Brightness" value={adj.brightness} min={-100} max={100} onChange={v => setAdj(a => ({ ...a, brightness: v }))} />
                <AdjRow label="Contrast" value={adj.contrast} min={-100} max={100} onChange={v => setAdj(a => ({ ...a, contrast: v }))} />
                <AdjRow label="Saturation" value={adj.saturation} min={-100} max={100} onChange={v => setAdj(a => ({ ...a, saturation: v }))} />
                <AdjRow label="Sharpness" value={adj.sharpness} min={0} max={100} onChange={v => setAdj(a => ({ ...a, sharpness: v }))} />
                {(adj.brightness !== 0 || adj.contrast !== 0 || adj.saturation !== 0 || adj.sharpness !== 0) && (
                  <button onClick={() => setAdj(DEFAULT_ADJUSTMENTS)}
                    className="font-condensed text-[11px] font-black uppercase tracking-[0.12em] text-white/30 transition hover:text-white/60">
                    Reset adjustments
                  </button>
                )}
              </div>

              {/* Export */}
              <div className="space-y-3">
                <SectionHead>Export</SectionHead>
                <Button onClick={() => handleDownload("png")} disabled={isExporting || isSyncing}
                  className="w-full font-condensed uppercase tracking-[0.12em]">
                  {isExporting
                    ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
                    : <Download className="h-4 w-4" />}
                  Download PNG
                </Button>
                <Button variant="outline" onClick={() => handleDownload("jpg")} disabled={isExporting || isSyncing}
                  className="w-full border-white/15 bg-white/[0.03] font-condensed uppercase tracking-[0.12em]">
                  <Download className="h-4 w-4" /> Download JPG
                </Button>
                <div className="text-[10px] text-white/25">PNG keeps transparency. JPG uses selected background.</div>
              </div>

            </div>
          </aside>

          {/* ── Preview / Canvas editor ── */}
          <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[#080808]">

            {/* Compare mode */}
            {activeTool === "none" && originalUrl && refinedUrl && (
              <>
                <div className="pointer-events-none absolute left-0 top-0 z-10 flex w-full items-start justify-between p-3">
                  <span className="rounded-md bg-black/60 px-2.5 py-1 font-condensed text-[10px] font-black uppercase tracking-[0.15em] text-white/50 backdrop-blur">Before</span>
                  <span className="rounded-md bg-black/60 px-2.5 py-1 font-condensed text-[10px] font-black uppercase tracking-[0.15em] text-white/50 backdrop-blur">After</span>
                </div>
                <div className="h-full w-full max-h-[640px] max-w-[960px] overflow-hidden rounded-xl border border-white/10 p-4">
                  <ReactCompareSlider
                    style={{ height: "100%", width: "100%", borderRadius: 8 }}
                    handle={
                      <div className="flex h-full cursor-col-resize items-center justify-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#090909]/90 shadow-lg backdrop-blur">
                          <Wand2 className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                    }
                    itemOne={
                      <div className="h-full w-full bg-[#111]">
                        <img src={originalUrl} alt="Original" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                      </div>
                    }
                    itemTwo={
                      <div className="h-full w-full" style={afterBg}>
                        <img src={refinedUrl} alt="Result" style={{ width: "100%", height: "100%", objectFit: "contain", filter: cssFilter }} />
                      </div>
                    }
                  />
                </div>
              </>
            )}

            {/* Tool canvas editor — always mounted so workingCanvasRef stays valid */}
            <div
              className="flex h-full w-full items-center justify-center p-6"
              style={{
                display: activeTool !== "none" ? "flex" : "none",
                ...(bgMode === "color" ? { background: bgColor } : CHECKER),
              }}
            >
                <div
                  className="relative"
                  style={{
                    aspectRatio: refinedData ? `${refinedData.width} / ${refinedData.height}` : "1 / 1",
                    maxWidth: "100%",
                    maxHeight: "100%",
                  }}
                >
                  <canvas
                    ref={workingCanvasRef}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      filter: cssFilter,
                      cursor: cursorStyle,
                      touchAction: "none",
                    }}
                    onMouseDown={e => handlePointerDown(e.clientX, e.clientY)}
                    onMouseMove={e => handlePointerMove(e.clientX, e.clientY)}
                    onMouseUp={handlePointerUp}
                    onMouseLeave={handlePointerLeave}
                    onTouchStart={e => { e.preventDefault(); handlePointerDown(e.touches[0].clientX, e.touches[0].clientY); }}
                    onTouchMove={e => { e.preventDefault(); handlePointerMove(e.touches[0].clientX, e.touches[0].clientY); }}
                    onTouchEnd={handlePointerUp}
                  />
                  <canvas
                    ref={overlayCanvasRef}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                  />
                </div>
            </div>

            {/* Refining overlay */}
            {(isRefining || isSyncing) && activeTool === "none" && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#0d0d0d]/80 px-5 py-3">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
                  <span className="font-condensed text-xs font-black uppercase tracking-[0.15em] text-white/60">
                    {isSyncing ? "Applying edits…" : "Refining edges…"}
                  </span>
                </div>
              </div>
            )}

            {/* Upload another */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-white/10 bg-[#0d0d0d]/80 px-3 py-2 font-condensed text-xs font-black uppercase tracking-[0.12em] text-white/40 backdrop-blur transition hover:border-white/20 hover:text-white/70"
            >
              <Upload className="h-3.5 w-3.5" /> New image
            </button>
          </div>
        </div>
      )}

      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

      <section className="border-t border-white/10 bg-white/[0.025]">
        <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
          <p className="font-condensed text-xs font-black uppercase tracking-[0.18em] text-primary">
            Background remover guide
          </p>
          <h2 className="mt-3 font-display text-4xl leading-none text-white">
            How the background remover works
          </h2>
          <div className="mt-8 grid gap-8 text-sm leading-7 text-white/65 md:grid-cols-3">
            <article>
              <h3 className="font-condensed text-lg font-black uppercase text-white">
                Everything runs locally
              </h3>
              <p className="mt-2">
                The cutout model runs in your browser tab, so your photo is never
                sent to a server or a third-party removal API. Closing the tab
                discards the image completely.
              </p>
            </article>
            <article>
              <h3 className="font-condensed text-lg font-black uppercase text-white">
                Clean up the edges
              </h3>
              <p className="mt-2">
                Use the crispness slider for a fast global fix, then switch to the
                eraser, lasso, or restore tool to correct stray hair, logos, or
                shadows the automatic cutout missed.
              </p>
            </article>
            <article>
              <h3 className="font-condensed text-lg font-black uppercase text-white">
                Export how you need it
              </h3>
              <p className="mt-2">
                Keep the background transparent for a PNG overlay, or swap in a
                solid color before exporting — useful for player photos dropped
                straight into a result card or pub mat.
              </p>
            </article>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-2">
            <article>
              <h2 className="font-display text-3xl leading-none text-white">
                Frequently asked questions
              </h2>
              <div className="mt-5 space-y-5 text-sm leading-7 text-white/65">
                <div>
                  <h3 className="font-condensed text-sm font-black uppercase text-white">
                    Do I need an account or API key?
                  </h3>
                  <p className="mt-1">No. Upload an image and the tool works immediately, free of charge.</p>
                </div>
                <div>
                  <h3 className="font-condensed text-sm font-black uppercase text-white">
                    What image formats are supported?
                  </h3>
                  <p className="mt-1">Standard photo formats such as JPG, PNG, and WebP. Export is a PNG so transparency is preserved.</p>
                </div>
              </div>
            </article>
            <article>
              <h2 className="font-display text-3xl leading-none text-white">
                Use it with the card generator
              </h2>
              <p className="mt-5 text-sm leading-7 text-white/65">
                Removing a background here is often the first step before adding a
                player photo, logo, or sponsor image to a{" "}
                <a className="text-primary underline" href="/tool">
                  tournament card or pub mat
                </a>
                . You remain responsible for having permission to use and publish
                any photo or logo you process.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
