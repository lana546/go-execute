import { fmtBRL, valueStackSum, type Proposal } from "@/lib/proposal";
import { Page, SectionHeader } from "./Page";

export function ValueStackPage({ p, n }: { p: Proposal; n: string }) {
  const regular = p.deliverables.filter((d) => !d.bonus);
  const bonuses = p.deliverables.filter((d) => d.bonus);

  return (
    <Page>
      <SectionHeader n={n} kicker="Value Stack" title="Tudo o que você recebe" />

      <ul className="space-y-5">
        {regular.map((d) => (
          <li key={d.id} className="no-break">
            <div className="flex items-baseline gap-2">
              <span className="gold-check font-display text-[18px] font-semibold leading-snug">{d.title}</span>
              <span className="dot-lead" />
              <span className="chip chip-accent !tracking-normal">{fmtBRL(d.value)}</span>
            </div>
            <p className="mt-1 pl-[1.7em] text-[13.5px] leading-relaxed text-ink-dim">{d.desc}</p>
          </li>
        ))}
      </ul>

      {bonuses.length > 0 && (
        <div className="mt-8 space-y-3">
          {bonuses.map((b) => (
            <div key={b.id} className="bonus-card no-break flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">Bônus</div>
                <div className="mt-1 font-display text-[16px] font-semibold">{b.title}</div>
                <div className="mt-0.5 text-[12.5px] text-ink-dim">{b.desc}</div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-[14px] text-ink-dim line-through">{fmtBRL(b.value)}</div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                  Incluso nesta proposta
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="no-break mt-auto border-t border-border-soft pt-8">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
          Valor total se contratado separadamente
        </div>
        <div className="mt-2 font-display text-[56px] font-bold leading-none tracking-tight text-ink-dim line-through decoration-accent decoration-[3px]">
          {fmtBRL(valueStackSum(p))}
        </div>
      </div>
    </Page>
  );
}
