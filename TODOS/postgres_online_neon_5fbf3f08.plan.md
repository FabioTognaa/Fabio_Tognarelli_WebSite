---
name: Postgres online Neon
overview: Piano didattico per imparare FastAPI + SQLAlchemy async + Alembic + Postgres su Neon. Supabase resta attivo per il form in produzione; Neon è il laboratorio del backend fino al deploy (fase successiva).
todos:
  - id: neon-setup
    content: Creare progetto Neon, copiare credenziali direct (+ pooled per futuro deploy)
    status: pending
  - id: env-update
    content: Aggiornare Backend/.env con DB_* e DATABASE_URL Neon (sslmode=require)
    status: pending
  - id: ssl-async
    content: Aggiungere SSL in database.py (connect_args) e alembic.ini (?ssl=require)
    status: pending
  - id: alembic-remote
    content: Eseguire alembic upgrade head su Neon (schema vuoto) e verificare tabella events
    status: pending
  - id: verify-async
    content: Test connessione async con engine SQLAlchemy
    status: pending
  - id: post-route
    content: "Imparare lo stack: route POST /events (Pydantic + Depends + insert su Neon), test con Swagger/curl"
    status: pending
  - id: future-backend
    content: "(Fase successiva, opzionale) Deploy FastAPI + CORS + collegamento frontend all'API"
    status: pending
isProject: false
---

# Piano: PostgreSQL online con Neon (percorso didattico)

## Obiettivo

Migrare Postgres su Neon **per imparare lo stack**, non perché Supabase non basti per il portfolio.

| Cosa impari | Dove nel piano |
| ----------- | -------------- |
| Postgres gestito (Neon, SSL, connection string) | Fasi 1–4 |
| Migrazioni schema (Alembic) | Fase 4 |
| SQLAlchemy async (modelli, sessioni) | Fasi 6–7 |
| FastAPI (route, Pydantic, `Depends`, OpenAPI) | Fase 7 |
| Deploy API + CORS (opzionale, dopo) | Fase 8 |

**Criterio di successo (fase attuale):** una `POST` locale che scrive su Neon e la vedi in `psql` o con una `GET`. A quel punto hai coperto ~80% dello stack.

### Cosa resta com’è (volutamente)

- **Supabase** continua a gestire il form contatti in produzione ([`ContactPage.jsx`](../Frontend/src/components/pages/ContactPage.jsx)) — rete di sicurezza, zero urgenza di sostituirlo.
- **Neon** è il Postgres del **backend FastAPI** — laboratorio separato finché non decidi il deploy.
- **Non serve unificare** i due DB durante l’apprendimento.

### Costi attesi

Tutto su **free tier** per un portfolio personale: Neon, Vercel (frontend), eventuale hosting API (Railway/Render/Fly). Costo reale = tempo di configurazione, non bolletta.

---

## Panoramica del Backend oggi

Il backend è **funzionale ma ancora in fase iniziale**: infrastruttura dati pronta, API non collegata al DB.

```mermaid
flowchart LR
  subgraph prod [Produzione oggi]
    FE["Frontend Vercel"]
    SB["Supabase contact_messages"]
    FE --> SB
  end
  subgraph learn [Laboratorio da costruire]
    API["FastAPI locale"]
    Neon["Neon Postgres"]
    API -->|"POST /events (da fare)"| Neon
  end
```

```mermaid
flowchart LR
  subgraph done [Gia pronto]
    Config["config.py + .env"]
    DBLayer["database.py async SQLAlchemy"]
    Alembic["Alembic migration/"]
    Model["events/models.py"]
  end
  subgraph notYet [Prossimo passo didattico]
    Main["main.py FastAPI"]
    Routes["POST/GET events"]
  end
  Config --> DBLayer
  DBLayer --> Alembic
  Model --> Alembic
  Main -.->|"manca Depends(get_async_session)"| DBLayer
```

| Area             | Stato              | Note                                                                                                                                              |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| FastAPI          | OK ma minimale     | [`Backend/src/main.py`](../Backend/src/main.py) — solo 2 endpoint di test, nessun uso del DB                                                         |
| Config           | OK, con ridondanza | [`Backend/src/config.py`](../Backend/src/config.py) legge sia `DATABASE_URL` sia `DB_*`; l’app e Alembic usano solo `DB_*`                           |
| SQLAlchemy async | OK                 | [`Backend/src/database.py`](../Backend/src/database.py) — engine asyncpg + `get_async_session`                                                       |
| Alembic          | OK                 | [`Backend/migration/env.py`](../Backend/migration/env.py) + revisione init [`671a2d337da9_init.py`](../Backend/migration/versions/671a2d337da9_init.py) |
| Modelli          | 1 tabella          | `events` (id, nome, email) in [`Backend/src/events/models.py`](../Backend/src/events/models.py)                                                      |
| Documentazione   | Buona              | [`Backend/DATABASE.md`](../Backend/DATABASE.md) copre locale + Alembic                                                                               |
| Form produzione  | Supabase           | Non toccare finché non hai route stabili e vuoi esercitarti col deploy                                                                               |

