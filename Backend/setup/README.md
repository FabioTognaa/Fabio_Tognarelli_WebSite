# Setup Backend

Esegui i passaggi dalla cartella `Backend` del progetto.

## 1. Creazione venv

**Linux / macOS**

```bash
python3 -m venv .venv
```

**Windows (PowerShell o CMD)**

```powershell
py -m venv .venv
# oppure, se py non è disponibile:
python -m venv .venv
```

## 2. Entrare nel venv

**Linux / macOS**

```bash
source .venv/bin/activate
```

**Windows (PowerShell)**

```powershell
.venv\Scripts\Activate.ps1
```

**Windows (CMD)**

```cmd
.venv\Scripts\activate.bat
```

> Su Windows, se PowerShell blocca l’attivazione del venv, esegui una volta:
> `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

## 3. Installare le librerie necessarie

Le dipendenze sono elencate in `requirements.txt`.

**Linux / macOS / Windows** (con venv attivo)

```bash
pip install -r requirements.txt
```

## 4. Verifica delle installazioni

Controlla che i pacchetti siano installati e importabili.

**Linux / macOS / Windows** (con venv attivo)

```bash
pip list
python -c "import fastapi, uvicorn, psycopg2, dotenv; print('OK')"
```

In caso di errori, ripeti il passo 3 con il venv attivo.

## 5. Creazione file `.env` per il backend

Copia il file di esempio nella root di `Backend` e adatta i valori.

**Linux / macOS**

```bash
cp .env.example .env
```

**Windows (PowerShell)**

```powershell
Copy-Item .env.example .env
```

**Windows (CMD)**

```cmd
copy .env.example .env
```

Modifica `.env` (es. `DATABASE_URL`) con le credenziali del tuo database locale.

> Non committare `.env`: contiene dati sensibili.

## 6. Avviare il server (Uvicorn)

Con il venv attivo, dalla cartella `Backend`:

```bash
uvicorn main:app --reload
```

- `main:app` — modulo `main.py`, istanza FastAPI `app`
- `--reload` — riavvio automatico in sviluppo quando modifichi il codice

Il server è in ascolto su `http://127.0.0.1:8000`. Apri quell’URL nel browser oppure la documentazione interattiva su `http://127.0.0.1:8000/docs`.

Per cambiare host o porta:

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```
