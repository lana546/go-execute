import { addDaysIso, fmtDateLong, type Proposal } from "@/lib/proposal";
import { Page } from "./Page";

export function CoverPage({ p }: { p: Proposal }) {
  const info = [
    { label: "Preparado para", value: p.clientName },
    { label: "Empresa", value: p.clientCompany },
    { label: "Data", value: fmtDateLong(p.proposalDate) },
    { label: "Válida até", value: fmtDateLong(addDaysIso(p.proposalDate, p.validityDays)) },
  ];

  return (
    <Page radial>
      <div className="flex items-center justify-between">
        {p.logoDataUrl ? (
          <img src={p.logoDataUrl} alt={p.company} className="max-h-12 max-w-[200px] object-contain" />
        ) : (
          <span className="wordmark text-2xl">{p.company}</span>
        )}
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">Proposta</span>
      </div>

      <div className="flex flex-1 flex-col justify-center py-16">
        <div>
          <span className="chip chip-accent">{p.coverEyebrow}</span>
        </div>
        <h1 className="mt-8 font-display text-[52px] font-bold leading-[1.04] tracking-tight">
          {p.coverHeadline}
        </h1>
        <p className="mt-8 max-w-[145mm] text-[17px] leading-relaxed text-ink-dim">{p.coverSubtitle}</p>
        <p className="mt-10 font-mono text-xs uppercase tracking-[0.18em] text-accent">{p.offer}</p>
      </div>

      <div className="grid grid-cols-4 gap-5 border-t border-border-soft pt-6">
        {info.map((i) => (
          <div key={i.label}>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-dim">{i.label}</div>
            <div className="mt-1.5 text-[13px] font-medium leading-snug">{i.value}</div>
          </div>
        ))}
      </div>
    </Page>
  );
}
