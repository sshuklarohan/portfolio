"""
Run with: python seed.py
Populates the database with sample data — edit freely.
"""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from datetime import date
from app.database import SessionLocal, create_tables
from app.models import Project, Experience, Skill

create_tables()
db = SessionLocal()

# Clear existing data
db.query(Project).delete()
db.query(Experience).delete()
db.query(Skill).delete()

# ── Projects ──────────────────────────────────────────────────────────────────
projects = [
    Project(
        title="Portfolio Website",
        summary="This site — built with React + FastAPI, fully Dockerised.",
        description="A full-stack personal portfolio with a CRUD-driven content layer...",
        tags=["React", "FastAPI", "Docker", "AWS"],
        repo_url="https://github.com/you/portfolio",
        live_url="https://yoursite.com",
        featured=True,
        order=1,
    ),
    Project(
        title="Data Pipeline Tool",
        summary="ETL pipeline for processing CSV feeds into a PostgreSQL warehouse.",
        tags=["Python", "PostgreSQL", "Airflow"],
        repo_url="https://github.com/you/pipeline",
        featured=True,
        order=2,
    ),
]
db.add_all(projects)

# ── Experience ────────────────────────────────────────────────────────────────
experience = [
    Experience(
        company="Acme Corp",
        role="Senior Software Engineer",
        location="London, UK",
        start_date=date(2022, 3, 1),
        end_date=None,  # current
        description="- Led backend redesign cutting p99 latency by 40%\n- Managed team of 4 engineers",
        technologies=["Python", "FastAPI", "PostgreSQL", "AWS"],
        order=1,
    ),
    Experience(
        company="Startup Ltd",
        role="Software Engineer",
        location="London, UK",
        start_date=date(2020, 6, 1),
        end_date=date(2022, 2, 28),
        description="- Built React frontend from scratch\n- Integrated third-party payment APIs",
        technologies=["React", "Node.js", "Stripe"],
        order=2,
    ),
]
db.add_all(experience)

# ── Skills ────────────────────────────────────────────────────────────────────
skills = [
    Skill(name="Python",     category="Languages", level=5, order=1),
    Skill(name="TypeScript", category="Languages", level=4, order=2),
    Skill(name="SQL",        category="Languages", level=4, order=3),
    Skill(name="React",      category="Frontend",  level=5, order=1),
    Skill(name="FastAPI",    category="Backend",   level=5, order=1),
    Skill(name="Docker",     category="DevOps",    level=4, order=1),
    Skill(name="AWS",        category="DevOps",    level=3, order=2),
]
db.add_all(skills)

db.commit()
db.close()
print("Seeded successfully.")
