import { useEffect, useState } from "react";
import type { Language, Tag } from "../models/snippet.types";
import { getTags } from "../services/TagsAPI";
import { localLanguages, localTags } from "../util/DefaultValues";
import styles from "./styles/SnippetFilter.module.css";
import { ViewType } from "../util/types";

interface SnippetFilterProps {
    onFilterChange: (language: Language | null, tags: Tag[] | null) => void;
    selectedLanguage: Language | null;
    selectedTags: Tag[] | null;
    selectedView: string;
    onView: (type: string) => void;
}

function SnippetFilter({onFilterChange, selectedLanguage, selectedTags, selectedView, onView}: SnippetFilterProps) {
    const [tags, setTags] = useState<Tag[]>([]);
    const [languages, setLanguages] = useState<Language[]>([]);
    
    // Estado para controlar si el modal está abierto o cerrado
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setLanguages(localLanguages);
        setTags(localTags);
        // getTags().then(tags => setTags(tags));
    });

    const handleClearAll = () => {
        onFilterChange(null, null);
    }

    const handleLanguage = (language: Language) => {
        const newLanguage = selectedLanguage?.id === language.id ? null : language;
        onFilterChange(newLanguage, selectedTags);
    }

    const handleTags = (tag: Tag) => {
        if (selectedTags && selectedTags.includes(tag)) {
            const newTags: Tag[] = selectedTags.filter((t) => t.id !== tag.id);
            onFilterChange(selectedLanguage, newTags);
        } else {
            const baseTags = selectedTags || [];
            const newTags: Tag[] = [...baseTags, tag];
            onFilterChange(selectedLanguage, newTags);
        }
    }

    const handleAdd = (tag: Tag) => {
        tag
    }

    if (selectedView === ViewType.FILTER_MANAGER) {
        return (
            <FilterTagManager 
                onAdd={}
                onEdit={}
                onDelete={}
            />
        );
    }


    return (
        <>
            <div className={styles.filterCard}>
                <div className={styles.filterHeader}>
                    <h2 
                        className={styles.filterTitle}
                        onClick={() => onView(ViewType.FILTER_MANAGER)}
                    >
                        Filters
                    </h2>
                    <div className={styles.filterHeaderActions}>
                        <button 
                            className="btn-design btn-green-design"
                            onClick={() => handleClearAll()}
                        >
                            Clean
                        </button>
                    </div>
                    <hr className={styles.separator}/>
                </div>
                <div className="filter-container">
                    <div className={`${styles.filterSection} ${styles.filterLanguage}`}>
                        <label className={`${styles.filterLabel} filter-language-label`}>Language</label>
                        <div className={styles.filterButtons}>
                            {languages.map((language) => (
                                <button 
                                    key={language.id}
                                    className={`span-design ${selectedLanguage?.id === language.id ? "span-green-dark-design span-selected-design" : "span-white-design"}`}
                                    onClick={() => handleLanguage(language)}
                                >
                                    {language.name}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={`${styles.filterSection} filter-tags`}>
                        <label className={`${styles.filterLabel} filter-tags-label`}>Tags</label>
                        <div className={styles.filterButtons}>
                            {tags.map((tag) => (
                                <button 
                                    className={`span-design ${selectedTags?.includes(tag) ? "span-green-dark-design span-selected-design" : "span-white-design"}`}
                                    key={tag.id}
                                    onClick={() => handleTags(tag)}
                                >
                                    {tag.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SnippetFilter;
