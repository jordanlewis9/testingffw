import React, { useContext } from 'react';
import { PagePropsContext } from '../GlobalContext';
import { Link } from 'gatsby';
import * as styles from './dropdownmenu.module.scss';

const DropdownMenu = ({themeOptions, subMenuItems, showSubMenu, handleShowSubMenu, databaseId}) => {
    const { pageProps } = useContext(PagePropsContext);
    const image = themeOptions.dropdownCtaImage?.localFile?.childImageSharp?.gatsbyImageData?.images?.fallback?.src;

    const renderParentItem = () => {
        const singleParentItem = subMenuItems.filter(item => item.parentDatabaseId === 0);
        return singleParentItem.map(item => {
            return (
                <Link key={item?.label} to={item?.path} title={item?.label} name={item?.label} className={styles.dropdownCenterColumnHeading}>
                    {item?.label}
                    <div className={styles.dropdownCenterColumnHeadingArrow}>
                        <div className={styles.dropdownCenterColumnHeadingArrowPointer}></div>
                    </div>
                </Link>
            )
        })
    }

    const renderSubMenuItems = () => {
        const renderedSubMenuItems = subMenuItems.map(item => {
            if (item.parentDatabaseId === 0) {
                 return;
            } else {
                return (
                    <li key={item?.label} className={`${styles.dropdownCenterColumnMenuItem} ${pageProps && pageProps.path === item?.path ? styles.dropdownCenterColumnMenuItemActive : ""}`}>
                        <Link key={item?.label} to={item?.path} title={item?.label} name={item?.label} className={styles.dropdownCenterColumnMenuItemLink}>
                            {item?.label}
                        </Link>
                    </li>
                )
            }
        });
        return renderedSubMenuItems;
    }

    const renderUtilityLinks = () => {
        const renderedUtilityLinks = themeOptions.dropdownUtilityLinks.map(link => {
            return (
                <li key={link?.link?.title} className={styles.dropdownRightColumnMenuItem}>
                    <a key={link?.link?.title} href={link?.link?.url} title={link?.link?.title} name={link?.link?.title} className={styles.dropdownRightColumnMenuItemLink}>
                        {link?.link?.title}
                    </a>
                </li>
            )
        });
        return renderedUtilityLinks;
    }

    const renderSubMenu = () => {
        return (
        <>
            <Link className={styles.dropdownLeftColumn} to={themeOptions?.dropdownCtaLink?.url} target={themeOptions?.dropdownCtaLink?.target} title={themeOptions?.dropdownCtaLink?.title}>
                {image && <div style={{ backgroundImage: `url('${image}')`}} className={styles.dropdownLeftColumnImage}></div>}
                <div className={styles.dropdownLeftColumnCta}>
                    <div className={styles.dropdownLeftColumnCtaText}>
                        {themeOptions?.dropdownCtaLink?.title}
                    </div>
                    <div className={styles.dropdownLeftColumnCtaArrow}>
                        <div className={styles.dropdownLeftColumnCtaArrowPointer}>

                        </div>
                    </div>
                </div>
            </Link>
            <div className={styles.dropdownCenterColumn}>
                {renderParentItem()}
                <ul className={styles.dropdownCenterColumnMenu}>
                    {renderSubMenuItems()}
                </ul>
            </div>
            <div className={styles.dropdownRightColumn}>
                <ul className={styles.dropdownRightColumnMenu}>
                    {renderUtilityLinks()}
                </ul>
                <a href={`mailto:${themeOptions?.dropdownEmail}`} className={styles.dropdownRightColumnEmail}>{themeOptions?.dropdownEmail}</a>
                <a href={`tel:${themeOptions?.dropdownPhoneNumber}`} className={styles.dropdownRightColumnPhone}>{themeOptions?.dropdownPhoneNumber}</a>
            </div>
            <button aria-label="Dropdown Menu Close Button" className={`${styles.dropdownCloseButton} menu-close-button`} onClick={(e) => handleShowSubMenu(e)}></button>
        </>
        )
    }

    return (
        <div className={`${styles.dropdownContainer} ${databaseId === showSubMenu ? styles.dropdownContainerActive : ''}`}>
            {renderSubMenu()}
        </div>
    )
}

export default DropdownMenu;