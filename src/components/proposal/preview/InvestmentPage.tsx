import { ShieldCheck } from "lucide-react";
import {
  addDaysIso,
  fmtBRL,
  fmtDateLong,
  mainPriceLabel,
  pricePerDay,
  priceSubLabel,
  valueStackSum,
  type Proposal,
} from "@/lib/proposal";
import { Page, SectionHeader } from "./Page";

export function InvestmentPage({ p, n }: { p: Proposal; n: string }) {
  const anchor = p.fullPriceText.trim() || fmtBRL(valueStackSum(p));
  const perDay = Math.max(1, Math.ceil(pricePerDay(p)));

  return (
    <Page radial>
      <SectionHeader n={n} kicker="Investimento" title="Seu investimento" />

      <div className="text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-dim">De</div>
        <div className="mt-1 font-display text-[54px] font-bold leading-none tracking-tight text-ink-dim line-through decoration-accent decoration-[3px]">
          {anchor}
        </div>
      </div>

      <div className="invest-card no-break mt-8 px-8 py-9 text-center">
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Por apenas</div>
        <div className="mt-3 font-display text-[54px] font-bold leading-none tracking-tight">
          {mainPriceLabel(p)}
        </div>
        <div className="mt-3 text-[14px] text-ink-dim">{priceSubLabel(p)}</div>
        <div className="mt-5">
          <span className="chip chip-accent !tracking-normal">Menos de {fmtBRL(perDay)} por dia</span>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {p.guaranteeEnabled && (
          <div className="no-break flex items-start gap-4 rounded-2xl border border-border-soft bg-paper-2 p-5">
            <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-accent" strokeWidth={1.75} />
            <div>
              <div className="font-display text-[16px] font-semibold">Garantia de resultado</div>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-dim">{p.guaranteeText}</p>
            </div>
          </div>
        )}
        <div className="no-break rounded-2xl border border-border-soft bg-paper-2 p-5">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
            Válida até {fmtDateLong(addDaysIso(p.proposalDate, p.validityDays))}
          </div>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-dim">{p.urgencyReason}</p>
        </div>
      </div>
    </Page>
  );
}
