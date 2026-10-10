import { fmtBRL, type Proposal } from "@/lib/proposal";
import { Page, SectionHeader } from "./Page";

export function DiagnosisPage({ p, n }: { p: Proposal; n: string }) {
  const cost = Number(p.monthlyPainCost) || 0;
  const cards = [
    { label: "Custo por mês", value: cost, highlight: false },
    { label: "Em 6 meses", value: cost * 6, highlight: false },
    { label: "Em 12 meses", value: cost * 12, highlight: true },
  ];

  return (
    <Page>
      <SectionHeader n={n} kicker="Diagnóstico" title="Onde você está hoje" />
      <p className="whitespace-pre-line text-[19px] leading-[1.65]">{p.diagnosisText}</p>

      {cost > 0 && (
        <div className="mt-14">
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">
            O preço de não resolver
          </div>
          <div className="grid grid-cols-3 gap-4">
            {cards.map((c) => (
              <div
                key={c.label}
                className={`no-break rounded-2xl border p-5 ${
                  c.highlight ? "border-accent bg-paper-2" : "border-border-soft bg-paper-2"
                }`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">{c.label}</div>
                <div
                  className={`mt-3 font-display text-[28px] font-bold leading-none tracking-tight ${
                    c.highlight ? "text-accent" : ""
                  }`}
                >
                  {fmtBRL(c.value)}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] text-ink-dim">
            Estimativa em oportunidades, retrabalho e receita que deixam de entrar.
          </p>
        </div>
      )}
    </Page>
  );
}
