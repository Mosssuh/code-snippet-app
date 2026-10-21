

/*
    <Back Button>                   <Edit Button> <Delete Snippet Button>
    <Snippet Name>                  <Snippet Language>

    <Code>

    <Tags>

    <Label Created At>

*/

import type { Snippet } from "../models/snippet.types";

import styles from './styles/SnippetDetails.module.css';
import '../themes/theme.css';

interface SnippetViewProps {
    snippet: Snippet;
    onEdit: () => void;
    onDelete: (snippetID: number) => void;
    onBack: () => void; 
}


function SnippetDetails({snippet, onEdit, onDelete, onBack}: SnippetViewProps) {
    const handleEdit = () => {
        onEdit();
    }

    const handleDelete = () => {
        onDelete(snippet.id);
    }

    return (
        <div className={styles.snippetDetails}>
            <div className={styles.headerBottons}>
                <button className="btn-design btn-red-design" onClick={onBack}>
                    Back
                </button>
            </div>
            <div className={styles.snippetContainer}>
                <div className={styles.snippetHeader}>
                    <label className={styles.snippetTitle}>
                        {snippet.title}
                    </label>
                    <span className={`span-design-v2 span-white-design ${styles.detailLanguage}`} key={snippet.language.id}>
                        {snippet.language.name}
                    </span>
                </div>
                <code className={styles.snippetCode}>
                    {snippet.code}
                </code>
                <div className={styles.snippetTagsSection}>
                    <label className={styles.snippetTagsTitle}>{snippet.tags.length > 0 ? "Tags" : ""}</label>
                    <div className={styles.snippetTags}>
                        {snippet.tags.map((tag) => (
                            <span className="span-design-v2 span-green-design" key={tag.id}>{tag.name}</span>
                        ))}
                    </div>
                </div>
                <div className={styles.snippetExtra}>
                    <p className={`span-design-v2 span-pink-design`}>
                        Created At {snippet.createdAt}
                    </p>
                    <p className={`span-design-v2 span-pink-design`}>
                        Last Update {snippet.updatedAt}
                    </p>
                </div>
            </div>
            <div className={styles.footerBottons}>
                <button className={`btn-design btn-blue-design`} onClick={handleEdit}>
                    Edit
                </button>
                <button className={`btn-design btn-red-design`} onClick={handleDelete}>
                    Delete
                </button>
            </div>
        </div>
    );
}

export default SnippetDetails;