**Punti di attenzione:**

- La migrazione init contiene `op.drop_table('contacts')`: su Neon vuoto non è un problema.
- Neon **richiede SSL**: [`database.py`](../Backend/src/database.py) va aggiornato (Fase 3).
- [`Backend/.env.example`](../Backend/.env.example) è incoerente: allinearlo quando cambi host.

---

## Scope: due fasi didattiche

### Fase didattica 1 — Neon + API locale (obiettivo **ora**)

1. Postgres su Neon, schema via Alembic (vuoto, niente dump).
2. Backend locale collegato al DB remoto con SSL.
3. Route `POST` (e opzionale `GET`) su `events`, test con Swagger (`/docs`) o `curl`.
4. Supabase e frontend **invariati**.

Pro: rischio basso, costo zero, impari DB + ORM + API senza deploy.
Contro: il sito online non usa ancora il tuo FastAPI (ed è ok per ora).

### Fase didattica 2 — Deploy + frontend (opzionale, **dopo**)

1. Deploy FastAPI (Railway, Render, Fly.io).
2. CORS per il dominio Vercel.
3. Sostituire (se vuoi) Supabase con `fetch` verso la tua API.

Pro: stack end-to-end in produzione.
Contro: più pezzi (secrets, cold start, pooled connection).

**Raccomandazione:** completa la **fase 1** fino alla `POST` funzionante, poi valuta la fase 2 solo se vuoi chiudere il cerchio in produzione.

### Cosa saltare durante l’apprendimento

- `pg_dump` / restore dati locali (parti da schema vuoto).
- Connection string **pooled** (serve al deploy serverless, non ora).
- Unificare Supabase e Neon.
- Ottimizzazioni produzione (rate limit, auth admin, ecc.).

---

## Fase 1 — Creare il database su Neon

