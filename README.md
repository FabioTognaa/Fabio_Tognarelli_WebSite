# Fabio Tognarelli - Portfolio Personale

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://fabiotognaa-personal-portfolio.vercel.app)

## 👋 Introduzione

Benvenuto nel repository del mio portfolio personale!

Ho sviluppato questo sito web per presentarmi professionalmente e raccogliere i miei progetti in un unico spazio. Attualmente, come studente accademico, il mio obiettivo principale era creare una **Proof of Work** concreta che dimostrasse le mie competenze di sviluppo Frontend, fungendo contemporaneamente da vetrina per i miei lavori futuri.

Il progetto è costruito con un approccio moderno, pulito e focalizzato sulle performance.

## ✨ Funzionalità Principali

- **Design Responsivo:** Layout fluido ottimizzato per desktop, tablet e smartphone.
- **Interfaccia Moderna:** Stile minimalista e pulito realizzato con Tailwind CSS.
- **Accessibilità:** Menu di navigazione e interazioni gestite con **Headless UI** per la massima accessibilità.
- **Architettura a Componenti:** Struttura modulare basata su React per la massima manutenibilità.
- **Download CV:** Accesso diretto al curriculum vitae aggiornato.
- **Form di contatto:** Pagina dedicata con invio messaggi tramite Supabase (opzionale in locale).
- **Routing multipagina:** Home, progetti e contatto con React Router.

## 🛠️ Tech Stack

Ecco le tecnologie e gli strumenti utilizzati per realizzare questo progetto:

| Categoria           | Tecnologie                                     |
| :------------------ | :--------------------------------------------- |
| **Build Tool**      | Vite                                           |
| **Database**        | Supabase                                       |
| **Backend**         | FastAPI (Python), Uvicorn                     |
| **Frontend**        | React, React Router, Tailwind CSS, Headless UI |
| **Code Quality**    | Prettier (Tailwind Plugin), ESLint             |
| **Version Control** | Git & GitHub                                   |
| **Deployment**      | Vercel                                         |
| **Design & Assets** | Canva (editing immagini), HeroIcons            |

## 📸 Anteprima

### Desktop View

<img src="./Frontend/docs/screenshots/desktop-preview.png" alt="Desktop Preview" width="260" />


### Contact Page

<img src="./Frontend/docs/screenshots/form-preview.png" alt="Contact form preview" width="260" />


### Project Page

_Screenshot in arrivo._

## 🚀 Come avviare il progetto in locale

Come far girare questo progetto in locale:

**Prerequisiti:**
Assicurati di avere installato [Node.js](https://nodejs.org/) e [pnpm](https://pnpm.io/) (il repo dichiara `pnpm@10.32.0` in `package.json`).

1.  **Clona il repository:**

    ```bash
    git clone https://github.com/FabioTognaa/fabiotognaa-personal-portfolio.git
    ```

2.  **Entra nella cartella:**

    ```bash
    cd fabiotognaa-personal-portfolio
    ```

3.  **Installa le dipendenze:**

    ```bash
    pnpm install
    ```

4.  **Configura le variabili d'ambiente (opzionale, per il form di contatto):**

    ```bash
    cp .env.example .env
    ```

    Modifica `.env` con `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` dal [dashboard Supabase](https://supabase.com/dashboard/project/_/settings/api). Senza queste variabili il sito si avvia comunque, ma l'invio dal form di contatto non è disponibile.

5.  **Avvia il server di sviluppo:**

    ```bash
    pnpm dev
    ```

6.  Apri il browser su `http://localhost:5173` (o sull'URL indicato nel terminale).

### Altri comandi utili

| Comando               | Descrizione                         |
| :-------------------- | :---------------------------------- |
| `pnpm build`          | Build di produzione in `dist/`      |
| `pnpm preview`        | Anteprima locale della build        |
| `pnpm lint`           | Controllo ESLint                    |
| `pnpm deploy`         | Build + deploy produzione su Vercel |
| `pnpm deploy:preview` | Build + deploy preview su Vercel    |

## 📂 Struttura del Progetto
```text
├── Frontend/
│   ├── index.html
│   ├── public/
│   │   ├── cv-tognarelli-fabio.pdf
│   │   └── images/
│   │       ├── logos/
│   │       └── tognarelli-*.webp
│   ├── docs/
│   │   └── screenshots/
│   │       ├── desktop-preview.png
│   │       └── form-preview.png
│   ├── src/
│   │   ├── assets/                 # icone skill e loghi (SVG)
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── pages/
│   │   │   ├── sections/
│   │   │   └── ui/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── main.jsx
│   │   └── index.css
│   └── dist/                      # output build (generato)
│
├── Backend/
│   ├── .env.example
│   ├── requirements.txt
│   └── setup/
│       └── README.md
│
├── .env.example                   # Supabase vars (frontend)
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
├── eslint.config.js
├── .prettierrc
└── vercel.json
```

## 📬 Contatti

Se hai domande o vuoi collaborare, non esitare a contattarmi!

Website: https://fabiotognaa-personal-portfolio.vercel.app

LinkedIn: https://www.linkedin.com/in/fabio-tognarelli/

Email: fabiotognaa@gmail.com

Realizzato con ❤️ da Fabio Tognarelli.
