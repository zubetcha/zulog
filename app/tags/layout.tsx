import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Props = {
  children: React.ReactNode
}

const layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default layout
