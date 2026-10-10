import { Link } from "@tanstack/react-router";
import { nanoid } from "nanoid";
import { ArrowDown, ArrowLeft, ArrowUp, FileDown, Plus, X } from "lucide-react";
import {
  FONT_PAIRS,
  SECTION_LABELS,
  THEMES,
  addDaysIso,
  fmtDateLong,
  useProposals,
  type Deliverable,
  type ListItem,
  type PayMode,
  type Proposal,
  type Testimonial,
} from "@/lib/proposal";
import {
  Field,
  Group,
  IconButton,
  LogoUpload,
  NumberInput,
  TextArea,
  TextInput,
  Toggle,
} from "./fields";

interface Props {
  p: Proposal;
  exporting: boolean;
  onExport: () => void;
}

const PAY_MODES: { id: PayMode; label: string }[] = [
  { id: "cartao", label: "Cartão" },
  { id: "pix", label: "Pix" },
  { id: "boleto", label: "Boleto" },
];

export function EditorPanel({ p, exporting, onExport }: Props) {
  const update = useProposals((s) => s.update);
  const set = (patch: Partial<Proposal>) => update(p.id, patch);

  /* ---- helpers de listas ---- */
  const patchItem = <T extends { id: string }>(list: T[], id: string, patch: Partial<T>) =>
    list.map((x) => (x.id === id ? { ...x, ...patch } : x));

  const moveSection = (index: number, dir: -1 | 1) => {
    const next = [...p.sections];
    const target = index + dir;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    set({ sections: next });
  };

  const addDeliverable = () =>
    set({ deliverables: [...p.deliverables, { id: nanoid(6), title: "Novo item", desc: "", value: 0 }] });

  const addTestimonial = () =>
    set({
      testimonials: [...p.testimonials, { id: nanoid(6), name: "", company: "", result: "", text: "" }],
    });

  return (
    <aside className="flex w-full flex-col border-r border-border-soft bg-paper lg:sticky lg:top-0 lg:h-screen lg:w-[380px] lg:shrink-0 lg:overflow-y-auto">
      {/* Cabeçalho fixo */}
      <div className="sticky top-0 z-20 space-y-3 border-b border-border-soft bg-paper px-5 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-1.5 text-[13px] text-ink-dim hover:text-ink">
            <ArrowLeft className="h-4 w-4" />
            Nova proposta
          </Link>
          <span className="flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-dim">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Auto-salvo
          </span>
        </div>
        <button type="button" className="btn-accent w-full" onClick={onExport} disabled={exporting}>
          <FileDown className="h-4 w-4" />
          {exporting ? "Gerando PDF…" : "Exportar PDF"}
        </button>
      </div>

      {/* A · Marca */}
      <Group title="A · Sua marca" defaultOpen>
        <Field label="Nome da empresa">
          <TextInput value={p.company} onChange={(company) => set({ company })} />
        </Field>
        <Field label="Logo">
          <LogoUpload value={p.logoDataUrl} onChange={(logoDataUrl) => set({ logoDataUrl })} />
        </Field>
        <Field label="Cor de destaque">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={p.accent}
              onChange={(e) => set({ accent: e.target.value })}
              className="h-9 w-12 cursor-pointer rounded-lg border border-border-soft bg-transparent p-0.5"
            />
            <span className="font-mono text-xs text-ink-dim">{p.accent.toUpperCase()}</span>
          </div>
        </Field>
        <Field label="Tema">
          <div className="grid grid-cols-2 gap-2">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => set({ theme: t.id, accent: t.accent })}
                className={`rounded-xl border p-2.5 text-left text-[12.5px] transition-colors ${
                  p.theme === t.id ? "border-accent bg-accent/10" : "border-border-soft hover:bg-ink/5"
                }`}
              >
                <span className="mb-2 flex gap-1">
                  {t.swatch.map((c) => (
                    <span key={c} className="h-3.5 w-3.5 rounded-full border border-border-soft" style={{ background: c }} />
                  ))}
                </span>
                {t.label}
              </button>
            ))}
          </div>
        </Field>
        <Field label="Fontes">
          <div className="grid grid-cols-2 gap-2">
            {FONT_PAIRS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => set({ fontPair: f.id })}
                className={`rounded-xl border p-2.5 text-left transition-colors ${
                  p.fontPair === f.id ? "border-accent bg-accent/10" : "border-border-soft hover:bg-ink/5"
                }`}
              >
                <span className="block text-[17px] leading-tight" style={{ fontFamily: f.family }}>
                  Aa
                </span>
                <span className="mt-1 block text-[12px] font-medium">{f.label}</span>
                <span className="block text-[10.5px] text-ink-dim">{f.sample}</span>
              </button>
            ))}
          </div>
        </Field>
      </Group>

      {/* B · Cliente */}
      <Group title="B · Cliente">
        <Field label="Nome do contato">
          <TextInput value={p.clientName} onChange={(clientName) => set({ clientName })} />
        </Field>
        <Field label="Empresa do cliente">
          <TextInput value={p.clientCompany} onChange={(clientCompany) => set({ clientCompany })} />
        </Field>
      </Group>

      {/* C · Proposta */}
      <Group title="C · Proposta">
        <Field label="Oferta / serviço">
          <TextInput value={p.offer} onChange={(offer) => set({ offer })} />
        </Field>
        <Field label="Data da proposta">
          <input
            type="date"
            className="field-input"
            value={p.proposalDate}
            onChange={(e) => e.target.value && set({ proposalDate: e.target.value })}
          />
        </Field>
        <Field
          label="Validade (dias)"
          hint={`Válida até ${fmtDateLong(addDaysIso(p.proposalDate, p.validityDays))}`}
        >
          <NumberInput value={p.validityDays} onChange={(validityDays) => set({ validityDays })} />
        </Field>
        <Field label="Seu nome">
          <TextInput value={p.consultant} onChange={(consultant) => set({ consultant })} />
        </Field>
        <Field label="Seu cargo">
          <TextInput value={p.consultantRole} onChange={(consultantRole) => set({ consultantRole })} />
        </Field>
      </Group>

      {/* D · Seções */}
      <Group title="D · Seções do documento">
        <p className="text-[12px] text-ink-dim">Ative, desative e reordene as páginas após a capa.</p>
        <ul className="space-y-2">
          {p.sections.map((s, i) => (
            <li
              key={s.id}
              className="flex items-center justify-between gap-2 rounded-xl border border-border-soft bg-paper-2 px-3 py-2"
            >
              <Toggle
                checked={s.enabled}
                label={SECTION_LABELS[s.id]}
                onChange={(enabled) =>
                  set({ sections: p.sections.map((x) => (x.id === s.id ? { ...x, enabled } : x)) })
                }
              />
              <div className="flex gap-1">
                <IconButton label="Mover para cima" disabled={i === 0} onClick={() => moveSection(i, -1)}>
                  <ArrowUp className="h-3.5 w-3.5" />
                </IconButton>
                <IconButton
                  label="Mover para baixo"
                  disabled={i === p.sections.length - 1}
                  onClick={() => moveSection(i, 1)}
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      </Group>

      {/* Capa */}
      <Group title="Capa">
        <Field label="Chamada superior">
          <TextInput value={p.coverEyebrow} onChange={(coverEyebrow) => set({ coverEyebrow })} />
        </Field>
        <Field label="Título principal">
          <TextArea rows={4} value={p.coverHeadline} onChange={(coverHeadline) => set({ coverHeadline })} />
        </Field>
        <Field label="Subtítulo">
          <TextArea value={p.coverSubtitle} onChange={(coverSubtitle) => set({ coverSubtitle })} />
        </Field>
      </Group>

      {/* Diagnóstico */}
      <Group title="Diagnóstico">
        <Field label="Texto do diagnóstico">
          <TextArea rows={6} value={p.diagnosisText} onChange={(diagnosisText) => set({ diagnosisText })} />
        </Field>
        <Field label="Custo mensal do problema (R$)" hint="Use 0 para ocultar a projeção de 6 e 12 meses.">
          <NumberInput value={p.monthlyPainCost} onChange={(monthlyPainCost) => set({ monthlyPainCost })} />
        </Field>
      </Group>

      {/* Método */}
      <Group title="O Método">
        <Field label="Nome do método">
          <TextInput value={p.methodName} onChange={(methodName) => set({ methodName })} />
        </Field>
        <Field label="Introdução">
          <TextArea rows={6} value={p.methodIntro} onChange={(methodIntro) => set({ methodIntro })} />
        </Field>
        <StringList
          label="Pilares"
          items={p.methodSteps}
          onChange={(methodSteps) => set({ methodSteps })}
        />
        <StringList
          label="Linha do tempo"
          items={p.milestones}
          onChange={(milestones) => set({ milestones })}
        />
      </Group>

      {/* Value Stack */}
      <Group title="Value Stack">
        {p.deliverables.map((d) => (
          <div key={d.id} className="space-y-2 rounded-xl border border-border-soft bg-paper-2 p-3">
            <div className="flex gap-2">
              <TextInput
                value={d.title}
                placeholder="Título"
                onChange={(title) => set({ deliverables: patchItem<Deliverable>(p.deliverables, d.id, { title }) })}
              />
              <IconButton
                label="Remover item"
                onClick={() => set({ deliverables: p.deliverables.filter((x) => x.id !== d.id) })}
              >
                <X className="h-3.5 w-3.5" />
              </IconButton>
            </div>
            <TextInput
              value={d.desc}
              placeholder="Descrição em uma frase"
              onChange={(desc) => set({ deliverables: patchItem<Deliverable>(p.deliverables, d.id, { desc }) })}
            />
            <div className="flex items-center gap-3">
              <div className="w-32">
                <NumberInput
                  value={d.value}
                  onChange={(value) => set({ deliverables: patchItem<Deliverable>(p.deliverables, d.id, { value }) })}
                />
              </div>
              <Toggle
                label="É bônus"
                checked={!!d.bonus}
                onChange={(bonus) => set({ deliverables: patchItem<Deliverable>(p.deliverables, d.id, { bonus }) })}
              />
            </div>
          </div>
        ))}
        <button type="button" className="btn-ghost w-full" onClick={addDeliverable}>
          <Plus className="h-4 w-4" /> Adicionar item
        </button>
      </Group>

      {/* Prova */}
      <Group title="Prova e autoridade">
        <Field label="Sua bio">
          <TextArea rows={4} value={p.bioText} onChange={(bioText) => set({ bioText })} />
        </Field>
        <Field label="Credenciais">
          <TextInput value={p.bioCredentials} onChange={(bioCredentials) => set({ bioCredentials })} />
        </Field>
        <Field label="Frase de resultados">
          <TextInput value={p.metricsLine} onChange={(metricsLine) => set({ metricsLine })} />
        </Field>
        {p.testimonials.map((t, i) => {
          const patch = (x: Partial<Testimonial>) =>
            set({ testimonials: patchItem<Testimonial>(p.testimonials, t.id, x) });
          return (
            <div key={t.id} className="space-y-2 rounded-xl border border-border-soft bg-paper-2 p-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-dim">
                  Depoimento {i + 1}
                </span>
                <IconButton
                  label="Remover depoimento"
                  onClick={() => set({ testimonials: p.testimonials.filter((x) => x.id !== t.id) })}
                >
                  <X className="h-3.5 w-3.5" />
                </IconButton>
              </div>
              <TextInput value={t.name} placeholder="Nome" onChange={(name) => patch({ name })} />
              <TextInput value={t.company} placeholder="Empresa" onChange={(company) => patch({ company })} />
              <TextInput value={t.result} placeholder="Resultado (ex.: 3x em 90 dias)" onChange={(result) => patch({ result })} />
              <TextArea value={t.text} onChange={(text) => patch({ text })} />
            </div>
          );
        })}
        {p.testimonials.length < 3 && (
          <button type="button" className="btn-ghost w-full" onClick={addTestimonial}>
            <Plus className="h-4 w-4" /> Adicionar depoimento
          </button>
        )}
      </Group>

      {/* Investimento */}
      <Group title="Investimento">
        <Field label="Forma de pagamento">
          <div className="grid grid-cols-3 gap-2">
            {PAY_MODES.map((m) => (
              <label
                key={m.id}
                className={`cursor-pointer rounded-xl border px-3 py-2 text-center text-[13px] transition-colors ${
                  p.payMode === m.id ? "border-accent bg-accent/10" : "border-border-soft hover:bg-ink/5"
                }`}
              >
                <input
                  type="radio"
                  name="payMode"
                  className="sr-only"
                  checked={p.payMode === m.id}
                  onChange={() => set({ payMode: m.id })}
                />
                {m.label}
              </label>
            ))}
          </div>
        </Field>

        {p.payMode === "cartao" && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nº de parcelas">
              <NumberInput value={p.cardCount} onChange={(cardCount) => set({ cardCount })} min={1} />
            </Field>
            <Field label="Valor da parcela">
              <NumberInput value={p.cardInstallment} onChange={(cardInstallment) => set({ cardInstallment })} />
            </Field>
          </div>
        )}
        {p.payMode === "pix" && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Valor (R$)">
              <NumberInput value={p.pixValue} onChange={(pixValue) => set({ pixValue })} />
            </Field>
            <Field label="Desconto (%)">
              <NumberInput value={p.pixDiscount} onChange={(pixDiscount) => set({ pixDiscount })} />
            </Field>
          </div>
        )}
        {p.payMode === "boleto" && (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nº de boletos">
              <NumberInput value={p.boletoCount} onChange={(boletoCount) => set({ boletoCount })} min={1} />
            </Field>
            <Field label="Valor do boleto">
              <NumberInput value={p.boletoInstallment} onChange={(boletoInstallment) => set({ boletoInstallment })} />
            </Field>
          </div>
        )}

        <Toggle
          label="Incluir garantia"
          checked={p.guaranteeEnabled}
          onChange={(guaranteeEnabled) => set({ guaranteeEnabled })}
        />
        {p.guaranteeEnabled && (
          <Field label="Texto da garantia">
            <TextArea value={p.guaranteeText} onChange={(guaranteeText) => set({ guaranteeText })} />
          </Field>
        )}
        <Field label="Motivo de urgência">
          <TextArea value={p.urgencyReason} onChange={(urgencyReason) => set({ urgencyReason })} />
        </Field>
        <Field
          label="Preço cheio (texto)"
          hint="Opcional. Vazio = soma automática do Value Stack."
        >
          <TextInput
            value={p.fullPriceText}
            placeholder="Ex.: R$ 46.500"
            onChange={(fullPriceText) => set({ fullPriceText })}
          />
        </Field>
      </Group>

      {/* Fechamento */}
      <Group title="Fechamento">
        <Field label="Mensagem final">
          <TextArea rows={4} value={p.closingMessage} onChange={(closingMessage) => set({ closingMessage })} />
        </Field>
        <Field label="Texto do botão (CTA)">
          <TextInput value={p.ctaText} onChange={(ctaText) => set({ ctaText })} />
        </Field>
      </Group>

      <div className="h-10" />
    </aside>
  );
}

/** Lista editável de títulos (pilares e linha do tempo). */
function StringList({
  label,
  items,
  onChange,
}: {
  label: string;
  items: ListItem[];
  onChange: (items: ListItem[]) => void;
}) {
  return (
    <Field label={label}>
      <div className="space-y-2">
        {items.map((it) => (
          <div key={it.id} className="flex gap-2">
            <TextInput
              value={it.title}
              onChange={(title) => onChange(items.map((x) => (x.id === it.id ? { ...x, title } : x)))}
            />
            <IconButton label="Remover" onClick={() => onChange(items.filter((x) => x.id !== it.id))}>
              <X className="h-3.5 w-3.5" />
            </IconButton>
          </div>
        ))}
        <button
          type="button"
          className="btn-ghost w-full !py-1.5"
          onClick={() => onChange([...items, { id: nanoid(6), title: "" }])}
        >
          <Plus className="h-4 w-4" /> Adicionar
        </button>
      </div>
    </Field>
  );
}
