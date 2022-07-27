import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as styles from './faqpagefilters.module.scss';

const FaqPageFilters = ({ handleChecklist, handleSearchChange, categories, filteredFAQs }) => {
    const renderCheckboxes = () => {
        return categories.map(category => {
            let count;
            if (filteredFAQs) {
                let categoryIndex = filteredFAQs.findIndex(element => category.name === element.name)
                if (categoryIndex > -1) {
                    count = filteredFAQs[categoryIndex].faqs.nodes.length;
                } else {
                    count = 0;
                }
            }

            return (
                <div className={styles.faqsPageFiltersCheckboxContainer}>
                    <input onChange={(e) => handleChecklist(e)} value={category.name} type="checkbox" className={styles.faqsPageFiltersCheckbox} name={category.name} />
                    <label htmlFor={category.name} className={`${styles.faqsPageFiltersCheckboxLabel} ${count === 0 && styles.faqsPageFiltersCheckboxLabelDisabled}`}>{category.name} ({count > -1 ? count : category.count})</label>
                </div>
            )
        })
    }

    return (
        <div className={styles.faqsPageFilters}>
            <h3 className={styles.faqsPageFiltersTitle}>Filter by</h3>
            <form className={styles.faqsPageFiltersForm}>
                <input name="search" placeholder="Search" className={styles.faqsPageFiltersSearch} type="text" onChange={(e) => handleSearchChange(e)} />
                <FontAwesomeIcon icon={faSearch} className={styles.faqsPageFiltersSearchIcon} />
            </form>
            <div className={styles.faqsPageFiltersCheckboxes}>
                {(categories && categories.length > 0) && renderCheckboxes()}
            </div>
        </div>
    )
}

export default FaqPageFilters;