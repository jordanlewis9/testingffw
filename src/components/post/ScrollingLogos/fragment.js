module.exports = () => {
    return `
        scrollSpeed
        logos {
            link {
                title
                url
                target
            }
            logo {
                altText
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            formats: WEBP
                            height: 50
                            )
                    }
                }
            }
        }
        animation
        topPadding
        bottomPadding
    `;
}