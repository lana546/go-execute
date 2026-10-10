import { nanoid } from "nanoid";
import { create as createStore } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import { TEMPLATES, type TemplateKey } from "./templates";

/* =========================================================
 * Tipos
 * ======================================================= */

export type ThemeId = "dark-gold" | "dark-indigo" | "light-editorial" | "minimal-mono";
export type FontPairId = "modern" | "editorial" | "classic" | "tech" | "minimal" | "serif-bold";
export type PayMode = "cartao" | "pix" | "boleto";
export type SectionId =
  | "diagnostico"
  | "metodo"
  | "valuestack"
  | "prova"
  | "investimento"
  | "fechamento";

export interface Section {
  id: SectionId;
  enabled: boolean;
}
export interface ListItem {
  id: string;
  title: string;
}
export interface Deliverable {
  id: string;
  title: string;
  desc: string;
  value: number;
  bonus?: boolean;
}
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  result: string;
  text: string;
}

export interface Proposal {
  id: string;
  createdAt: string;
  updatedAt: string;

  // Marca
  company: string;
  logoDataUrl?: string;
  accent: string;
  theme: ThemeId;
  fontPair: FontPairId;

  // Cliente
  clientName: string;
  clientCompany: string;

  // Proposta
  offer: string;
  proposalDate: string;
  validityDays: number;
  consultant: string;
  consultantRole: string;

  sections: Section[];

  // Capa
  coverEyebrow: string;
  coverHeadline: string;
  coverSubtitle: string;

  // Diagnóstico
  diagnosisText: string;
  monthlyPainCost: number;

  // Método
  methodName: string;
  methodIntro: string;
  methodSteps: ListItem[];
  milestones: ListItem[];

  // Value stack
  deliverables: Deliverable[];

  // Prova
  bioText: string;
  bioCredentials: string;
  metricsLine: string;
  testimonials: Testimonial[];

  // Investimento
  payMode: PayMode;
  cardInstallment: number;
  cardCount: number;
  pixValue: number;
  pixDiscount: number;
  boletoInstallment: number;
  boletoCount: number;
  guaranteeEnabled: boolean;
  guaranteeText: string;
  urgencyReason: string;
  fullPriceText: string;

  // Fechamento
  closingMessage: string;
  ctaText: string;
}

/* =========================================================
 * Catálogos (temas, fontes, seções)
 * ======================================================= */

export const THEMES: { id: ThemeId; label: string; accent: string; swatch: string[] }[] = [
  { id: "dark-gold", label: "Dark Gold", accent: "#d9a94a", swatch: ["#12141a", "#d9a94a", "#7075f0"] },
  { id: "dark-indigo", label: "Dark Indigo", accent: "#7075f0", swatch: ["#10121c", "#7075f0", "#d9a94a"] },
  { id: "light-editorial", label: "Light Editorial", accent: "#a37918", swatch: ["#ffffff", "#a37918", "#2d3a8c"] },
  { id: "minimal-mono", label: "Minimal Mono", accent: "#ffffff", swatch: ["#111111", "#ffffff", "#cfcfcf"] },
];

export const FONT_PAIRS: { id: FontPairId; label: string; sample: string; family: string }[] = [
  { id: "modern", label: "Moderna", sample: "Space Grotesk + Inter", family: "'Space Grotesk'" },
  { id: "editorial", label: "Editorial", sample: "Fraunces + Inter", family: "'Fraunces'" },
  { id: "classic", label: "Clássica", sample: "Playfair + Lora", family: "'Playfair Display'" },
  { id: "tech", label: "Tech", sample: "Manrope + JetBrains", family: "'Manrope'" },
  { id: "minimal", label: "Minimalista", sample: "Inter + Inter", family: "'Inter'" },
  { id: "serif-bold", label: "Serifa forte", sample: "DM Serif + DM Sans", family: "'DM Serif Display'" },
];

export const SECTION_LABELS: Record<SectionId, string> = {
  diagnostico: "Diagnóstico",
  metodo: "O Método",
  valuestack: "Value Stack",
  prova: "Prova e autoridade",
  investimento: "Investimento",
  fechamento: "Fechamento",
};

export const DEFAULT_SECTIONS: Section[] = (Object.keys(SECTION_LABELS) as SectionId[]).map((id) => ({
  id,
  enabled: true,
}));

/* =========================================================
 * Utilitários
 * ======================================================= */

export const fmtBRL = (n: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(n) ? n : 0);

const MONTHS = [
  "janeiro", "fevereiro", "março", "abril", "maio", "junho",
  "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
];

export const todayIso = () => {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
};

/** "2026-07-14" → "14 de julho de 2026" */
export const fmtDateLong = (iso: string) => {
  const [y, m, d] = (iso || todayIso()).split("-").map(Number);
  if (!y || !m || !d) return "";
  return `${d} de ${MONTHS[m - 1]} de ${y}`;
};

