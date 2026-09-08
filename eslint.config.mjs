import { FlatCompat } from "@eslint/eslintrc";
const compat = new FlatCompat({ baseDirectory: import.meta.dirname });
export default [
  { ignores: [".next/**", "node_modules/**", "lib/beybladeParts.generated.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Existing canvas/export code requires raw image elements and typed migration
      // of the importer is separate work. Keep Next's useful diagnostics visible.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/no-unescaped-entities": "off",
      "@next/next/no-html-link-for-pages": "off",
    },
  },
  { files: ["tests/*.cjs"], rules: { "@typescript-eslint/no-require-imports": "off" } },
];
