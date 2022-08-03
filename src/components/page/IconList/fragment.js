module.exports = () => {
    return `
    animation
    bottomPadding
    heading
    topPadding
    list {
      icon {
        localFile {
          childImageSharp {
            gatsbyImageData(formats: WEBP)
          }
        }
      }
      text
    }
    `;
}