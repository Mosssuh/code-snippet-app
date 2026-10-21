import type { CreateSnippet } from "../components/SnippetForm";
import type { Snippet } from "../models/snippet.types";

const API = "http://localhost:8080/api"

export async function getSnippets() {
    const res = await fetch(`${API}/snippets`);
    return res.json();
}

export async function getSnippet(id: number) {
    const res = await fetch(`${API}/snippets/${id}`);
    return res.json;
}

export async function createSnippet(snippet: CreateSnippet) {
    const res = await fetch(`${API}/snippets`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(snippet),
    });
    return res.json();
}

export async function updateSnippet(id: number, snippet: Snippet) {
    const res = await fetch(`${API}/snippets/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(snippet),
    });
    return res.json();
}

export async function deleteSnippet(id: number) {
    const res = await fetch(`${API}/snippets/${id}`, {
        method: "DELETE",
    });
    return res.json();
}

export async function searchSnippets(query: string) {
    const res = await fetch(`${API}/snippets?search=${query}`);
    return res.json();
}