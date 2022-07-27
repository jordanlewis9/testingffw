module.exports = () => {
    return `
    animation
    bottomPadding
    content
    topPadding
    imageOne {
        localFile {
        childImageSharp {
            gatsbyImageData(formats: WEBP)
        }
        }
    }
    imageTwo {
        localFile {
        childImageSharp {
            gatsbyImageData(formats: WEBP)
        }
        }
    }
    `;
}