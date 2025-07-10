// If you don't want to use TypeScript you can delete this file!
import * as React from "react"
import { PageProps, graphql, HeadFC } from "gatsby"

import Layout from "../layout/layout"
import Seo from "../components/seo"
import AboutMeContent from "../components/AboutMeContent"

type DataProps = {
  site: {
    buildTime: string
  }
}

const AboutMe: React.FC<PageProps<DataProps>> = ({ data, location }) => (
  <Layout title="About Me" location={location}>
    <AboutMeContent />
  </Layout>
)

export const Head: HeadFC<DataProps> = () => <Seo title="About Me" />

export default AboutMe

export const query = graphql`
  {
    site {
      buildTime(formatString: "YYYY-MM-DD hh:mm a z")
    }
  }
`
