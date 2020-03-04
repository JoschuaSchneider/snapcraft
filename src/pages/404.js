import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div className="p-6 text-gray-700">Page could not be found.</div>
  </Layout>
)

export default NotFoundPage
