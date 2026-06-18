---
name: Postgres online Neon
overview: Panoramica del Backend attuale e piano operativo per spostare PostgreSQL su Neon, collegarlo al backend locale e preparare il terreno per un eventuale deploy del backend in un secondo momento.
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
    content: Eseguire alembic upgrade head sul DB Neon e verificare tabella events
    status: pending
  - id: optional-data
    content: "Se servono dati locali: pg_dump selettivo + restore dopo lo schema"
    status: pending
  - id: verify-async
    content: Test connessione async con engine SQLAlchemy
    status: pending
  - id: future-backend
    content: (Fase successiva) Deploy FastAPI + CORS + collegamento frontend all API
    status: pending
isProject: false
---

# Piano: PostgreSQL online con Neon

## Panoramica del Backend oggi

Il backend è **funzionale ma ancora in fase iniziale**: hai messo in piedi l’infrastruttura dati, ma l’API non la usa ancora.

```mermaid
flowchart LR
  subgraph done [Gia pronto]
    Config["config.py + .env"]
    DBLayer["database.py async SQLAlchemy"]
    Alembic["Alembic migration/"]
    Model["events/models.py"]
  end
  subgraph notYet [Non collegato]
    Main["main.py FastAPI"]
    Routes["Route CRUD"]
  end
  Config --> DBLayer
  DBLayer --> Alembic
  Model --> Alembic
  Main -.->|"manca Depends(get_async_session)"| DBLayer
```

| Area             | Stato              | Note                                                                                                                                              |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| FastAPI          | OK ma minimale     | [`Backend/src/main.py`](Backend/src/main.py) — solo 2 endpoint di test, nessun uso del DB                                                         |
| Config           | OK, con ridondanza | [`Backend/src/config.py`](Backend/src/config.py) legge sia `DATABASE_URL` sia `DB_*`; l’app e Alembic usano solo `DB_*`                           |
| SQLAlchemy async | OK                 | [`Backend/src/database.py`](Backend/src/database.py) — engine asyncpg + `get_async_session`                                                       |
| Alembic          | OK                 | [`Backend/migration/env.py`](Backend/migration/env.py) + revisione init [`671a2d337da9_init.py`](Backend/migration/versions/671a2d337da9_init.py) |
| Modelli          | 1 tabella          | `events` (id, nome, email) in [`Backend/src/events/models.py`](Backend/src/events/models.py)                                                      |
| Documentazione   | Buona              | [`Backend/DATABASE.md`](Backend/DATABASE.md) copre locale + Alembic                                                                               |
| Deploy backend   | Assente            | Frontend su Vercel; Supabase usato solo per il form contatti nel frontend                                                                         |

**Punti di attenzione prima di andare online:**

- La migrazione init contiene `op.drop_table('contacts')`: su Neon vuoto non è un problema; se nel DB locale avevi dati in `contacts`, valuta se migrarli o lasciarli perdere.
- Neon **richiede SSL**: oggi [`database.py`](Backend/src/database.py) non lo imposta — va aggiunto un piccolo adattamento (vedi Fase 3).
- [`Backend/.env.example`](Backend/.env.example) è incoerente (placeholder generici + `DATABASE_URL` locale): conviene allinearlo quando cambi host.

---

## Scope: cosa significa ciascuna opzione

### Opzione A — Solo database online (consigliata come **primo passo**)

- Crei Postgres su Neon, applichi le migrazioni, colleghi il backend **in locale** al DB remoto.
- Pro: rischi bassi, costi zero (free tier Neon), impari il flusso senza dover deployare anche l’API.
- Contro: in produzione il frontend non parlerà ancora col tuo FastAPI.

### Opzione B — Database + backend FastAPI online

- Tutto dell’opzione A, più deploy di Uvicorn/FastAPI (Railway, Render, Fly.io, ecc.).
- Pro: stack completo accessibile da internet.
- Contro: più pezzi (CORS, secrets, health check, cold start, costi/hosting API).

### Opzione C — Solo schema vuoto

- Come A, ma **senza** `pg_dump`/`pg_restore`: su Neon parti da zero e fai solo `alembic upgrade head`.
- Pro: il percorso più semplice se non hai dati locali da conservare.

**Raccomandazione:** procedi in **due fasi** — prima **A + C** (Neon + schema via Alembic, backend locale che punta al remoto). Quando l’API userà davvero il DB e avrai route stabili, passa alla **fase B** (deploy backend).

Il frontend oggi usa **Supabase** per i messaggi di contatto ([`Frontend/src/components/pages/ContactPage.jsx`](Frontend/src/components/pages/ContactPage.jsx)): non è lo stesso DB del backend. Non serve unificarli subito; Neon sarà il Postgres del **backend FastAPI**.

---

## Fase 1 — Creare il database su Neon

