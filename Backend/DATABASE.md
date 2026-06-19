# Database PostgreSQL

Cheat sheet per PostgreSQL locale del backend. Per venv, `.env` e avvio API vedi [`setup/README.md`](setup/README.md).

**Connessione attesa** (da `.env.example`):

```
postgresql://postgres@localhost:5432/portfolio_db
```

---

## Stato database Postgres(Linux / systemd)

```bash
# stato
sudo systemctl status postgresql

# avvio / stop / riavvio
sudo systemctl start postgresql
sudo systemctl stop postgresql
sudo systemctl restart postgresql

# avvio automatico al boot
sudo systemctl enable postgresql
```

---

## Prima configurazione

```bash
# crea il database del progetto (una tantum)
sudo -u postgres createdb portfolio_db

# oppure da psql
sudo -u postgres psql -c "CREATE DATABASE portfolio_db;"
```

Copia e adatta `.env`:

```bash
cp .env.example .env
```

---

## Entrare in `psql`

**Metodo consigliato** — socket locale, senza password (Debian/Ubuntu):

```bash
# shell interattiva sul database del progetto
sudo -u postgres psql -d portfolio_db

# shell sul database di default (postgres)
sudo -u postgres psql

# un comando e poi esci
sudo -u postgres psql -d portfolio_db -c "SELECT version();"
```

**Via TCP** — come nel `DATABASE_URL` (può chiedere password):

```bash
psql postgresql://postgres@localhost:5432/portfolio_db

# equivalente con flag
psql -h localhost -p 5432 -U postgres -d portfolio_db
```

**Con password** (se l’hai impostata su `postgres`):

```bash
psql postgresql://postgres:tua_password@localhost:5432/portfolio_db
PGPASSWORD=tua_password psql -h localhost -U postgres -d portfolio_db
```

Per uscire dalla shell: `\q` oppure `Ctrl+D`.

Se chiede password e non l’hai impostata, usa il socket sopra oppure imposta una password:

```bash
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'tua_password';"
```

Poi aggiorna `.env`:

```
DATABASE_URL=postgresql://postgres:tua_password@localhost:5432/portfolio_db
```

---

## Comandi di routine in `psql`

| Comando           | Cosa fa                |
| ----------------- | ---------------------- |
| `\l`              | elenca i database      |
| `\c portfolio_db` | connetti a un database |
| `\dt`             | elenca le tabelle      |
| `\d nome_tabella` | schema di una tabella  |
| `\du`             | elenca i ruoli/utenti  |
| `\q`              | esci                   |

---

## Backup e restore

```bash
# backup (formato SQL)
sudo -u postgres pg_dump portfolio_db > backup_$(date +%Y%m%d).sql

# restore su database vuoto
sudo -u postgres psql -d portfolio_db < backup_20260101.sql
```

---

## Verifica connessione da Python

Con venv attivo, dalla cartella `Backend`:

```bash
python -c "
from src.config import settings
import psycopg2
conn = psycopg2.connect(settings.database_url)
print('OK:', conn.get_dsn_parameters()['dbname'])
conn.close()
"
```

---

### Alembic: setup migrazioni (SQLAlchemy async)

Stack attuale: **SQLAlchemy 2.x** + **asyncpg** + **Alembic** in modalità async. Le migrazioni vivono in `migration/` (non `alembic/`).

### Prerequisiti

1. PostgreSQL avviato e database `portfolio_db` creato (vedi sopra).
2. Venv attivo e dipendenze installate (`sqlalchemy`, `alembic`, `asyncpg` — vedi `requirements.txt`).
3. `.env` compilato con le variabili usate da `src/config.py`:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=la_tua_password
DB_NAME=portfolio_db
```

`database_url` resta utile per test rapidi con `psycopg2`; Alembic e l’app async usano i campi `DB_*`.

---

# Setup iniziale (ordine consigliato)

Esegui tutto dalla cartella `Backend`, con venv attivo.

#### 1. Inizializza Alembic (template async)

```bash
alembic init -t async migration
```

Crea:

| Path                       | Ruolo                                       |
| -------------------------- | ------------------------------------------- |
| `alembic.ini`              | configurazione CLI Alembic                  |
| `migration/env.py`         | ambiente di esecuzione migrazioni           |
| `migration/script.py.mako` | template dei file di revisione              |
| `migration/versions/`      | cartella delle revisioni (vuota all’inizio) |

Il flag `-t async` genera `env.py` già predisposto per `async_engine_from_config` e `asyncio.run`.

#### 2. Configura `alembic.ini`

```ini
[alembic]
script_location = %(here)s/migration
prepend_sys_path = .

