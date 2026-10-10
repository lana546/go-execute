import { slugify } from "./proposal";

/**
 * Renderiza cada `.a4-page` como imagem e monta um PDF A4 multipágina.
 * As bibliotecas pesadas são importadas só na hora do export.
 */
export async function exportProposalPdf(clientCompany: string) {
  const pages = Array.from(document.querySelectorAll<HTMLElement>(".a4-page"));
  if (pages.length === 0) return;

  document.body.classList.add("pdf-exporting");
  try {
    await document.fonts?.ready;
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const { toPng } = await import("html-to-image");
    const { jsPDF } = await import("jspdf");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4", compress: true });

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const dataUrl = await toPng(page, {
        pixelRatio: 2.5,
        cacheBust: true,
        backgroundColor: getComputedStyle(page).backgroundColor,
      });
      if (i > 0) pdf.addPage("a4", "portrait");

      // Mantém a proporção caso uma página passe de 297 mm de altura.
      const ratio = page.offsetHeight / page.offsetWidth;
      const h = Math.min(297, 210 * ratio);
      const w = h < 210 * ratio ? h / ratio : 210;
      pdf.addImage(dataUrl, "PNG", (210 - w) / 2, 0, w, h, undefined, "FAST");
    }

    pdf.save(`proposta-${slugify(clientCompany)}.pdf`);
  } finally {
    document.body.classList.remove("pdf-exporting");
  }
}
