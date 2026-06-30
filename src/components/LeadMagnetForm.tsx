'use client';
import { useState } from 'react';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';

type LeadType = 'tdah-ninos' | 'tdah-adultos';

interface Props {
  lead: LeadType;
  /** Texto que aparece sobre el formulario */
  headline?: string;
  /** Texto secundario */
  description?: string;
}

const LABELS: Record<LeadType, string> = {
  'tdah-ninos': 'el checklist TDAH para niños',
  'tdah-adultos': 'el checklist TDAH adultos',
};

export default function LeadMagnetForm({
  lead,
  headline = 'Descarga el checklist gratuito',
  description = 'Recíbelo en tu correo — sin spam, solo el PDF.',
}: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, lead }),
      });

      if (!res.ok) {
        const data = await res.json() as { error?: string };
        throw new Error(data.error ?? 'Error al enviar');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Error al enviar. Intenta de nuevo.');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-card border border-border rounded-2xl p-6 text-center">
        <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
        <p className="font-bold text-foreground text-base mb-1">¡Listo! Revisa tu correo</p>
        <p className="text-sm text-muted-foreground">
          Te enviamos {LABELS[lead]}. Si no lo ves, revisa la carpeta de spam.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-bold text-foreground text-sm leading-snug">{headline}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
        <input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/40 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
        />

        {status === 'error' && (
          <p className="text-xs text-red-500">{errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center justify-center gap-2 w-full bg-gradient-primary text-primary-foreground font-bold text-xs uppercase tracking-widest py-3.5 px-6 rounded-xl hover:opacity-90 transition-all disabled:opacity-60"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {status === 'loading' ? 'Enviando…' : 'Recibir checklist gratis'}
        </button>

        <p className="text-[10px] text-muted-foreground/50 text-center">
          Sin spam. Solo el PDF que pediste.
        </p>
      </form>
    </div>
  );
}
