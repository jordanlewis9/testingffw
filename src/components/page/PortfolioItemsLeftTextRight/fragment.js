module.exports = () => {
    return `
        content
        addForm
        backgroundImage {
            altText
            localFile {
                childImageSharp {
                    gatsbyImageData(formats: WEBP)
                  }
            }
        }
    `
}