// Step 1: Import React
import * as React from 'react'
import LayoutMain from '../layout/layout'

// Step 2: Define your component
const AboutPage = () => {
    return (
        <LayoutMain pageTitle={"About Me"}>
            This is the about me page
        </LayoutMain>
    )
}



// Step 3: Export your component
export default AboutPage

export const Head: React.FC = () => <title>About Me</title>