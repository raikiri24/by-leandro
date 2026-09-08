export function ContentNav() {
  return <nav aria-label="Tools and guides" className="border-b border-white/10 bg-[#090909] px-5 py-3 text-sm text-white/80">
    <div className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-2">
      <a href="/" className="py-2 hover:text-primary">Home</a>
      <a href="/tool" className="py-2 hover:text-primary">Card generator</a>
      <a href="/deck-builder" className="py-2 hover:text-primary">Deck builder</a>
      <a href="/bg-remover" className="py-2 hover:text-primary">Background remover</a>
      <a href="/articles" className="py-2 hover:text-primary">Guides</a>
      <a href="/faq" className="py-2 hover:text-primary">Help</a>
    </div>
  </nav>;
}
