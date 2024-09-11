import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import LayoutMain from "../layout/layout"
import { StaticImage } from "gatsby-plugin-image"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <LayoutMain pageTitle={"Hein's Blog"}>
      <p>I'm making this by following the Gatsby Tutorial.</p>
      <StaticImage
        alt="Clifford, a reddish-brown pitbull, posing on a couch and looking stoically at the camera"
        src="https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
      />
    </LayoutMain>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
