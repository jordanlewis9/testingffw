import React from 'react';
import * as styles from './ourworkfilters.module.scss';

const OurWorkFilters = ({ handleCheckmarks, allIndustries }) => {
    const renderCheckmarks = () => {
        return allIndustries.map(industry => {
            return (
                <div key={industry.name} className={styles.ourWorkPageCheckboxContainer}>
                    <input type="checkbox" name={industry.name} onChange={(e) => handleCheckmarks(e)} value={industry.name} className={styles.ourWorkPageCheckbox} />
                    <label for={industry.name}>{industry.name} ({industry.count})</label>
                </div>
            )
        })
    }

    return (
        <div className={styles.ourWorkPageFilters}>
            <h3 className={styles.ourWorkPageFiltersTitle}>
                Filter By Category
            </h3>
            {allIndustries && renderCheckmarks()}
        </div>
    )
}

export default OurWorkFilters;