sqlalchemy.url = postgresql+asyncpg://%(DB_USER)s:%(DB_PASS)s@%(DB_HOST)s:%(DB_PORT)s/%(DB_NAME)s
```

- **`script_location`**: cartella `migration/` (nome scelto al `init`).
- **`prepend_sys_path = .`**: permette import come `from src.config import settings`.
- **`sqlalchemy.url`**: URL **async** (`postgresql+asyncpg://`). I placeholder `%(DB_USER)s`, `%(DB_PASS)s`, ecc. usano la sintassi **ConfigParser** di Alembic (non `{DB_USER}` né variabili Python): vengono sostituiti a runtime da `env.py` con `set_section_option` (passo successivo). Non mettere password reali nel file `.ini`.

#### 3. Configura `migration/env.py`

`env.py` collega Alembic a `.env`, ai metadati SQLAlchemy e al driver async.

**a) Import e metadati**

```python
from src.config import settings
from src.database import Base
import src.events.models  # ogni modulo con modelli va importato qui
```

- `Base` porta i metadati condivisi da tutte le tabelle.
- L’`import` dei moduli (es. `src.events.models`) è **obbligatorio** per l’autogenerate: senza import, Alembic non vede le classi mappate su tabelle.

Poi:

```python
target_metadata = Base.metadata
```

**b) URL dal `.env` (sostituzione placeholder in `alembic.ini`)**

```python
config = context.config
section = config.config_ini_section

config.set_section_option(section, "DB_HOST", str(settings.db_host))
config.set_section_option(section, "DB_PORT", str(settings.db_port))
config.set_section_option(section, "DB_USER", str(settings.db_user))
config.set_section_option(section, "DB_NAME", str(settings.db_name))
config.set_section_option(section, "DB_PASS", str(settings.db_pass.get_secret_value()))
```

Alembic legge `sqlalchemy.url` dall’ini e risolve `%(DB_HOST)s`, `%(DB_PORT)s`, … con questi valori. Una sola fonte di verità: `Settings` in `src/config.py`.

**c) Modalità async (già nel template)**

Il template async definisce `run_async_migrations()` con `async_engine_from_config` e `asyncio.run(run_async_migrations())` in `run_migrations_online()`. Non serve modificarlo se resti su asyncpg.

#### 4. Setup `src/database.py` (metadati + engine app)

`database.py` è il punto centrale per l’**applicazione** (non per Alembic da solo):

```python
from typing import AsyncGenerator

from sqlalchemy import pool
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from src.config import settings as s

DATABASE_URL = f"postgresql+asyncpg://{s.db_user}:{s.db_pass.get_secret_value()}@{s.db_host}:{s.db_port}/{s.db_name}"

class Base(DeclarativeBase):
    pass

engine = create_async_engine(DATABASE_URL, poolclass=pool.NullPool)
async_session_maker = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session
```

| Pezzo                            | Ruolo                                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------ |
| `Base`                           | classe base declarative; ogni modello eredita da qui e registra colonne in `Base.metadata` |
| `DATABASE_URL`                   | stesse credenziali di Alembic, schema `postgresql+asyncpg://`                              |
| `engine` / `async_session_maker` | connessioni per FastAPI                                                                    |
| `get_async_session`              | dependency injection nelle route                                                           |

**Relazione con Alembic:** i modelli importano `Base` da `database.py`. `env.py` imposta `target_metadata = Base.metadata`. Autogenerate confronta i modelli Python con lo schema PostgreSQL e propone `upgrade()` / `downgrade()`.

