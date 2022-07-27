import React from "react";
import * as styles from './blogfilters.module.scss';

const BlogFilters = ({ categories, filteredCategories, handleCheckmarks }) => {

    const renderCheckmarks = () => {
        return categories.map(category => {
            if (category?.count > 0) {
                return (
                    <div key={category.name} className={styles.blogFiltersCheckboxContainer}>
                        <input checked={filteredCategories.some(id => parseFloat(id) === category.databaseId)} type="checkbox" name={category.name} onChange={(e) => handleCheckmarks(e)} value={category.databaseId} className={styles.blogFiltersCheckbox} />
                        <label for={category.name}>{category.name} ({category.count})</label>
                    </div>
                )
            }
        })
    }

    return (
        <div className={styles.blogFiltersContainer}>
            <div className={styles.blogFiltersFilters}>
                <h3 className={styles.blogFiltersFiltersTitle}>
                    Filter By Category
                </h3>
                {categories && renderCheckmarks()}
            </div>
        </div>
    )
}

export default BlogFilters;