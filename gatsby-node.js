require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const fetchSheet = require(`./fetch-sheet.js`).default
const path = require(`path`)

const createNodesfromSheet = async ({
  sheetId,
  sheetName,
  credentials,
  createNodeId,
  createNode,
  createContentDigest,
}) => {
  let rows = await fetchSheet(sheetId, sheetName, credentials)
  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")
    return `${slug}`.replace(/\/\/+/g, "/")
  }

  rows.forEach(r => {
    let nodeData

    if (sheetName === "nyheter") {
      nodeData = {
        tittel: r.tittel,
        slug: slugify(r.tittel),
        tekst: r.tekst,
        blurb: r.tekst ? r.tekst.substr(0, 200) : "",
        coverUrl: r.cover
          ? `https://drive.google.com/thumbnail?${r.cover.split("?")[1]}`
          : "",
        dato: r.dato
          ? `${r.dato.split("/")[2]}-${r.dato.split("/")[1]}-${
              r.dato.split("/")[0]
            }`
          : "",
        forfatter: r.forfatter,
        campus: r.campus,
      }
    } else if (sheetName === "arrangement") {
      nodeData = {
        tittel: r.tittel,
        start: r.startdato
          ? `${r.startdato.split("/")[2].split(" ")[0]}-${
              r.startdato.split("/")[1]
            }-${r.startdato.split("/")[0]} ${
              r.startdato.split("/")[2].split(" ")[1]
            }+02:00`
          : "",
        slutt: r.sluttdato
          ? `${r.sluttdato.split("/")[2].split(" ")[0]}-${
              r.sluttdato.split("/")[1]
            }-${r.sluttdato.split("/")[0]} ${
              r.sluttdato.split("/")[2].split(" ")[1]
            }+02:00`
          : "",
        slug: slugify(r.tittel),
        programUrl: r.program
          ? `https://drive.google.com/thumbnail?${r.program.split("?")[1]}`
          : "",
        cover: r.forsidebilde
          ? `https://drive.google.com/thumbnail?${r.forsidebilde.split("?")[1]}`
          : r.bilde
          ? r.bilde
          : "",
        tags: r.tags ? r.tags.split(",") : [],
        adresse: r.adresse,
        bekskrivelse: r.bekskrivelse,
        campus: r.campus,
        facebookevent: r.facebookevent,
        maksdeltakere: r.maksdeltakere,
        mat: r.mat,
        registreringslenke: r.registreringslenke,
      }
    } else if (sheetName === "folk") {
      nodeData = {
        avatar: `https://drive.google.com/thumbnail?${
          r.profilbilde.split("?")[1]
        }`,
        fornavn: r.fornavn,
        navn: `${r.fornavn} ${r.etternavn}`,
        firma: r.firma,
        etternavn: r.etternavn,
        stilling: r.stilling,
        hvlprofilside: r.hvlprofilside,
        email: r.emailaddress,
        linkedin: r.linkedin,
        kontaktperson: r.kontaktperson,
      }
    } else {
      nodeData = r
    }

    //TODO: fix hardcoded timezone difference
    createNode(
      Object.assign(nodeData, {
        id: createNodeId(`${sheetName}-${r.id}`),
        parent: "__SOURCE__",
        children: [],
        internal: {
          type: sheetName,
          content: JSON.stringify(r),
          contentDigest: createContentDigest(r),
        },
      })
    )
  })
}

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions

  // remember to use replace on private key!
  const credentials = {
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key.replace(/\\n/g, "\n"),
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
  }
  const myCampuses = [
    {
      key: 1,
      name: `Bergen`,
      address: `Fabrikkgaten 3, 5059 Bergen`,
    },
    {
      key: 2,
      name: `Stord`,
      address: `Stord 3, 5059 Stord`,
    },
    {
      key: 3,
      name: `Førde`,
      address: `Førde 3, 5059 Førde`,
    },
    {
      key: 4,
      name: `Sogndal`,
      address: `Sogndal 3, 5059 Sogndal`,
    },
    {
      key: 5,
      name: `Haugesund`,
      address: `Haugesund 3, 5059 Haugesund`,
    },
  ]
  await myCampuses.map(camp => {
    const nodeMeta = {
      id: createNodeId(`my-campus-${camp.key}`),
      parent: null,
      children: [],
      internal: {
        type: `campus`,
        mediaType: `text/html`,
        content: JSON.stringify(camp),
        contentDigest: createContentDigest(camp),
      },
    }

    const node = Object.assign({}, camp, nodeMeta)
    return createNode(node)
  })

  await createNodesfromSheet({
    sheetId: "1IditGvi_5omkbgnxvCWVMRDZ4DG9hGI7AuN0pRUSrac",
    sheetName: "nyheter",
    credentials: credentials,
    createNodeId,
    createNode,
    createContentDigest,
  })
  await createNodesfromSheet({
    sheetId: "1zwvF0OjW1x0H7RIGnuqRvb2JVqDv1RvMOBVaixbAG-Q",
    sheetName: "arrangement",
    credentials: credentials,
    createNodeId,
    createNode,
    createContentDigest,
  })
  await createNodesfromSheet({
    sheetId: "1gWp5dc3CNET9jjIEplFpgDu6RwtsVWvih4zZLHhbPKI",
    sheetName: "folk",
    credentials: credentials,
    createNodeId,
    createNode,
    createContentDigest,
  })
}

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  return graphql(`
    {
      arrangement: allArrangement {
        edges {
          node {
            slug
            id
          }
        }
      }
      nyheter: allNyheter {
        edges {
          node {
            slug
            id
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()))
      return Promise.reject(result.errors)
    }

    //create news apges
    result.data.nyheter.edges.forEach(({ node }) => {
      const id = node.id
      const eventPath = `/nyheter/${node.slug}/`

      createPage({
        path: eventPath,
        component: path.resolve(`src/templates/single-news.js`),
        context: {
          itemId: id,
        },
      })
    })

    // Create event pages
    result.data.arrangement.edges.forEach(({ node }) => {
      const id = node.id
      const eventPath = `/arrangement/${node.slug}/`

      createPage({
        path: eventPath,
        component: path.resolve(`src/templates/single-event.js`),
        context: {
          itemId: id,
        },
      })
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
   
    type nyheter implements Node {
      person: folk @link(by: "navn", from: "forfatter") # foreign-key relation by custom field
    }
    type campus implements Node {
      person: folk @link(by: "kontaktperson", from: "name") # foreign-key relation by custom field
    }
  `
  createTypes(typeDefs)
}
