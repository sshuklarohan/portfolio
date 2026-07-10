# Portfolio

React + FastAPI portfolio. No database — content lives in source files.

## Running locally

```bash
docker compose up --build
```

| URL | What |
|-----|------|
| http://localhost:5173      | Portfolio site |
| http://localhost:8000/docs | API docs |

## Updating content

| What to change | File to edit |
|----------------|--------------|
| Projects        | `backend/data.py` |
| Experience      | `backend/data.py` |
| Skills          | `frontend/src/data.ts` |
| About text / links | `frontend/src/components/About.tsx` |
| Your name       | `frontend/src/components/Nav.tsx` + `About.tsx` |

After editing, rebuild:

```bash
docker compose up --build
```

## Deploying to a server

On any Linux server with Docker installed:

```bash
git pull
docker compose up --build -d
```

That's it. Nginx is included in the stack and handles HTTPS termination
if you add a certificate.
