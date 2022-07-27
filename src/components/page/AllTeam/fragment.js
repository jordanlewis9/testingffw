module.exports = () => {
    return `
    bottomPadding
    heading
    topPadding
    peopleToDisplay {
        ... on WpPerson {
        id
        team {
            bio
            funFact
            position
            shortBio
            headshot {
            localFile {
                childImageSharp {
                gatsbyImageData(formats: WEBP)
                }
            }
            }
        }
        title
        uri
        }
    }
    `
};