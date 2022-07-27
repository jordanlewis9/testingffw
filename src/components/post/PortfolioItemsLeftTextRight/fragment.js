module.exports = () => {
    return `
        content
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