import { useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState(""); //var per messaggio di errore 
  const [values, setValues] = useState({ name: "", email: "", message: "" }); //stato dei valori nel form

  //calcola se il form è pronto per essere inviato: tutti i campi devono essere non vuoti e non deve essere già in corso un invio
  const canSubmit = useMemo(() => {
    const nameOk = values.name.trim().length > 0;
    const emailOk = values.email.trim().length > 0;
    const msgOk = values.message.trim().length > 0;
    return nameOk && emailOk && msgOk && status !== "sending";
  }, [status, values]);

  //invio del form, gestisce comunicazione con SUpabase
  async function onSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    //se le var di ambiente non sono configurate
    if (!supabase) {
      setStatus("error");
      setErrorMsg(
        "Configurazione Supabase mancante. Contatta l'amministratore del sito."
      );
      return;
    }

    //prepara i dati da inviare
    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };

    //post dei dati su supabase
    const { error } = await supabase.from("contact_messages").insert([payload]);

    //se l'inserimento fallisce, mostra messaggio di errore
    if (error) {
      setStatus("error");
      setErrorMsg(error.message || "Errore durante l'invio.");
      return;
    }

    //status = success e reset dei valori del form
    setStatus("success");
    setValues({ name: "", email: "", message: "" });
  }

  return (
    <main className="min-h-screen px-4 py-28 md:px-8">
      
      <div className="mx-auto w-full max-w-xl rounded-2xl border border-blue-300 bg-transparent p-6 shadow-xl/10 md:p-10">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-wide text-[#0a2342] md:text-4xl">
            Contattami
          </h1>
          {/* Link per tornare alla home */}
          <a
            href="/"
            className="rounded-full border border-blue-300 px-4 py-2 text-sm font-semibold text-[#0a2342] transition-all duration-150 hover:-translate-y-1 hover:bg-blue-300 hover:text-white"
          >
            Torna alla home
          </a>
        </div>
        {/*Form di contatto */}
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            {/* Nome */}
            <label className="mb-1 block text-sm font-semibold text-[#0a2342]">
              Nome
            </label>
            <input
              value={values.name}
              onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              type="text"
              className="w-full rounded-lg border border-blue-300 bg-transparent p-2.5 text-sm outline-none ring-blue-400 focus:ring transition-all duration-150 focus:mt-1.5"
              placeholder="Il tuo nome"
              required
              autoComplete="name"
            />
          </div>

          <div>
            {/* Email */}
            <label className="mb-1 block text-sm font-semibold text-[#0a2342]">
              Email
            </label>
            <input
              value={values.email}
              onChange={(e) =>
                setValues((v) => ({ ...v, email: e.target.value }))
              }
              type="email"
              className="w-full rounded-lg border border-blue-300 bg-transparent p-2.5 text-sm outline-none ring-blue-400 focus:ring transition-all duration-150 focus:mt-1.5"
              placeholder="nome@email.com"
              required
              autoComplete="email"
            />
          </div>
          {/* Messaggio */}
          <div>
            <label className="mb-1 block text-sm font-semibold text-[#0a2342]">
              Messaggio
            </label>
            <textarea
              value={values.message}
              onChange={(e) =>
                setValues((v) => ({ ...v, message: e.target.value }))
              }
              rows={6}
              className="w-full resize-none rounded-lg border border-blue-300 bg-transparent p-2.5 text-sm outline-none ring-blue-400 focus:ring transition-all duration-150 focus:mt-1.5"
              placeholder="Scrivi qui..."
              required
            />
          </div>

          {/* Bottone di invio */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Invio in corso..." : "Invia"}
          </button>

          {/* Messaggio di successo dopo l'invio*/}
          {status === "success" && (
            <p className="rounded-lg border border-green-300 bg-green-50 p-3 text-sm text-green-800">
              Messaggio inviato correttamente. Ti risponderò appena possibile.
            </p>
          )}

          {/* Messaggio di errore durante l'invio*/}
          {status === "error" && (
            <p className="rounded-lg border border-red-300 bg-red-50 p-3 text-sm text-red-800">
              {errorMsg || "Errore durante l'invio."}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

export default ContactPage;