export const addDaysIso = (iso: string, days: number) => {
  const [y, m, d] = (iso || todayIso()).split("-").map(Number);
  const date = new Date(Date.UTC(y, (m || 1) - 1, d || 1));
  date.setUTCDate(date.getUTCDate() + (Number(days) || 0));
  return date.toISOString().slice(0, 10);
};

/** Soma de todos os itens do Value Stack (inclui bônus). */
export const valueStackSum = (p: Proposal) => p.deliverables.reduce((s, d) => s + (Number(d.value) || 0), 0);

/** Preço real cobrado, conforme a forma de pagamento. */
export const realPrice = (p: Proposal) => {
  if (p.payMode === "cartao") return p.cardInstallment * p.cardCount;
  if (p.payMode === "boleto") return p.boletoInstallment * p.boletoCount;
  return p.pixValue - (p.pixValue * p.pixDiscount) / 100;
};

export const pricePerDay = (p: Proposal) => realPrice(p) / 365;

/** Texto principal do preço: "12x de R$ 997" ou "R$ 9.700 à vista". */
export const mainPriceLabel = (p: Proposal) => {
  if (p.payMode === "cartao") return `${p.cardCount}x de ${fmtBRL(p.cardInstallment)}`;
  if (p.payMode === "boleto") return `${p.boletoCount}x de ${fmtBRL(p.boletoInstallment)}`;
  return `${fmtBRL(realPrice(p))} à vista`;
};

/** Linha de apoio abaixo do preço principal. */
export const priceSubLabel = (p: Proposal) => {
  if (p.payMode === "cartao") return `ou ${fmtBRL(realPrice(p))} no total, no cartão de crédito`;
  if (p.payMode === "boleto") return `total de ${fmtBRL(realPrice(p))} em boletos mensais`;
  return p.pixDiscount > 0
    ? `${p.pixDiscount}% de desconto sobre ${fmtBRL(p.pixValue)} no Pix`
    : "pagamento via Pix";
};

export const slugify = (s: string) =>
  (s || "cliente")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "cliente";

/** Cor de texto legível sobre a cor de destaque. */
export const readableOn = (hex: string) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return "#0a0b0f";
  const n = parseInt(m[1], 16);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  return (r * 299 + g * 587 + b * 114) / 1000 > 140 ? "#0a0b0f" : "#ffffff";
};

/* =========================================================
 * Templates → Proposal
 * ======================================================= */

export function fromTemplate(key: TemplateKey, overrides: Partial<Proposal> = {}): Proposal {
  const t = TEMPLATES.find((x) => x.key === key) ?? TEMPLATES[0];
  const { methodSteps, milestones, deliverables, testimonials, ...rest } = t.data;
  const now = new Date().toISOString();

  return {
    id: nanoid(10),
    createdAt: now,
    updatedAt: now,
    company: "Sua Empresa",
    accent: t.accent,
    theme: t.theme,
    fontPair: t.fontPair,
    clientName: "Nome do cliente",
    clientCompany: "Empresa do cliente",
    proposalDate: todayIso(),
    consultant: "Seu Nome",
    consultantRole: t.consultantRole,
    sections: DEFAULT_SECTIONS.map((s) => ({ ...s })),
    ...rest,
    methodSteps: methodSteps.map((title) => ({ id: nanoid(6), title })),
    milestones: milestones.map((title) => ({ id: nanoid(6), title })),
    deliverables: deliverables.map((d) => ({ ...d, id: nanoid(6) })),
    testimonials: testimonials.map((x) => ({ ...x, id: nanoid(6) })),
    ...overrides,
  };
}

/* =========================================================
 * Store (Zustand + persist em localStorage)
 * ======================================================= */

interface ProposalsState {
  proposals: Record<string, Proposal>;
  create: (p: Proposal) => string;
  update: (id: string, patch: Partial<Proposal>) => void;
  remove: (id: string) => void;
}

// No servidor (SSR) não existe localStorage — usamos um storage vazio.
const noopStorage: StateStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };

export const useProposals = createStore<ProposalsState>()(
  persist(
    (set) => ({
      proposals: {},
      create: (p) => {
        set((s) => ({ proposals: { ...s.proposals, [p.id]: p } }));
        return p.id;
      },
      update: (id, patch) =>
        set((s) => {
          const current = s.proposals[id];
          if (!current) return s;
          return {
            proposals: {
              ...s.proposals,
              [id]: { ...current, ...patch, updatedAt: new Date().toISOString() },
            },
          };
        }),
      remove: (id) =>
        set((s) => {
          const { [id]: _removed, ...rest } = s.proposals;
          return { proposals: rest };
        }),
    }),
    {
      name: "proposals-v1",
      storage: createJSONStorage(() => (typeof window === "undefined" ? noopStorage : window.localStorage)),
    },
  ),
);
