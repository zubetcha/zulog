import ListLayout from '@/layouts/ListLayout'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import { allBooks } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
  const books = allCoreContent(sortPosts(allBooks))
  const pageNumber = 1
  const initialDisplayPosts = books.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(books.length / POSTS_PER_PAGE),
  }

  return (
    <ListLayout
      books={books}
      initialDisplayBooks={initialDisplayPosts}
      pagination={pagination}
      title="Books"
    />
  )
}
