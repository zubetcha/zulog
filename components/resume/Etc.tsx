import Section from '@/components/resume/common/Section'

function Etc() {
  return (
    <Section isLast title="Etc">
      <ul className="space-y-6">
        <li>
          <div className="mb-2 text-lg font-bold">외국어</div>
          <div className="text-gray-500">[영어] TOEIC 950점, TOEIC Speaking level 6</div>
          <div className="text-gray-500">[일본어] JLPT N1</div>
        </li>
        <li>
          <div className="mb-2 text-lg font-bold">교육</div>
          <div className="text-gray-500">스파르타 코딩클럽 항해99 4기 수료 (2021.11 - 2022.02)</div>
          <div className="text-gray-500">가천대학교 경영학트랙 전공 (2013.03 - 2018.02)</div>
        </li>
      </ul>
    </Section>
  )
}

export default Etc
