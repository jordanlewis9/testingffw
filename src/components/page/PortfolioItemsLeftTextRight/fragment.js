module.exports = () => {
    return `
        content
        addForm
        backgroundImage {
            altText
            localFile {
                childImageSharp {
                    gatsbyImageData(
                        formats: WEBP,
                        width: 1400,
                        height: 893
                        )
                  }
            }
        }
    `
}