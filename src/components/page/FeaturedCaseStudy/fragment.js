module.exports = () => {
    return `
    bottomPadding
    backgroundImage {
        localFile {
            childImageSharp {
                gatsbyImageData(formats: WEBP)
            }
            }
    }
    link {
        target
        title
        url
    }
    logo {
        localFile {
        childImageSharp {
            gatsbyImageData(formats: WEBP)
        }
        }
    }
    topPadding
    websiteScreenshot {
        localFile {
        childImageSharp {
            gatsbyImageData(formats: WEBP)
        }
        }
    }
    `;
}