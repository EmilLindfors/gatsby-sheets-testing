import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NewsTemplate = ({ data }) => (
  <Layout>
    <SEO title={data.nyheter.tittel} />
    {JSON.stringify(data.nyheter)}
  </Layout>
)

export default NewsTemplate

export const ItemPageQuery = graphql`
  query SingleNews($itemId: String!) {
    nyheter(id: { eq: $itemId }) {
      slug
      dato
      tekst
      tittel
      coverUrl
      campus
      blurb
      forfatter
      id
    }
  }
`
