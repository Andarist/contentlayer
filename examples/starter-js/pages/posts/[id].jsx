import Head from 'next/head'

import { FormattedDate } from '../../components/date'
import { Layout } from '../../components/layout'
import { allPosts } from '.contentlayer/data'
const utilStyles = require('../../styles/utils.module.css')

export async function getStaticPaths() {
  const paths = allPosts.map((_) => '/posts/' + _._raw.flattenedPath)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = allPosts.find((_) => _._raw.flattenedPath === params.id)
  return {
    props: {
      post,
    },
  }
}

const Page = ({ post }) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        <div className={utilStyles.lightText}>
          <FormattedDate dateString={post.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content.html }} />
      </article>
    </Layout>
  )
}

export default Page
