module.exports = () => {
    return `
    animation
    backgroundColor
    bottomPadding
    content
    image {
      localFile {
        childImageSharp {
          gatsbyImageData(formats: WEBP)
        }
      }
    }
    imageSide
    textColor
    topPadding
    `;
}