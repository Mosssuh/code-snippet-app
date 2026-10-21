
const API = "http://localhost:8080/api"

export async function createTag(tag) {
    const res = await fetch(`${API}/tags`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tag),
    });
    return res.json();
}

export async function updateTag(id: number, tag) {
    const res = await fetch(`${API}/tags/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "appication/json"},
        body: JSON.stringify(tag),
    });
    return res.json();
}

export async function deleteTag(id: number) {
    const res = await fetch(`${API}/tags/${id}`, {
        method: "DELETE",
    });
    return res.json();
}

export async function getTags() {
    const res = await fetch(`${API}/tags`);
    return res.json();
}