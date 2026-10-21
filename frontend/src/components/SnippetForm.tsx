import { useEffect } from "react";
import { useState } from "react";
import type { Language, Snippet, Tag } from "../models/snippet.types";
import { localLanguages, localTags } from "../util/DefaultValues";
import styles from './styles/SnippetForm.module.css';
import { invalidLanguage } from "../util/InvalidValues";


/*

Create / Edit Snippet

Title
<title space>

Language
<Select Language List>

Code
<ListString Code>

Tags: (Select)
<select box tags>

<Button = Create/Edit> <Button = Cancel>

*/

export interface CreateSnippet {
    title: string;
    language: Language;
    code: string;
    tags: Tag[];
}

interface SnippetFormProps {
    initialSnippet?: Snippet;
    onSubmit: (CreateSnippet: CreateSnippet) => void;
    onCancel: () => void;
}

function SnippetForm({initialSnippet, onSubmit, onCancel}: SnippetFormProps) {
    const [title, setTitle] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState<number>(0);
    const [languages, setLanguages] = useState<Language[]>([]);
    const [code, setCode] = useState("");
    const [tags, setTags] = useState<Tag[]>([]); // Tags
    const [selectedTags, setSelectedTags] = useState<number[]>([]); // Tags ID


    useEffect(() => {
        // getTags().then((tags) => setTags(tags));
        // getLanguages().then((languages) => setLanguages(languages));
        setTags(localTags);
        setLanguages(localLanguages);

        if (initialSnippet) {
            setTitle(initialSnippet.title || "");
            setSelectedLanguage(initialSnippet.language.id || -1);
            setCode(initialSnippet.code || "");
            setSelectedTags(initialSnippet.tags?.map(t => t.id) || "");
        }
    }, [initialSnippet]);

    const toggleTag = (id: number) => {
        // Deselect tag
        if (selectedTags.includes(id)) {
            setSelectedTags(selectedTags.filter((x) => x !== id));
        } else {
            // Select tag
            setSelectedTags([...selectedTags, id]);
        }
    }


    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {  
        e.preventDefault();
        const tagsToSend = tags.filter((tag) => selectedTags.includes(tag.id));

        const languageToSend = languages.find((l) => l.id === selectedLanguage);
        if (!languageToSend) {
            alert("You haven't selected a language!")
        } else {
            onSubmit({
                title,
                language: languageToSend,
                code,
                tags: tagsToSend
            })
        }
    };

    return (
        <section className={styles.formContainer}>
            <h5 className={styles.formTitle}>
                {initialSnippet ? "Edit your Snippet" : "Create a Snippet"}
            </h5>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Title</label>
                    <input 
                        className={styles.formInput}
                        type="text"
                        value={title}
                        placeholder="Function to multiply"
                        required
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Language</label>
                    <select 
                        className={styles.formSelect}
                        value={selectedLanguage}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            const selectedID = Number(e.target.value);

                            const selected = languages.find((l) => l.id === selectedID);

                            if (selected) {
                                setSelectedLanguage(selectedID);
                            }
                        }}
                    >
                        {localLanguages.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Code</label>
                    <textarea 
                        className={styles.formInput}
                        value={code}
                        required
                        placeholder="Paste your code here..."
                        rows={15}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setCode(e.target.value)}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Tags</label>
                    <div className={styles.formCheckboxes}>
                        {tags.length === 0 ? (
                            <p>There don't available tags</p>
                        ) : (
                            tags.map((tag) => (
                                <div className={styles.formCheckbox} key={tag.id}>
                                    <input
                                        type="checkbox" 
                                        checked={selectedTags.includes(tag.id)}
                                        onChange={() => toggleTag(tag.id)}
                                    />
                                    <label>{tag.name}</label>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div className={styles.formBottons}>
                    <button 
                        className={`${styles.formBtn} ${styles.formBtnUpsert}`}
                        type="submit"
                    >
                        {initialSnippet ? "Update" : "Create"}
                    </button>
                    <button 
                        className={`${styles.formBtn} ${styles.formBtnCancel}`}
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );

}

export default SnippetForm;