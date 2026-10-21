import { useState } from "react";
import type { Tag } from "../models/snippet.types";
import { FilterViewType } from "../util/types";


interface FilterTagManagerProps {
    onAdd: (tag: Tag) => Tag | null;
    onEdit: (id: number, tag: Tag) => void;
    onDelete: (id: number) => void;
}

function FilterTagManager({onAdd, onEdit, onDelete} : FilterTagManagerProps) {
    const [filterView, setFilterView] = useState(FilterViewType.ADD);

    // As ID of the TAG
    const [selectedTag, setSelectedTag] = useState(-1);

    const handleAdd = (tag: Tag) => {
        onAdd(tag);
    }

    const handleEdit = (id: number, tag: Tag) => {
        onEdit(id, tag);
    }

    const handleDelete = (id: number) => {
        onDelete(id);
    }


    if (filterView === FilterViewType.EDIT) {

    }

    if (filterView === FilterViewType.DELETE) {

    }


    // This is the ADD VIEW (DEFAULT)
    return (
        <div className="fm-container">
            <div className="fm-header">
                <button
                    className="fm-button-add"
                >
                    Add
                </button>
                <button
                    className="fm-button-edit"
                >
                    Edit
                </button>
                <button
                    className="fm-button-delete"
                >
                    Delete
                </button>
            </div>
            <div className="fm-container-add">
                <label className="fm-tag-title">Tag</label>
                <input 
                    type="text" 
                />
            </div>
        </div>
    );
}

export default FilterTagManager;