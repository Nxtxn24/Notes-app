alert("JS is working");

const API_URL = "http://127.0.0.1:8000";

window.onload = getNotes;

async function getNotes() {
    const res = await fetch(`${API_URL}/notes`);
    const data = await res.json();

    console.log(data);

    const notesDiv = document.getElementById("notes");
    notesDiv.innerHTML = "";

    data.forEach(note => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote(${note.id})">Delete</button>
        `;

        notesDiv.appendChild(div);
    });
}

async function addNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await fetch(`${API_URL}/notes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, content })
    });

    getNotes();
}

async function deleteNote(id) {
    await fetch(`${API_URL}/notes/${id}`, {
        method: "DELETE"
    });

    getNotes();
}