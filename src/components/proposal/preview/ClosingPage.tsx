import { addDaysIso, fmtDateLong, type Proposal } from "@/lib/proposal";
import { Page, SectionHeader } from "./Page";

export function ClosingPage({ p, n }: { p: Proposal; n: string }) {
  return (
    <Page radial>
      <SectionHeader n={n} kicker="Fechamento" title="Próximo passo" />

      <p className="whitespace-pre-line text-[22px] leading-[1.55]">{p.closingMessage}</p>

      <div className="mt-10">
        <span className="chip chip-accent !px-7 !py-4 !text-[15px] !tracking-[0.08em]">{p.ctaText}</span>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-12 pt-24">
        <div>
          <div className="border-t border-ink pt-2 opacity-90" />
          <div className="text-[13px] font-semibold">Pela empresa</div>
          <div className="mt-0.5 text-[12px] text-ink-dim">
            {p.consultant} · {p.company}
          </div>
        </div>
        <div>
          <div className="border-t border-ink pt-2 opacity-90" />
          <div className="text-[13px] font-semibold">De acordo</div>
          <div className="mt-0.5 text-[12px] text-ink-dim">
            {p.clientName} · {p.clientCompany}
          </div>
        </div>
      </div>

      <footer className="mt-12 border-t border-border-soft pt-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
        Proposta válida até {fmtDateLong(addDaysIso(p.proposalDate, p.validityDays))}
      </footer>
    </Page>
  );
}
