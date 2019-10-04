import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const EventTemplate = ({ data }) => (
  <Layout>
    <SEO title={data.arrangement.tittel} />
    {JSON.stringify(data.arrangement)}
  </Layout>
)

export default EventTemplate

export const ItemPageQuery = graphql`
  query SingleEvent($itemId: String!) {
    arrangement(id: { eq: $itemId }) {
      start
      slutt
      slug
      registreringslenke
      programUrl
      mat
      maksdeltakere
      facebookevent
      cover
      id
      campus
      bekskrivelse
      adresse
      tittel
      tags
    }
  }
`
