import Section from '@/components/resume/common/Section'

function Project() {
  return (
    <Section title="Project">
      {/* avec toi */}
      <div className="mb-8">
        <div className="mb-2 flex items-end gap-2">
          <h3 className="text-xl font-bold">avec toi</h3>
          <span className="text-base font-normal text-gray-500">(2025.06 ~ 진행중)</span>
        </div>
        <div className="mb-3 text-gray-500">토이 프로젝트</div>
        <div className="mb-3">모바일 청첩장을 커스텀하여 제작할 수 있는 서비스입니다.</div>
        <div className="mb-3">
          <div>
            <a
              href="https://avec-toi.vercel.app/"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              🔗 Service: https://avec-toi.vercel.app/
            </a>
          </div>
          <div>
            <a
              href="https://github.com/zubetcha/avec-toi"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              🔗 GitHub: https://github.com/zubetcha/avec-toi
            </a>
          </div>
        </div>
        <div className="mb-4">
          <strong className="mr-5 font-semibold">기술 스택</strong> Typescript / Nextjs /
          TailwindCSS / Shadcn-ui / Zustand / Tanstack-query / Supabase
        </div>
        <div className="mb-4">
          <ul className="list-disc space-y-1.5 pl-5">
            <li className="leading-relaxed">
              AI와 함께 서비스 방향을 논의하여 최소한의 MVP 기능 설정
            </li>
            <li>
              청첩장에 필요한 정보를 다루는 하나의 거대한 상태와 prop으로 전달 받는 구조로 인해
              불필요한 리렌더링이 발생하여 zustand 채택 및 적용
            </li>
          </ul>
        </div>
      </div>

      {/* 밈글밈글 */}
      <div className="mb-8">
        <div className="mb-2 flex items-end gap-2">
          <h3 className="text-xl font-bold">밈글밈글</h3>
          <span className="text-base font-normal text-gray-500">(2021.12.18 ~ 2021.01.28)</span>
        </div>
        <div className="mb-3 text-gray-500">FE 3명 / BE 2명</div>
        <div className="mb-3">
          신조어와 최신 밈을 즐길 수 있는 신조어 오픈 사전 및 커뮤니티 서비스입니다.
        </div>
        <div className="mb-3">
          <div>
            <a
              href="https://github.com/Team8-Project/front"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              🔗 GitHub: https://github.com/Team8-Project/front
            </a>
          </div>
        </div>
        <div className="mb-4">
          <strong className="ㅎfont-semibold mr-5">기술 스택</strong> React / Redux /
          Styled-Components / Github Actions
        </div>
        <div className="mb-4">
          <ul className="list-disc space-y-1.5 pl-5">
            <li className="leading-relaxed">
              서버와 클라이언트 사이에서 주고받는 데이터를 보호하기 위해 AWS의 Certificate Manager를
              이용하여 <span className="font-bold">HTTPS</span> 도입
            </li>
            <li className="leading-relaxed">
              유저에게 더욱 빠르게 콘텐츠를 제공하기 위해{' '}
              <span className="font-bold">Cloudfront</span>를 통한 배포 진행
            </li>
            <li className="leading-relaxed">
              개발 외에 투입되는 리소스를 최소화하여 개발에 더욱 집중할 수 있도록{' '}
              <span className="font-bold">Github Actions</span>를 이용하여 CI/CD 구축
            </li>
            <li className="leading-relaxed">
              폰트 최적화를 위해 폰트 서브셋 제작 (Lighthouse 퍼포먼스 점수 기준 79점 → 93점 상승)
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default Project
