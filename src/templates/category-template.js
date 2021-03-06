import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default ({ data, location, pageContext }) => {
  return (
    <Layout>
      <SEO
        pagetitle={`CATEGORY: ${pageContext.categoryName}`}
        pagedesc={`「${pageContext.categoryName}」カテゴリーの記事です`}
        pagepath={location.pathname}
      />
      <section className="content bloglist">
        <div className="container">
          <h1 className="bar">CATEGORY: {pageContext.categoryName}</h1>
          <div className="posts">
            {data.allContentfulBlogPost.edges.map(({ node }) => (
              <article className="post" key={node.id}>
                <Link to={`/blog/post/${node.slug}`}>
                  <figure>
                    <Img
                      fluid={node.eyecatch.fluid}
                      alt={node.eyecatch.description}
                      style={{ height: "100%" }}
                    />
                  </figure>
                  <h3>{node.title}</h3>
                </Link>
              </article>
            ))}
          </div>
          <ul className="pagenation">
            {!pageContext.isFirst && (
              <li className="prev">
                <Link
                  to={
                    pageContext.currentPage === 2
                      ? `/category/${pageContext.categorySlug}`
                      : `/category/${pageContext.categorySlug}/${
                          pageContext.currentPage - 1
                        }`
                  }
                  rel="prev"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                  <span>前のページ</span>
                </Link>
              </li>
            )}
            {!pageContext.isLast && (
              <li className="next">
                <Link
                  to={`/category/${pageContext.categorySlug}/${
                    pageContext.currentPage + 1
                  }`}
                  rel="next"
                >
                  <span>次のページ</span>
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
              </li>
            )}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query($categoryId: String!, $skip: Int!, $limit: Int!) {
    allContentfulBlogPost(
      sort: { order: DESC, fields: publishDate }
      skip: $skip
      limit: $limit
      filter: { category: { elemMatch: { id: { eq: $categoryId } } } }
    ) {
      edges {
        node {
          title
          id
          slug
          eyecatch {
            fluid(maxWidth: 500) {
              ...GatsbyContentfulFluid_withWebp
            }
            description
          }
        }
      }
    }
  }
`
