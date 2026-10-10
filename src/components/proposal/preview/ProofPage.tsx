import type { Proposal } from "@/lib/proposal";
import { Page, SectionHeader } from "./Page";

export function ProofPage({ p, n }: { p: Proposal; n: string }) {
  const initial = (p.consultant.trim()[0] || "?").toUpperCase();

  return (
    <Page>
      <SectionHeader n={n} kicker="Prova e autoridade" title="Quem vai conduzir" />

      <div className="flex gap-6">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent font-display text-[34px] font-bold text-on-accent">
          {initial}
        </div>
        <div>
          <div className="font-display text-[24px] font-bold leading-tight">{p.consultant}</div>
          <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
            {p.consultantRole}
          </div>
          <p className="mt-3 text-[14.5px] leading-relaxed">{p.bioText}</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-ink-dim">{p.bioCredentials}</p>
        </div>
      </div>

      {p.metricsLine && (
        <div className="no-break mt-8 rounded-2xl border border-accent bg-paper-2 px-6 py-5 text-center font-display text-[20px] font-semibold leading-snug">
          {p.metricsLine}
        </div>
      )}

      {p.testimonials.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
            Quem já passou por aqui
          </div>
          {p.testimonials.slice(0, 3).map((t) => (
            <figure key={t.id} className="no-break rounded-2xl border border-border-soft bg-paper-2 p-5">
              <div className="flex items-start justify-between gap-4">
                <figcaption>
                  <div className="text-[14px] font-semibold">{t.name}</div>
                  <div className="text-[12px] text-ink-dim">{t.company}</div>
                </figcaption>
                {t.result && <span className="chip chip-accent !tracking-normal">{t.result}</span>}
              </div>
              <blockquote className="mt-3 text-[13.5px] leading-relaxed text-ink-dim">“{t.text}”</blockquote>
            </figure>
          ))}
        </div>
      )}
    </Page>
  );
}
