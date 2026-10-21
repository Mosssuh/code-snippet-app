import type { Snippet } from '../models/snippet.types';
import styles from './styles/SnippetCard.module.css';
import '../themes/theme.css';


export interface SnippetCardProps {
    snippet: Snippet
    onView: (id: number) => void;
    onDelete: (id: number) => void
}

function SnippetCard({snippet, onView, onDelete}: SnippetCardProps) {
    /*

    <Title>
    <tags>

    <separator>

    <language>
    <code>
    
    <Buttons: Copy, View, Delete>
    */

    const copyCode = () => {
        navigator.clipboard.writeText(snippet.code);
        alert("Copied code!");
    };

    const previewCode = snippet.code.length > 150 ? snippet.code.substring(0, 150) : snippet.code;

    return(
        <div className={styles.snippetCard}>
            <div className={styles.snippetHeader}>
                <h5 className={styles.snippetTitle} onClick={() => onView(snippet.id)}>
                        {snippet.title}
                </h5>
                <span className={`span-design-v2 span-white-design ${styles.snippetLanguage}`} key={snippet.language.id}>{snippet.language.name}</span>
            </div>
            <hr className={styles.separatorLine}/>
            <div className={styles.snippetCode}>
                <code>{previewCode}</code>
            </div>
            <div className={styles.snippetTags}>
                {snippet.tags.map(tag => (
                    <span key={tag.id} className={`span-design-v2 span-green-design ${styles.snippetTag}`}>{tag.name}</span>
                ))}
            </div>
            <div className="btns-bottom-design">
                <button className="btn-design btn-green-design" onClick={copyCode}>
                    Copy
                </button>
                <button className="btn-design btn-blue-design" onClick={() => onView(snippet.id)}>
                    View
                </button>
                <button className="btn-design btn-red-design" onClick={() => onDelete(snippet.id)}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default SnippetCard;