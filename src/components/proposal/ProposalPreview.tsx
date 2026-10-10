import type { CSSProperties } from "react";
import { readableOn, type Proposal, type SectionId } from "@/lib/proposal";
import { ClosingPage } from "./preview/ClosingPage";
import { CoverPage } from "./preview/CoverPage";
import { DiagnosisPage } from "./preview/DiagnosisPage";
import { InvestmentPage } from "./preview/InvestmentPage";
import { MethodPage } from "./preview/MethodPage";
import { ProofPage } from "./preview/ProofPage";
import { ValueStackPage } from "./preview/ValueStackPage";

const PAGES: Record<SectionId, (props: { p: Proposal; n: string }) => React.ReactElement> = {
  diagnostico: DiagnosisPage,
  metodo: MethodPage,
  valuestack: ValueStackPage,
  prova: ProofPage,
  investimento: InvestmentPage,
  fechamento: ClosingPage,
};

/** Documento completo: capa + seções habilitadas, na ordem definida pelo usuário. */
export function ProposalPreview({ p }: { p: Proposal }) {
  const style = {
    "--accent": p.accent,
    "--on-accent": readableOn(p.accent),
  } as CSSProperties;

  const enabled = p.sections.filter((s) => s.enabled);

  return (
    <div id="print-root" data-theme={p.theme} data-font={p.fontPair} style={style}>
      <CoverPage p={p} />
      {enabled.map((s, i) => {
        const PageComponent = PAGES[s.id];
        return <PageComponent key={s.id} p={p} n={String(i + 1).padStart(2, "0")} />;
      })}
    </div>
  );
}
