import React from "react"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"
import "@fortawesome/fontawesome-svg-core/styles.css"
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false

export default ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
)