1. Vai su [neon.tech](https://neon.tech) e crea un account/progetto.
2. Crea un database (nome suggerito: `portfolio_db`, coerente col locale).
3. Nel dashboard Neon, copia **due** connection string (Neon le espone entrambe):
   - **Direct connection** — per migrazioni Alembic e `psql`
   - **Pooled connection** — utile in futuro se deploy serverless (opzionale per ora)
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

`DATABASE_URL` resta utile per test rapidi con `psycopg2` come in [`DATABASE.md`](Backend/DATABASE.md); l’app async usa `DB_*`.

---

## Fase 2 — Aggiornare `.env` locale

Dalla cartella [`Backend/`](Backend/):

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

Neon rifiuta connessioni non SSL. Oggi [`database.py`](Backend/src/database.py) costruisce l’URL senza SSL.

**Modifica minima consigliata** in [`Backend/src/database.py`](Backend/src/database.py):

```python
engine = create_async_engine(
    DATABASE_URL,
    poolclass=pool.NullPool,
    connect_args={"ssl": "require"},
)
```

Per Alembic, aggiungi lo stesso parametro SSL all’URL in [`Backend/alembic.ini`](Backend/alembic.ini):

```ini
sqlalchemy.url = postgresql+asyncpg://%(DB_USER)s:%(DB_PASS)s@%(DB_HOST)s:%(DB_PORT)s/%(DB_NAME)s?ssl=require
```

In alternativa puoi usare una variabile `DB_SSL=require` in config — utile se in locale (senza SSL) e Neon (con SSL) devono convivere; per semplicità iniziale, SSL sempre attivo va bene anche in dev se usi solo Neon.

---

## Fase 4 — Applicare lo schema su Neon con Alembic

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

## Fase 5 — Migrare dati locali (solo se ti servono)

Salta questa fase se parti da schema vuoto (opzione C).

Se in locale hai righe in `events` (o altre tabelle) da conservare:

```bash
# 1. Dump dal Postgres locale
sudo -u postgres pg_dump portfolio_db --data-only --table=events > events_data.sql

# 2. Restore su Neon (dopo alembic upgrade head)
psql "postgresql://USER:PASS@HOST:5432/portfolio_db?sslmode=require" < events_data.sql
```

Ordine obbligatorio: **prima schema (Alembic), poi dati**. Per dump completo:

```bash
sudo -u postgres pg_dump portfolio_db > backup_locale.sql
psql "postgresql://...?sslmode=require" < backup_locale.sql
```

Attenzione: la revisione init **elimina** `contacts`; un dump completo potrebbe entrare in conflitto. Preferisci dump selettivo per tabella.

---

## Fase 6 — Verificare l’app async

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

Quando aggiungerai route che usano il DB, il pattern sarà:

```python
from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession
from src.database import get_async_session

@app.get("/events")
async def list_events(session: AsyncSession = Depends(get_async_session)):
    ...
```

---

## Fase 7 (futura) — Deploy backend FastAPI

Non è obbligatoria ora, ma è il passo naturale dopo A:

1. Scegli host API (Railway, Render, Fly.io — Vercel **non** è adatto a FastAPI long-running).
2. Imposta le stesse variabili `DB_*` (e SSL) nei secrets della piattaforma.
3. Comando avvio tipico: `uvicorn src.main:app --host 0.0.0.0 --port $PORT`
4. Aggiungi CORS in FastAPI per il dominio Vercel del frontend.
5. Sul frontend, sostituisci gradualmente le chiamate Supabase con fetch verso la tua API (solo quando le route esistono).

Per Neon in produzione serverless, usa spesso la **pooled connection string**; per Alembic continua a usare la **direct**.

---

## Checklist autonoma (ordine di esecuzione)

1. Account Neon + progetto + credenziali copiate
2. `.env` aggiornato con `DB_*` e `DATABASE_URL` (+ sslmode)
3. Patch SSL in `database.py` e `alembic.ini`
4. Test psycopg2 (Fase 2)
5. `alembic upgrade head` su Neon
6. `\dt` / verifica tabella `events`
7. (Opzionale) dump/restore dati locali
8. Test async engine (Fase 6)
9. Sviluppo locale col DB remoto fino a route pronte
10. (Dopo) deploy backend + CORS

---

## Cosa NON fare (errori comuni)

- Non committare `.env` con password Neon.
- Non usare la connection string **pooled** per `alembic upgrade` (può dare errori con DDL).
- Non saltare SSL: su Neon la connessione fallisce senza.
- Non fare `alembic revision --autogenerate` sul remoto finché non hai verificato che i modelli locali riflettano lo schema desiderato.
- Non confondere Supabase (form contatti frontend) con Neon (backend Postgres): sono due sistemi separati per ora.
