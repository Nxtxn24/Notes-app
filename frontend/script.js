const API = "http://127.0.0.1:8000";

async function fetchNotes() {
    const res = await fetch(`${API}/notes/`);
    const data = await res.json();

    const container = document.getElementById("notes");
    container.innerHTML = "";

    data.forEach(note => {
        const div = document.createElement("div");
        div.className = "note";

        div.innerHTML = `
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <button onclick="deleteNote(${note.id})">Delete</button>
        `;

        container.appendChild(div);
    });
}

async function addNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await fetch(`${API}/notes/?title=${title}&content=${content}`, {
        method: "POST"
    });

    fetchNotes();
}

async function deleteNote(id) {
    await fetch(`${API}/notes/${id}`, {
        method: "DELETE"
    });

    fetchNotes();
}

fetchNotes();