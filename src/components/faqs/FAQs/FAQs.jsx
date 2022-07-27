import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import CTA from '../CTA';
import FaqBlock from './FaqBlock';
import FaqPageFilters from './FaqPageFilters';
import * as styles from './faqs.module.scss';

const FAQs = ({ content, link }) => {
    const [searchFilter, setSearchFilter] = useState(null);
    const [checkboxFilter, setCheckboxFilter] = useState([]);
    const [filteredFAQs, setFilteredFAQs] = useState(null);

    const data = useStaticQuery(graphql`
    query FaqQuery {
        allWpFaqCategory(filter: {count: {gt: 0}}) {
            nodes {
              name
              uri
              count
              faqs {
                nodes {
                  content
                  title
                }
              }
            }
          }
      }
    `)

    const categories = data.allWpFaqCategory.nodes;

    useEffect(() => {
        if (!categories) {
            return;
        }

        let filteredCategories;

        if (checkboxFilter.length > 0) {
            filteredCategories = categories.filter(category => checkboxFilter.some(element => element === category.name));
        }

        if (searchFilter && filteredCategories) {
            filteredCategories = filteredCategories.map(category => {
                let copiedCategory = {...category, faqs: {nodes: [...category.faqs.nodes]}}
                let newFAQs = [];
                for (let i = 0; i < copiedCategory.faqs.nodes.length; i++) {
                    if (copiedCategory.faqs.nodes[i].content.toLowerCase().includes(searchFilter) || copiedCategory.faqs.nodes[i].title.toLowerCase().includes(searchFilter)) {
                        newFAQs.push(copiedCategory.faqs.nodes[i]);
                    }
                }
                copiedCategory.faqs.nodes = newFAQs;
                return copiedCategory;
            })
            filteredCategories = filteredCategories.filter(category => category.faqs.nodes.length > 0);
        } else if (searchFilter) {
            filteredCategories = categories.map(category => {
                let copiedCategory = {...category, faqs: {nodes: [...category.faqs.nodes]}}
                let newFAQs = [];
                for (let i = 0; i < copiedCategory.faqs.nodes.length; i++) {
                    if (copiedCategory.faqs.nodes[i].content.toLowerCase().includes(searchFilter) || copiedCategory.faqs.nodes[i].title.toLowerCase().includes(searchFilter)) {
                        newFAQs.push(copiedCategory.faqs.nodes[i]);
                    }
                }
                copiedCategory.faqs.nodes = newFAQs;
                return copiedCategory;
            })
            filteredCategories = filteredCategories.filter(category => category.faqs.nodes.length > 0);
        }

        setFilteredFAQs(filteredCategories);
    }, [searchFilter, checkboxFilter])

    const renderFaqs = () => {
        if (filteredFAQs) {
            return filteredFAQs.map(category => <FaqBlock key={category.name} category={category} />)
        } else {
            return categories.map(category => <FaqBlock key={category.name} category={category} />)
        }
    }

    const handleChecklist = (e) => {
        if (e.target.checked) {
            setCheckboxFilter([...checkboxFilter, e.target.value]);
        } else {
            let newCheckboxFilter = checkboxFilter.filter(item => item !== e.target.value);
            setCheckboxFilter(newCheckboxFilter);
        }
    }

    const handleSearchChange = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            setSearchFilter(null);
        } else {
            setSearchFilter(e.target.value.toLowerCase());
        }
    }

    return (
        <>
            <div className="col-md-4">
                <FaqPageFilters handleChecklist={handleChecklist} handleSearchChange={handleSearchChange} categories={categories} filteredFAQs={filteredFAQs} />
            </div>
            <div className="col-md-8">
                {(categories && categories.length > 0) && renderFaqs()}
                <CTA content={content} link={link} />
            </div>
        </>
    )
}

export default FAQs;