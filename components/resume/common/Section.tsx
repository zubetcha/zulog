type Props = {
  children: React.ReactNode
  title: string
  isLast?: boolean
}

function Section({ children, title, isLast = false }: Props) {
  return (
    <>
      <section>
        <div className="relative w-fit">
          <span className="absolute -right-3 -top-3 text-4xl text-indigo-400">•</span>
          <h2 className="mb-6 text-3xl font-black tracking-tight">{title}</h2>
        </div>
        {children}
      </section>
      {!isLast && <div className="my-8 h-[1px] w-full bg-gray-300" />}
    </>
  )
}

export default Section
