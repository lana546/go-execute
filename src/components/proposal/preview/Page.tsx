import type { ReactNode } from "react";

/** Uma página A4 do documento. `radial` usa o fundo com brilhos de destaque. */
export function Page({ radial = false, children }: { radial?: boolean; children: ReactNode }) {
  return (
    <section className={`a4-page ${radial ? "paper-radial" : "paper"} flex flex-col`}>{children}</section>
  );
}

/** Cabeçalho de seção: kicker mono + número em destaque + título gigante. */
export function SectionHeader({ n, kicker, title }: { n: string; kicker: string; title: string }) {
  return (
    <header className="mb-10">
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-dim">
        <span className="text-sm text-accent">{n}</span>
        <span className="h-px w-10 bg-accent opacity-60" />
        <span>{kicker}</span>
      </div>
      <h2 className="mt-4 font-display text-[44px] font-bold leading-[1.05] tracking-tight">{title}</h2>
    </header>
  );
}
