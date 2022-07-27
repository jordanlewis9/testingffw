module.exports = () => {
    return `
        animation
        bottomPadding
        content
        heading
        image {
            localFile {
            childImageSharp {
                gatsbyImageData(formats: WEBP)
            }
            }
        }
        imageSide
        subheading
        textBackgroundColor
        textColor
        topPadding
    `
}