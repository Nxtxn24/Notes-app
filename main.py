from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return "API is running, please go to swagger UI"
# Create Note
@app.post("/notes/")
def create_note(title: str, content: str, db: Session = Depends(get_db)):
    note = models.Note(title=title, content=content)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

# Read All Notes
@app.get("/notes/")
def get_notes(db: Session = Depends(get_db)):
    return db.query(models.Note).all()

# Update Note
@app.put("/notes/{note_id}")
def update_note(note_id: int, title: str, content: str, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    note.title = title
    note.content = content
    db.commit()
    return note

# Delete Note
@app.delete("/notes/{note_id}")
def delete_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(models.Note).filter(models.Note.id == note_id).first()
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")

    db.delete(note)
    db.commit()
    return {"message": "Deleted"}