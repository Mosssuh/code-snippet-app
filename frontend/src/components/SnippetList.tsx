import type { Snippet } from "../models/snippet.types";
import SnippetCard from "./SnippetCard.tsx";
import styles from './styles/SnippetList.module.css';


interface SnippetListProps {
    snippets: Snippet[];
    onView: (id: number) => void;
    onDelete: (id: number) => void;
}

function SnippetList({snippets, onView, onDelete}: SnippetListProps) {
    /*

    <snippet 1> <snippet 2> <snippet 3>
    <snippet 4> <snippet 5> <snippet 6>

    */


    if (snippets.length === 0) {
        return(
            <div className="empty-snippets">
                <h5 className={styles.emptySnippetsText}>
                    There isn't registered snippets. Try to create your first one.
                </h5>
            </div>
        );
    }

    return(
        <div className={styles.snippets}>
            {snippets.map(snippet => (
                <SnippetCard 
                    key={snippet.id}
                    snippet={snippet}
                    onView={onView}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default SnippetList;