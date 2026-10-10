import { ChevronDown, ChevronRight, ImagePlus, X } from "lucide-react";
import { useState, type ReactNode } from "react";

/** Grupo colapsável do painel lateral. */
export function Group({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = open ? ChevronDown : ChevronRight;
  return (
    <section className="border-b border-border-soft">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left font-display text-[14px] font-semibold hover:bg-ink/5"
        aria-expanded={open}
      >
        {title}
        <Icon className="h-4 w-4 text-ink-dim" />
      </button>
      {open && <div className="space-y-3.5 px-5 pb-5">{children}</div>}
    </section>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-ink-dim">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[11.5px] text-ink-dim">{hint}</span>}
    </label>
  );
}

export function TextInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
      className="field-input"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function TextArea({
  value,
  onChange,
  rows = 3,
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return <textarea className="field-input" rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />;
}

export function NumberInput({
  value,
  onChange,
  min = 0,
  step = 1,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  step?: number;
}) {
  return (
    <input
      type="number"
      className="field-input"
      min={min}
      step={step}
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => onChange(Number(e.target.value) || 0)}
    />
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-[13px]">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[var(--accent)]"
      />
      {label}
    </label>
  );
}

/** Upload de logo → data URL (fica salvo junto com a proposta). */
export function LogoUpload({
  value,
  onChange,
}: {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
}) {
  const handleFile = (file?: File) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Escolha uma imagem de até 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-3">
      <label className="btn-ghost cursor-pointer !px-3 !py-2 text-[12.5px]">
        <ImagePlus className="h-4 w-4" />
        {value ? "Trocar logo" : "Enviar logo"}
        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
      </label>
      {value && (
        <>
          <img src={value} alt="Logo" className="h-9 max-w-[90px] rounded bg-white/90 object-contain p-1" />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="text-ink-dim hover:text-ink"
            aria-label="Remover logo"
          >
            <X className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}

/** Botão pequeno de ícone (adicionar / remover / mover). */
export function IconButton({
  onClick,
  label,
  disabled,
  children,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border-soft text-ink-dim transition-colors hover:bg-ink/10 hover:text-ink disabled:opacity-30"
    >
      {children}
    </button>
  );
}