1. Vai su [neon.tech](https://neon.tech) e crea un account/progetto.
2. Crea un database (nome suggerito: `portfolio_db`, coerente col locale).
3. Nel dashboard Neon, copia **due** connection string:
   - **Direct connection** — per Alembic e `psql` (usa questa ora).
   - **Pooled connection** — annotala per la fase deploy (opzionale per ora).
4. Annota host, porta, user, password, database name dal pannello.

Esempio di valori che finiranno nel `.env` (sostituisci con i tuoi):

```env
DB_HOST=ep-xxxx.eu-central-1.aws.neon.tech
DB_PORT=5432
DB_USER=neondb_owner
DB_PASS=la_password_generata_da_neon
DB_NAME=portfolio_db
DATABASE_URL=postgresql://neondb_owner:PASSWORD@ep-xxxx.eu-central-1.aws.neon.tech:5432/portfolio_db?sslmode=require
```

`DATABASE_URL` resta utile per test rapidi con `psycopg2` come in [`DATABASE.md`](../Backend/DATABASE.md); l’app async usa `DB_*`.

---

## Fase 2 — Aggiornare `.env` locale

Dalla cartella [`Backend/`](../Backend/):

1. Apri `Backend/.env` (non committarlo).
2. Sostituisci `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` con i valori Neon.
3. Aggiorna anche `DATABASE_URL` con `?sslmode=require` per i test psycopg2.

Verifica connessione (venv attivo):

```bash
cd Backend
source .venv/bin/activate
python -c "
from src.config import settings
import psycopg2
conn = psycopg2.connect(settings.database_url)
print('OK:', conn.get_dsn_parameters()['dbname'])
conn.close()
"
```

Se fallisce: controlla password, firewall Neon (di default accetta connessioni esterne), e che `sslmode=require` sia presente.

---

## Fase 3 — Abilitare SSL per asyncpg (obbligatorio su Neon)

Neon rifiuta connessioni non SSL. Oggi [`database.py`](../Backend/src/database.py) costruisce l’URL senza SSL.

**Modifica minima consigliata** in [`Backend/src/database.py`](../Backend/src/database.py):

```python
engine = create_async_engine(
    DATABASE_URL,
    poolclass=pool.NullPool,
    connect_args={"ssl": "require"},
)
```

Per Alembic, aggiungi lo stesso parametro SSL all’URL in [`Backend/alembic.ini`](../Backend/alembic.ini):

```ini
sqlalchemy.url = postgresql+asyncpg://%(DB_USER)s:%(DB_PASS)s@%(DB_HOST)s:%(DB_PORT)s/%(DB_NAME)s?ssl=require
```

In alternativa puoi usare una variabile `DB_SSL=require` in config — utile se in locale (senza SSL) e Neon (con SSL) devono convivere; per semplicità iniziale, SSL sempre attivo va bene se usi solo Neon.

---

## Fase 4 — Applicare lo schema su Neon con Alembic

Schema **vuoto** (niente dump): opzione consigliata per il percorso didattico.

Con venv attivo e `.env` puntato a Neon:

```bash
cd Backend
alembic current          # dovrebbe essere vuoto su DB nuovo
alembic upgrade head     # crea tabella events + alembic_version
alembic current          # deve mostrare 671a2d337da9
```

Verifica da terminale (connection string Neon direct + ssl):

```bash
psql "postgresql://USER:PASS@HOST:5432/portfolio_db?sslmode=require" -c "\dt"
```

Dovresti vedere `events` e `alembic_version`.

**Se Alembic fallisce con “relation already exists”:** il DB non era vuoto — fermati e decidi se fare drop manuale (solo dev) o allineare con `alembic stamp head`.

---

## Fase 5 — Verificare l’app async

Test rapido (dopo Fase 3):

```bash
python -c "
import asyncio
from sqlalchemy import text
from src.database import engine

async def test():
    async with engine.connect() as conn:
        r = await conn.execute(text('SELECT 1'))
        print('async OK:', r.scalar())

asyncio.run(test())
"
```

---

## Fase 6 — Prima route API: imparare il flusso completo

**Milestone didattica principale.** Il browser non parla con Neon direttamente: FastAPI è il intermediario. Per ora testi tutto in locale.

Obiettivi:

1. Schema Pydantic per il body della richiesta (`nome`, `email`).
2. `POST /events` con `Depends(get_async_session)` che fa `INSERT` su `events`.
3. (Opzionale) `GET /events` per leggere le righe inserite.
4. Test da Swagger (`http://127.0.0.1:8000/docs`) o `curl`.
5. Verifica su Neon: `psql ... -c "SELECT * FROM events;"`.

Pattern di riferimento:

```python
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_async_session

@app.post("/events")
async def create_event(
    payload: EventCreate,
    session: AsyncSession = Depends(get_async_session),
):
    ...
```

Avvio locale:

```bash
cd Backend
source .venv/bin/activate
uvicorn src.main:app --reload
```

Quando questa fase funziona, hai imparato: Neon → Alembic → SQLAlchemy async → FastAPI → HTTP.

---

## Fase 7 (opzionale, futura) — Deploy backend FastAPI

Solo dopo la Fase 6, se vuoi chiudere il cerchio in produzione:

1. Scegli host API (Railway, Render, Fly.io — Vercel **non** è adatto a FastAPI long-running).
2. Imposta le stesse variabili `DB_*` (e SSL) nei secrets della piattaforma.
3. Comando avvio tipico: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
4. Aggiungi CORS in FastAPI per il dominio Vercel del frontend.
5. Sul frontend, sostituisci gradualmente Supabase con `fetch` verso la tua API.

Per Neon in produzione serverless, usa la **pooled connection string**; per Alembic continua a usare la **direct**.

---

## Checklist autonoma (ordine di esecuzione)

**Fase didattica 1 (ora):**

1. Account Neon + progetto + credenziali copiate (direct)
2. `.env` aggiornato con `DB_*` e `DATABASE_URL` (+ sslmode)
3. Patch SSL in `database.py` e `alembic.ini`
4. Test psycopg2 (Fase 2)
5. `alembic upgrade head` su Neon (schema vuoto)
6. `\dt` / verifica tabella `events`
7. Test async engine (Fase 5)
8. Route `POST /events` + test Swagger/curl (Fase 6)
9. Verifica riga inserita su Neon con `psql`

**Fase didattica 2 (dopo, opzionale):**

10. Deploy backend + CORS
11. (Opzionale) collegare frontend all’API al posto di Supabase

---

## Cosa NON fare (errori comuni)

- Non committare `.env` con password Neon.
- Non usare la connection string **pooled** per `alembic upgrade` (può dare errori con DDL).
- Non saltare SSL: su Neon la connessione fallisce senza.
- Non fare `alembic revision --autogenerate` sul remoto finché non hai verificato che i modelli locali riflettano lo schema desiderato.
- Non sentirti obbligato a togliere Supabase: per imparare basta Neon + API locale.
- Non passare al deploy prima di avere una `POST` locale che funziona — è il passo che consolida tutto lo stack.
