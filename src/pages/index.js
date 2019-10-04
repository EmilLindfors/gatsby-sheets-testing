import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const cred2 = {
    type: "service_account",
    project_id: "acquired-medley-249009",
    private_key_id: "59521f418995a3c767cd468e51c3d1ebb8e91643",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6uWxni1TtNM3/\n3loIflFveUXgVOTczi4ocCEgn0w9m9UJEIW5BAf2O01kHe4L0fOeRIVTB1fobT9l\nRq+HQji+D93FsTKCtGzEKRmyXay5gsAiIMqZ2Tdg3UqOO5zfO2E9ptZ+4Mfb1TR8\nxeik17weme6qVYRBzS4mKsgi35bwhPbdeikvw+PRIwv1kGLxXO4Ak9jPbpo861+T\nxg2LPFfJ/hCzt7HKOSbIdqFUQMixzgW04jMJAeU9OVOy5U50/LkFutPtaRg/Qz7v\nV/B6ksgDQHrmQrMLSNsmNjWfCt2T5+QQZJVv14o1e5sBBEXuSiZ00aezUmq3U1Qa\nZkGxa87zAgMBAAECggEAWg0r3UICisWhJamgBSGad6bmjrqSh3S+KQ1uxJNeywWY\n996qhyCNEHDoMYUHtVajZaxJGlJb0IHDhb3R0Gsc/3iabYm4QPXv0Ki7tlxb/Tm0\nHKFw5EKwZPxERRU14ij6jCemoZkZegk4X4Z43OsYVC/LvQUyHCPugkS2sa7gVg0P\nMXYco7upBumQ93KGA/NCa/FUIZJlQbTSWx/+Z7THZfiJISD1Q1fun2UuA5BnljCn\nAQftbseZMXbuQLjkFcqWOH1zyL4Km1Fn7Fe0e+O0ImO8lGYqr1fkXsihYvgKTIuQ\nK3C/SQx3eB4WkqNfDfo4RBDiV2H5eKb4XyT75uI0kQKBgQDeTJLS9o08i0LI4PF0\nbBeEnd2AmBWAUoQJ9Hu3hseAeEaOV2GGVT0vtf+wuiz90Ib+70+BBTyeYOik/ZvK\nPWxnePx9xTd85Lk3aSnQzFIf4+lRdBRkNgVQ57e2XUNjYrezJ8MDn9qideCbSdoo\nPkEYqCpb8b0LhMhi8PGwWt/0gwKBgQDXCDEtDfJxz5rbh/aYD8avtW9+JLTkLpwY\nQYv8sHlme04E671DKHMVCLCjWZbGIgL1u5dAbq9hN1h243Y6Uqrr7XKAd73JsEX5\nf2dgjsWem9MDXFBj772k0D0CrRuLgRy2vQYH+Jfc1FsuO9QMTZYou3oiIEofq9a5\nysnT6e8Q0QKBgCjoNmyT6lGl3thQbJ5b9cf1tPkhA3Plu16Jmuqe5r+BYpp3Af9S\nWDwbZb4DxJvAb9ch+qNnb0xF0QnrkWuZ+gTggrYyQI+/F0ZXF9bQgpxTuG/AyK/Y\nMQo+WdQ5PVlgpSVWv9A+7mDPCFILORYGvrvm1kStK3ifKrDqXc9yKZw5AoGBALND\n1RtmgTR4ivVxyBbFMDLT43saRuPkJ6XhHz8uMEdLjKN1lHckhayHbhsAWT4cpLMQ\nDOxeWj+F0G5s+udse6nsboTDTqmSFwQFPr20yPONnME0eKCYAVYhdHuCrXAD11hR\nBXInwRMMxmco4YLQO9sBULSajrEQpRaHBPNyFyfBAoGAIbcS4az1+dnXrXSkriVN\nkZP4e/l0+9RoMH6g5OS0kvDtTB3JJwmsSMeWw3nYbRhKDRzGO5WTVF39LFyuq3C1\npQKPIPpK3o9NrJL5kM3uqvcrCd0vWS62sUpiygh6Vff8Sg7PKOqE6Ak2soQP5K4U\nPFdUhzgVR9Rma1xTo5+4LRc=\n-----END PRIVATE KEY-----\n",
    client_email: "sheets@acquired-medley-249009.iam.gserviceaccount.com",
    client_id: "104573196840046887617",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/sheets%40acquired-medley-249009.iam.gserviceaccount.com",
  }

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

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
        {console.log(cred2)}
        {console.log(".env:", credentials)}
      </div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export default IndexPage
