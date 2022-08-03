module.exports = () => {
    return `
    bottomPadding
    topPadding
    services {
      content
      icon {
        localFile {
          childImageSharp {
            gatsbyImageData(formats: WEBP)
          }
        }
      }
    }
    `;
}