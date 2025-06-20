import Section from '@/components/resume/common/Section'

function OtherExperience() {
  return (
    <Section title="Other Experience">
      <ul className="space-y-4">
        <li>
          <div className="text-lg font-semibold">오픈소스 개발</div>
          <div className="text-gray-500">
            모노레포 구조에서 패키지 이름과 스크립트를 타이핑하지 않고 select 방식으로 실행할 수
            있는 CLI 라이브러리
          </div>
          <div className="text-gray-500">
            <a href="https://www.npmjs.com/package/monorepo-ez-script" className="hover:underline">
              https://www.npmjs.com/package/monorepo-ez-script
            </a>
          </div>
          <div className="text-gray-500">
            <a href="https://github.com/zubetcha/monorepo-ez-script" className="hover:underline">
              https://github.com/zubetcha/monorepo-ez-script
            </a>
          </div>
        </li>
        <li>
          <div className="text-lg font-semibold">React 멘토링</div>
          <div className="text-gray-500">
            스파르타 코딩클럽 주관 항해99 및 이노베이션 캠프 프론트엔드 멘토링 (2022.06~2024.10)
          </div>
        </li>
      </ul>
    </Section>
  )
}

export default OtherExperience
