# Fabio Tognarelli - Portfolio Personale

![Banner Principale](../public/screenshots/desktop-preview.png)

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

## 🛠️ Tech Stack

Ecco le tecnologie e gli strumenti utilizzati per realizzare questo progetto:

| Categoria           | Tecnologie                          |
| :------------------ | :---------------------------------- |
| **Build Tool**      | Vite                                |
| **Database**        | Supabase                            |
| **Frontend**        | React, Tailwind CSS, Headless UI    |
| **Code Quality**    | Prettier (Tailwind Plugin), ESLint  |
| **Version Control** | Git & GitHub                        |
| **Deployment**      | Vercel                              |
| **Design & Assets** | Canva (editing immagini), HeroIcons |

## 📸 Anteprima

### Desktop View

![Desktop Screenshot](../public/screenshots/desktop-preview.png)

### Mobile View

<img src="../public/screenshots/mobile-preview.png" alt="Mobile Preview" width="260" />

### Form Page

<img src="../public/screenshots/form-preview.png" alt="Form Preview" width="260" />

### Form Page

![Desktop Screenshot](/public/screenshots/form-preview.png)

## 🚀 Come avviare il progetto in locale

Come far girare questo progetto in locale:

**Prerequisiti:**
Assicurati di avere installato [Node.js](https://nodejs.org/) e `pnpm`.

1.  **Clona il repository:**

    ```bash
    git clone https://fabiotognaa-personal-portfolio.vercel.app
    ```

2.  **Entra nella cartella:**

    ```bash
    cd fabiotognaa-personal-portfolio
    ```

3.  **Installa le dipendenze:**

    ```bash
    pnpm install
    ```

4.  **Avvia il server di sviluppo:**

    ```bash
    pnpm dev
    ```

5.  Apri il browser all'indirizzo `localhost` presente sul tuo terminale.

## 📂 Struttura del Progetto

````text
```text
├── public/                     # File statici
│   ├── screenshots/            # Immagini per il README
│   ├── cv-tognarelli-fabio.pdf # Curriculum vitae
│   └── me-acquerelli.svg       # Icone/Loghi
│
├── src/
│   ├── assets/                 # File immagine e SVG
│   ├── components/
│   │   ├── pages/              # Pagine/route (es. Home/Contact)
│   │   ├── sections/           # Sezioni riutilizzate nella pagina
│   │   └── ui/                 # Componenti UI riutilizzabili
│   ├── lib/                    # Utilità (es. client Supabase)
│   ├── main.jsx                # Entry point React
│   ├── index.css               # Stili globali
│   └── App.jsx                 # Componente principale
│
├── index.html                  # Entry point HTML
└── [config files]              # Config (Vite, Tailwind, ESLint, Vercel)
````

## 📬 Contatti

Se hai domande o vuoi collaborare, non esitare a contattarmi!

Website: https://fabiotognaa-personal-portfolio.vercel.app

LinkedIn: https://www.linkedin.com/in/fabio-tognarelli/

Email: fabiotognaa@gmail.com

Realizzato con ❤️ da Fabio Tognarelli.
