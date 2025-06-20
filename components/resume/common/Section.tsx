type Props = {
  children: React.ReactNode
  title: string
  isLast?: boolean
}

function Section({ children, title, isLast = false }: Props) {
  return (
    <>
      <section>
        <h2 className="mb-6 text-2xl font-black">
          {title}
          <span className="text-4xl text-rose-300">.</span>
        </h2>
        {children}
      </section>
      {!isLast && <div className="my-6 h-[1px] w-full bg-gray-200" />}
    </>
  )
}

export default Section
