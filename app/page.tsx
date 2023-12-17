import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allPosts } from 'contentlayer/generated'

import Main from './Main'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function Page() {
  const sortedPosts = sortPosts(allPosts)
  const posts = allCoreContent(sortedPosts)

  return (
    <>
      <Header />
      <Main posts={posts} />
      <Footer />
    </>
  )
}
