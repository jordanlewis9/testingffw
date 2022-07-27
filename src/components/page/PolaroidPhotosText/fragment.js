module.exports = () => {
    return `
    animation
    bottomPadding
    content
    topPadding
    icon
    link {
        target
        title
        url
    }
    horizontalPhoto {
        caption
        localFile {
        childImageSharp {
            gatsbyImageData(formats: WEBP)
        }
        }
    }
    verticalPhotoOne {
        caption
        localFile {
        childImageSharp {
            gatsbyImageData(formats: WEBP)
        }
        }
    }
    verticalPhotoTwo {
        caption
        localFile {
        childImageSharp {
            gatsbyImageData(formats: WEBP)
        }
        }
    }
    `;
}