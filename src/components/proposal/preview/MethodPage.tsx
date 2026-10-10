import type { Proposal } from "@/lib/proposal";
import { Page, SectionHeader } from "./Page";

export function MethodPage({ p, n }: { p: Proposal; n: string }) {
  return (
    <Page>
      <SectionHeader n={n} kicker="O Método" title="Como vamos chegar lá" />

      <div className="font-display text-[34px] font-bold leading-tight tracking-tight text-accent">
        {p.methodName}
      </div>
      <p className="mt-5 whitespace-pre-line text-[17px] leading-[1.65] text-ink-dim">{p.methodIntro}</p>

      {p.methodSteps.length > 0 && (
        <div className="mt-12">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">Os pilares</div>
          <div className="flex flex-wrap gap-3">
            {p.methodSteps.map((s, i) => (
              <span key={s.id} className="chip chip-accent !px-4 !py-2 !text-[12px]">
                <span className="opacity-70">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </span>
            ))}
          </div>
        </div>
      )}

      {p.milestones.length > 0 && (
        <div className="mt-16">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
            Linha do tempo
          </div>
          <div className="flex">
            {p.milestones.map((m, i) => (
              <div key={m.id} className="relative flex-1 pr-3">
                {i < p.milestones.length - 1 && (
                  <span className="absolute left-3 top-[6px] h-px w-full bg-accent opacity-40" />
                )}
                <span className="relative z-10 block h-3 w-3 rounded-full bg-accent shadow-[0_0_0_5px_var(--paper)]" />
                <div className="mt-4 text-[13px] font-medium leading-snug">{m.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Page>
  );
}