---

# Mini tutorial: aggiornare la versione dello schema

Workflow da ripetere ogni volta che cambi un modello in `src/**/models.py`. Esegui tutto dalla cartella `Backend`, con venv attivo e PostgreSQL avviato.

| Passo | Cosa fare                                                                                                                                                            |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Modifica il modello (colonna, tabella, …) e verifica che il modulo sia importato in `migration/env.py` (es. `import src.events.models`).                             |
| 2     | Genera la revisione — Alembic confronta modelli Python e schema PostgreSQL:                                                                                          |
| 3     | Apri e controlla il file creato in `migration/versions/` (`upgrade()` / `downgrade()`). Autogenerate a volte propone drop indesiderati: correggi prima di applicare. |
| 4     | Applica la migrazione sul database.                                                                                                                                  |
| 5     | Verifica con `alembic current` o in `psql` con `\dt`.                                                                                                                |

**Comandi (passi 2 e 4):**

```bash
# genera il file di revisione (-m = messaggio breve, libero)
alembic revision --autogenerate -m "init"

# applica tutte le migrazioni pendenti fino all’ultima
alembic upgrade head
```

Esempi di messaggio `-m`: `"init"` (prima migrazione), `"add colonna telefono"`, `"rename tabella events"`.

**Cosa succede**

- `revision --autogenerate` crea un file in `migration/versions/`, es. `671a2d337da9_init.py`, con le operazioni SQL proposte.
- `upgrade head` esegue quelle operazioni su `portfolio_db`. `head` indica sempre l’ultima revisione della catena.

**Prima migrazione vs aggiornamenti successivi:** stessi due comandi. La prima volta autogenerate propone di solito `create_table`; dopo la prima `upgrade head`, le revisioni successive propongono `add_column`, `alter_column`, ecc.

Se nel repo esiste già una revisione applicata (es. `671a2d337da9_init.py` con tabella `events`), salta il setup iniziale e ripeti solo autogenerate + upgrade quando modifichi i modelli.

Per aggiungere una tabella da zero con tutti i dettagli, vedi la sezione sotto.

---

### Comandi di routine Alembic

```bash
# genera una revisione dal diff modelli ↔ database
alembic revision --autogenerate -m "descrizione breve"

# applica tutte le migrazioni pendenti
alembic upgrade head

# annulla l’ultima migrazione
alembic downgrade -1

# stato attuale
alembic current
alembic history
```

Dopo `revision --autogenerate`, **apri sempre** il file in `migration/versions/` e controlla che `upgrade()`/`downgrade()` siano corretti prima di `upgrade head` (vedi mini tutorial sopra).

---

# Guida passo passo: aggiungere una tabella

Esempio con il modulo eventi già presente nel repo.

#### Passo 1 — Definisci il modello in `src/events/models.py`

```python
from sqlalchemy import Integer, Text
from sqlalchemy.orm import Mapped, mapped_column

from src.database import Base


class Evento(Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    nome: Mapped[str] = mapped_column(Text)
    email: Mapped[str] = mapped_column(Text)
```

Regole:

- Una classe = una tabella (`__tablename__`).
- Eredita sempre da `Base` definito in `src/database.py`.
- Usa `Mapped[...]` + `mapped_column(...)` (stile SQLAlchemy 2).

#### Passo 2 — Registra il modulo in `migration/env.py`

Aggiungi (o verifica) l’import **dopo** `from src.database import Base`:

```python
import src.events.models
```

Se aggiungi un nuovo file, es. `src/blog/models.py`, ripeti con `import src.blog.models`. Senza questo import, `alembic revision --autogenerate` non rileva la tabella.

#### Passo 3 — Genera la migrazione

```bash
alembic revision --autogenerate -m "add tabella events"
```

Controlla `migration/versions/<revision>_add_tabella_events.py`: dovrebbe contenere `op.create_table('events', ...)`.

#### Passo 4 — Applica sul database

```bash
alembic upgrade head
```

Verifica in `psql`:

```sql
\d events
```