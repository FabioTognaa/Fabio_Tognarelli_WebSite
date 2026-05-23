import { useMemo, useState } from "react";
import PageShell from "../layout/PageShell";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { supabase } from "../../lib/supabaseClient";

function validateContactForm(values) {
  const errors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) {
    errors.name = "Inserisci il tuo nome.";
  }

  if (!email) {
    errors.email = "Inserisci la tua email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Formato non valido. Esempio: nome@email.com";
  }

  if (!message) {
    errors.message = "Scrivi un messaggio.";
  }

  return errors;
}

function FieldError({ id, message }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-error-text">
      {message}
    </p>
  );
}

function ContactPage() {
  const [status, setStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [values, setValues] = useState({ name: "", email: "", message: "" });

  const canSubmit = useMemo(() => {
    const nameOk = values.name.trim().length > 0;
    const emailOk = values.email.trim().length > 0;
    const msgOk = values.message.trim().length > 0;
    return nameOk && emailOk && msgOk && status !== "sending";
  }, [status, values]);

  function clearFieldError(field) {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current;
      }
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    clearFieldError(field);
    if (formError) {
      setFormError("");
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    const errors = validateContactForm(values);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setFormError("");
      setStatus("idle");
      const firstInvalid = ["name", "email", "message"].find((field) => errors[field]);
      if (firstInvalid) {
        document.getElementById(`contact-${firstInvalid}`)?.focus();
      }
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setFormError("");

    if (!supabase) {
      setStatus("error");
      setFormError(
        "Il modulo non è configurato. Scrivimi a fabiotognaa@gmail.com.",
      );
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    const { error } = await supabase.from("contact_messages").insert([payload]);

    if (error) {
      setStatus("error");
      setFormError(
        error.message ||
          "Non sono riuscito a inviare il messaggio. Riprova tra poco.",
      );
      return;
    }

    setStatus("success");
    setValues({ name: "", email: "", message: "" });
  }

  return (
    <PageShell>
      <div className="section-pad mx-auto max-w-xl">
        <Reveal>
          <p className="section-label">Contatto</p>
          <h1 className="section-heading mt-3">Parliamone</h1>
          <p className="prose-body mt-4">
            Opportunità di stage, collaborazioni o domande sul mio percorso: rispondo
            appena possibile.
          </p>
        </Reveal>

        <Reveal
          as="form"
          className="surface-panel mt-10 space-y-5 p-6 md:p-8"
          delay={120}
          onSubmit={onSubmit}
          noValidate
        >
          <div>
            <label
              htmlFor="contact-name"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              Nome
            </label>
            <input
              id="contact-name"
              name="name"
              value={values.name}
              onChange={(e) => updateField("name", e.target.value)}
              type="text"
              className="motion-field w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 text-base text-ink sm:text-sm"
              placeholder="Il tuo nome"
              autoComplete="name"
              aria-invalid={fieldErrors.name ? "true" : undefined}
              aria-describedby={
                fieldErrors.name ? "contact-name-error" : undefined
              }
            />
            <FieldError id="contact-name-error" message={fieldErrors.name} />
          </div>

          <div>
            <label
              htmlFor="contact-email"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              value={values.email}
              onChange={(e) => updateField("email", e.target.value)}
              type="email"
              className="motion-field w-full rounded-xl border border-line bg-canvas/50 px-4 py-3 text-base text-ink sm:text-sm"
              placeholder="nome@email.com"
              autoComplete="email"
              aria-invalid={fieldErrors.email ? "true" : undefined}
              aria-describedby={
                fieldErrors.email ? "contact-email-error" : undefined
              }
            />
            <FieldError id="contact-email-error" message={fieldErrors.email} />
          </div>

          <div>
            <label
              htmlFor="contact-message"
              className="mb-1.5 block text-sm font-semibold text-ink"
            >
              Messaggio
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={values.message}
              onChange={(e) => updateField("message", e.target.value)}
              rows={6}
              className="motion-field w-full resize-none rounded-xl border border-line bg-canvas/50 px-4 py-3 text-base text-ink sm:text-sm"
              placeholder="Di cosa vuoi parlare?"
              aria-invalid={fieldErrors.message ? "true" : undefined}
              aria-describedby={
                fieldErrors.message ? "contact-message-error" : undefined
              }
            />
            <FieldError
              id="contact-message-error"
              message={fieldErrors.message}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
            aria-live="polite"
          >
            {status === "sending" ? "Invio in corso..." : "Invia messaggio"}
          </button>

          {status === "success" && (
            <p
              role="status"
              className="rounded-xl border border-success-border bg-success-surface p-4 text-sm text-success-text"
            >
              Messaggio inviato. Ti risponderò appena possibile.
            </p>
          )}

          {status === "error" && formError && (
            <p
              role="alert"
              className="rounded-xl border border-error-border bg-error-surface p-4 text-sm text-error-text"
            >
              {formError}
            </p>
          )}
        </Reveal>

        <Reveal delay={200}>
          <Button variant="ghost" to="/" className="mt-8">
            Torna alla home
          </Button>
        </Reveal>
      </div>
    </PageShell>
  );
}

export default ContactPage;
