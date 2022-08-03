module.exports = () => {
    return `
        preheading
        heading
        button {
            url
            title
            target
        }
        tiles {
            link {
                target
                title
                url
            }
            icon {
                localFile {
                    childImageSharp {
                      gatsbyImageData(formats: WEBP)
                    }
                  }
            }
        }
        ctaButton {
            target
            title
            url
        }
        topPadding
        bottomPadding
    `;
};