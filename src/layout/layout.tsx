import * as React from "react"
import { Link } from "gatsby"
import { NavBar } from "../components/navbar/NavBar"
import { SiteFooter } from "../components/footer/SiteFooter"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <NavBar />
      {/* <header className="global-header">{header}</header> */}
      <main>{children}</main>
      <footer>
        <div className="footerContent">© {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a></div>
      </footer>
    </div>
  )
}

export default Layout
