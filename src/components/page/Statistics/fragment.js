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
                            formats: WEBP,
                            width: 227,
                            height: 498
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