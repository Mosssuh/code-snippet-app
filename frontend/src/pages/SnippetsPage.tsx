import { useState } from "react";
import { createSnippet, deleteSnippet, getSnippets, updateSnippet } from "../services/SnippetAPI.ts";
import { useEffect } from "react";
import SnippetList from "../components/SnippetList.tsx";
import type { Language, Snippet, Tag } from "../models/snippet.types.ts";
import styles from  './SnippetsPage.module.css';
import type { CreateSnippet } from "../components/SnippetForm.tsx";
import SnippetForm from "../components/SnippetForm.tsx";
import { localSnippets } from "../util/DefaultValues.ts";
import { ViewType } from "../util/types.ts";
import SnippetDetails from "../components/SnippetDetails.tsx";
import SnippetFilter from "../components/SnippetFilter.tsx";
import FilterTagManager from "../components/FilterTagManager.tsx";
interface FilterState {
    language: Language | null;
    tags: Tag[] | null;

}

function SnippetsPage() {
    const [view, setView] = useState(ViewType.HOME);
    const [selectedId, setSelectedId] = useState(-1);
    const [snippets, setSnippets] = useState<Snippet[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState<FilterState>({language: null, tags: null});

    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    const loadSnippets = async () => {
        setLoading(true);
        try {
            // const data = await getSnippets();
            // setSnippets(data);
            setSnippets([...localSnippets]);
        } catch (error) {
            console.error('Error:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadSnippets();
    }, []);

    
    // Handlers
    const handleView = async (type: string) => {
        setView(type);
    }


    const handleDetails = async (id: number) => {
        setSelectedId(id);
        setView(ViewType.SNIPPET_DETAILS);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Delete this Snippet?")) {
            // await deleteSnippet(id);

            const snippetIndex = localSnippets.findIndex((s) => s.id == id);
            if (snippetIndex !== -1) {
                localSnippets.splice(snippetIndex, 1);
            }
            loadSnippets();
        }
    };

    const handleCreate = async (snippet: CreateSnippet) => {
        //await createSnippet(snippet);
        snippets.push({
            id: localSnippets.length+1,
            title: snippet.title,
            code: snippet.code,
            language: snippet.language,
            tags: snippet.tags,
            createdAt: "Today",
            updatedAt: "Today"
        });
        loadSnippets();
        setView(ViewType.HOME);
    }

    const handleEdit = async (createSnippet: CreateSnippet) => {
        // await updateSnippet(snippet.id, snippet);
        const snippet: Snippet = {
            id: selectedId,
            title: createSnippet.title,
            language: createSnippet.language,
            code: createSnippet.code,
            tags: createSnippet.tags,
            createdAt: "Yesterday",
            updatedAt: "Today"
        }

        setSnippets(snippets.map((s) => (s.id === snippet.id) ? snippet : s));
        setView(ViewType.HOME);
        setSelectedId(-1);
    }

    const handleFilterChanges = async (language: Language | null, tags: Tag[] | null) => {
        setFilters({language: language, tags: tags});
    }

    let filteredSnippets = snippets;
    if (filters.language) {
        filteredSnippets = filteredSnippets.filter((s) => s.language.id === filters.language?.id);
    }

    if (filters.tags && filters.tags.length > 0) {
        filteredSnippets = filteredSnippets.filter((s) => 
            s.tags &&
            filters.tags?.every((ft) => 
                s.tags?.some((t) => ft.id == t.id)
            )
        );
    }

    // Snippet Edit
    if (view === ViewType.EDIT_SNIPPET) {
        const findSnippet = snippets.find((s) => s.id == selectedId);

        return (
            <SnippetForm 
                initialSnippet={findSnippet}
                onSubmit={handleEdit}
                onCancel={() => setView(ViewType.SNIPPET_DETAILS)}
            />
        );
    }

    // Snippet Create
    if (view === ViewType.CREATE_SNIPPET) {
        return(
           <SnippetForm 
                onSubmit={handleCreate}
                onCancel={() => setView(ViewType.HOME)}
            />
        );
    }

    // Snippet View
    if (view === ViewType.SNIPPET_DETAILS) {
        const findSnippet = snippets.find((s) => s.id == selectedId);
        if (findSnippet != null) {
            return (
                <SnippetDetails 
                    snippet={findSnippet}
                    onEdit={() => setView(ViewType.EDIT_SNIPPET)}
                    onDelete={handleDelete}
                    onBack={() => setView(ViewType.HOME)}
                />
            );
        }
    }

    return(
        <div>

            <div className={styles.appContainer}>

                <div className={styles.appHeader}>
                    <h2 className={styles.appPageTitle}>My Snippets</h2>
                    <div className={styles.appBtnContainer}>
                        <button 
                        className="btn-design btn-green-design"
                        onClick={() => setView(ViewType.CREATE_SNIPPET)}
                        >
                            New
                        </button>
                    </div>
                </div>

                <div className={styles.appContent}>
                    <div className="app-sidebar">
                        <SnippetFilter 
                            onFilterChange={handleFilterChanges}
                            selectedLanguage={filters.language}
                            selectedTags={filters.tags}
                            selectedView={view}
                            onView={handleView}
                        />
                        
                    </div>
                    <div className="app-main">
                        {loading ? (
                            <div className="loading">
                                <p>Loading Snippets...</p>
                            </div>
                        ) : (
                            <SnippetList
                                snippets={filteredSnippets}
                                onView={handleDetails}
                                onDelete={handleDelete}
                            />
                        )}
                    </div>
                </div>

            
            </div>

        </div>
    );
}

export default SnippetsPage;