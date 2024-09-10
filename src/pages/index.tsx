import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import LayoutMain from "../layout/layout"


const IndexPage: React.FC<PageProps> = () => {
  return (
    <LayoutMain pageTitle={"Hein's Blog"}>
      <p>I'm making this by following the Gatsby Tutorial.</p>
    </LayoutMain>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
