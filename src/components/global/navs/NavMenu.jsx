import React, { useState, useContext, useRef } from 'react';
import { PagePropsContext } from '../GlobalContext';
import { useStaticQuery, graphql, Link, navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import DropdownMenu from './DropdownMenu';
import * as styles from './navmenu.module.scss';

const NavMenu = ({ showMenu, setShowMenu }) => {
    const { pageProps } = useContext(PagePropsContext);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const formRef = useRef();

    const data = useStaticQuery(graphql`query {
        wpMenu(name: {eq: "Primary Menu"}) {
            menuItems {
              nodes {
                label
                parentDatabaseId
                databaseId
                path
                childItems {
                  nodes {
                    databaseId
                  }
                }
              }
            }
          }
          wp {
            themeOptions {
              themeOptions {
                dropdownCtaImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData(
                        formats: WEBP,
                        height: 666,
                        width: 1000
                        )
                    }
                  }
                }
                dropdownCtaLink {
                  target
                  title
                  url
                }
                dropdownEmail
                dropdownPhoneNumber
                dropdownUtilityLinks {
                  link {
                    target
                    title
                    url
                  }
                }
              }
            }
          }
        }`);
      const nodes = data.wpMenu.menuItems.nodes;
      const themeOptions = data.wp.themeOptions.themeOptions;

      let possibleParents = [];
      let subMenuItems = [];

      // The idea is to first map over and display the parent menu items based on parentDatabaseId === 0, then map through and place the 
      // children items inside of the mega menu, even if they have a parent inside of the mega menu
      // Parent item also needs to be in the mega menu!

      const handleShowSubMenu = (e, subMenuOpen) => {
        if (typeof window !== "undefined" && window.innerWidth > 991) {
          if (e.type === "mouseenter") {
            e.preventDefault();
            setShowSubMenu(parseFloat(e.target.dataset.databaseId));
          } else if (e.type === "mouseleave" || e.target.classList.contains('menu-close-button')) {
            setShowSubMenu(false);
          }
        } else if (typeof window !== "undefined" && window.innerWidth <= 991 && e.type === "click") {
          if (e.type === "click" && !showSubMenu) {
            e.preventDefault();
            setShowSubMenu(parseFloat(e.target.closest('.menu-item-has-children').dataset.databaseId));
          } else if (e.type === "click") {
            setShowSubMenu(false);
          }
        }
      }

      const renderMainNav = () => {
          let mainMenu = nodes.filter(node => node.parentDatabaseId === 0); 
          mainMenu = mainMenu.map((node, index) => {
            possibleParents = [];
            subMenuItems = [];
            if (node.childItems.nodes.length === 0) {
                return <li className={`${styles.menuItemNoChildren} ${styles.menuItem}`} key={node.databaseId}><Link to={node?.path} className={`${pageProps && node.path === pageProps.path ? styles.menuItemActive : ""}`}>{node?.label}</Link></li>;
              } else {
                possibleParents = [node.databaseId]
                subMenuItems = [node]
                nodes.forEach(item => {
                  if (possibleParents.indexOf(item.parentDatabaseId) !== -1) {
                    possibleParents.push(item.databaseId);
                    subMenuItems.push(item);
                  }
                });
                return (
                  <li onClick={(e) => handleShowSubMenu(e)} onMouseEnter={(e) => handleShowSubMenu(e, showSubMenu)} onMouseLeave={(e) => handleShowSubMenu(e)} data-database-id={node.databaseId} className={`${styles.menuItemHasChildren} ${styles.menuItem} menu-item-has-children`} key={node.databaseId} data-sub-menu={node.databaseId}>
                    <span className={`${styles.menuItemHasChildrenLabel} ${pageProps && node?.path === pageProps?.path ? styles.menuItemActive : ""}`}>{node.label}</span>
                    <DropdownMenu themeOptions={themeOptions} subMenuItems={subMenuItems} showSubMenu={showSubMenu} handleShowSubMenu={handleShowSubMenu} databaseId={node.databaseId} />
                  </li>);
              }
          })
          return mainMenu;
      }

      const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/site-search?q=${searchValue}`);
      }

      const handleSearchClick = () => {
        const theForm = formRef.current;

        if (theForm.classList.contains('show-header-search')) {
          theForm.classList.remove('show-header-search')
        } else {
          theForm.classList.add('show-header-search');
        }
      }

    return (
        <>
            <ul className={`${styles.navList} ${showMenu ? styles.active : ''} ${showMenu ? 'nav-menu-mobile' : ''}`}>
                {nodes && renderMainNav()}
                <li className={styles.navSearchContainer}>
                  <FontAwesomeIcon icon={faSearch} className={styles.navSearchIcon} onClick={handleSearchClick} title="Search"/>
                  <label htmlFor="Navigation Search Form" className={styles.navSearchLabel} hidden={true}>Search</label>
                  <form className={styles.navSearch} action="" onSubmit={(e) => handleSearchSubmit(e)} ref={formRef} name="Navigation Search Form">
                    <input aria-label="Search" type="text" className={styles.navSearchInput} value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
                  </form>
                </li>
                <li className={`${styles.menuItemNoChildren} ${styles.menuItem} ${styles.navSearchLinkMobile}`}><Link to='/site-search' className={`${pageProps && '/site-search/' === pageProps.path ? styles.menuItemActive : ""}`}>Search</Link></li>
            </ul>
            <button aria-label="Open Mobile Menu" name="Open Mobile Menu" className={`${styles.mobileButton} ${showMenu && styles.mobileButtonShown} ${showMenu ? 'nav-button-mobile' : ''}`} onClick={() => setShowMenu(!showMenu)}>
              <span className={`${styles.mobileButtonTopBar} ${showMenu ? styles.mobileMenuShown : ''}`}></span>
              <span className={`${styles.mobileButtonMiddleBar} ${showMenu ? styles.mobileMenuShown : ''}`}></span>
              <span className={`${styles.mobileButtonBottomBar} ${showMenu ? styles.mobileMenuShown : ''}`}></span>
            </button>
        </>
    )
}

export default NavMenu;