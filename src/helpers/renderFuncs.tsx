import React from "react";

export const renderTags = (tagsArr: string[]) => {
    return tagsArr?.length ? (
        <ul className='tags-list'>
            {tagsArr.map((tag, index) => (
                <li key={`tag-item-${tag}`} className='tag-item'>{tag}</li>
            ))}
        </ul>
    ) : '';
};