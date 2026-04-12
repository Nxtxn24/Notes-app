const API = "http://127.0.0.1:8000";

// Fetch and display all notes
async function fetchNotes() {
    try {
        const res = await fetch(`${API}/notes/`);
        const notes = await res.json();

        const container = document.getElementById("notes");
        container.innerHTML = "";

        if (notes.length === 0) {
            container.innerHTML = "<p>No notes yet</p>";
            return;
        }

        notes.forEach(note => {
            const div = document.createElement("div");
            div.className = "note";

            div.innerHTML = `
                <h3>${note.title}</h3>
                <p>${note.content}</p>
                <button onclick="deleteNote(${note.id})">Delete</button>
            `;

            container.appendChild(div);
        });

    } catch (error) {
        console.error("Error fetching notes:", error);
    }
}

// Add note
async function addNote() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Please fill all fields");
        return;
    }

    await fetch(`${API}/notes/?title=${title}&content=${content}`, {
        method: "POST"
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    fetchNotes();
}

// Delete note
async function deleteNote(id) {
    await fetch(`${API}/notes/${id}`, {
        method: "DELETE"
    });

    fetchNotes();
}

// Load notes when page loads
window.onload = fetchNotes;