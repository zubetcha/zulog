import React from 'react'

function Header() {
  return (
    <header className="mb-10">
      <div className="flex justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold leading-10">
            안녕하세요.
            <br />
            프론트엔드 개발자
            <br />
            정주혜입니다.
          </h1>
        </div>
        <div className="flex w-80 flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 border-b border-gray-300 pb-2">
            <span className="min-w-[80px] font-bold">Phone</span>
            <span>010-2292-6428</span>
          </div>
          <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
            <span className="min-w-[80px] font-bold">Blog</span>
            <a href="https://ttaenim.tistory.com/" className="hover:underline">
              https://zubetcha.com
            </a>
          </div>
          <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
            <span className="min-w-[80px] font-bold">GitHub</span>
            <a href="https://github.com/ttaenim" className="hover:underline">
              https://github.com/zubetcha
            </a>
          </div>
          <div className="flex items-center gap-3 border-b border-gray-300 pb-2">
            <span className="min-w-[80px] font-bold">E-Mail</span>
            <a href="mailto:ttrrr121@gmail.com" className="hover:underline">
              zuhye5@gmail.com
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
