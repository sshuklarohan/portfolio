from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from data import PROJECTS, EXPERIENCE

app = FastAPI(title="Portfolio API", docs_url="/docs")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/projects")
def get_projects(featured: bool | None = None):
    projects = PROJECTS
    if featured is not None:
        projects = [p for p in projects if p["featured"] == featured]
    return sorted(projects, key=lambda p: p["order"])


@app.get("/projects/{project_id}")
def get_project(project_id: int):
    project = next((p for p in PROJECTS if p["id"] == project_id), None)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@app.get("/experience")
def get_experience():
    return sorted(EXPERIENCE, key=lambda e: e["order"])


@app.get("/health")
def health():
    return {"status": "ok"}
