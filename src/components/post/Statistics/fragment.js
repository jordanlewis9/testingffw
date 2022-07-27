module.exports = () => {
    return `
        preheading
        heading
        statistics {
            image {
                altText
                localFile {
                    childImageSharp {
                        gatsbyImageData(
                            formats: WEBP
                            )
                    }
                }
            }
            statistic
            label
            subheading
            content
        }
        topPadding
        bottomPadding
    `;
}