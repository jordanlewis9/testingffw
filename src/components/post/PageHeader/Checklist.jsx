import React, { useEffect, useState, useContext } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { PagePropsContext } from '../../global/GlobalContext';
import * as styles from './checklist.module.scss';

const Checklist = ({ checklist }) => {
    const { pageProps } = useContext(PagePropsContext);

    const data = useStaticQuery(graphql`
    query PostTheChecklistQuery {
        allWpChecklist {
          nodes {
            databaseId
            title
            id
            checklist {
              checklistPages {
                ... on WpPage {
                  id
                  title
                  uri
                  pageChecklist {
                    pageChecklistTitle
                  }
                }
              }
            }
          }
        }
      }
    `);

    const [checklistItems, setChecklistItems] = useState([]);
    const [checklistTitle, setChecklistTitle] = useState(null);

    useEffect(() => {
        let savedChecklist = data?.allWpChecklist?.nodes.filter(el => el?.databaseId === parseFloat(checklist));
        setChecklistTitle(savedChecklist[0]?.title);
        let checklistToRender = savedChecklist[0]?.checklist?.checklistPages;
        setChecklistItems(checklistToRender);
    }, []);

    const updateTitle = (checklistArray) => {
        return checklistArray.every(item => item.visited === true);
    }

    const updateChecklist = () => {
        let updatedChecklist = checklistItems.map(item => {
            // If statement is for Gatsby build, since window does not exist outside of the browser
            if (typeof window !== 'undefined' && typeof Storage !== 'undefined') {
                // Pathname can either return with slashes on both ends, or just one, and both are valid.
                if (JSON.parse(sessionStorage.getItem('pagesVisited')).some(page => page === item.id)) {
                    item.visited = true;
                }
            }
            return item;
        });

        let checklistTitleObject = {
            title: checklistTitle,
            allVisited: updateTitle(updatedChecklist)
        }

        return [updatedChecklist, checklistTitleObject];
    }

    const renderChecklist = () => {
        let [updatedChecklist, checklistTitleObject] = updateChecklist();

        updatedChecklist = updatedChecklist.map(item => {
            if (item?.visited === true) {
                return (
                    <li className={styles.checked} key={item?.id}>
                        <Link to={item?.uri} className={styles.pageHeaderChecklistItem} title={item?.title}>
                            <span dangerouslySetInnerHTML={{ __html: item?.pageChecklist?.pageChecklistTitle ? item.pageChecklist.pageChecklistTitle : item?.title }}></span>
                        </Link>
                    </li>
                )
            } else {
                return (
                    <li key={item?.id}>
                        <Link to={item?.uri} className={styles.pageHeaderChecklistItem}>
                            <span dangerouslySetInnerHTML={{ __html: item?.pageChecklist?.pageChecklistTitle ? item.pageChecklist.pageChecklistTitle : item?.title }}></span>
                        </Link>
                    </li>
                )
            }
        });

        return (
            <>
                <div className={styles.pageHeaderChecklistTitleWrap}>
                    <div className={`${styles.pageHeaderChecklistTitle} h3`}>
                        {checklistTitleObject.title}
                    </div>
                    <div className={`${styles.pageHeaderChecklistCheck} ${checklistTitleObject.allVisited === true ? styles.pageHeaderChecklistCheckChecked : ''}`} id="checklist-check"></div>
                </div>
                <ul className={styles.pageHeaderChecklistList}>{updatedChecklist}</ul>
            </>
        )
    }

    return (
        <div className={styles.pageHeaderChecklist}>
            {checklistItems?.length > 0 && renderChecklist()}
        </div>
    )
}

export default Checklist;