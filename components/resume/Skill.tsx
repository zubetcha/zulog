import Section from '@/components/resume/common/Section'

function Skill() {
  return (
    <Section title="Skills">
      <ul className="list-disc space-y-1.5 pl-5">
        <li className="leading-relaxed">
          React, Nextjs 등 <span className="font-bold">Javascript</span> 언어 기반의 기술들을 주로
          사용해왔습니다.
        </li>
        <li className="leading-relaxed">
          <span className="font-bold">PHP</span> 기반의 레거시 프로젝트를 모던 프론트엔드 기술로
          마이그레이션한 경험이 있습니다.
        </li>
        <li className="leading-relaxed">
          <span className="font-bold">Typescript</span>의 타입 체커가 동작하는 방식에 대해 이해하고
          있으며, 복잡한 타입이 필요한 경우 직접 만들어 사용할 수 있습니다.
        </li>
        <li className="leading-relaxed">
          Redux, Redux-toolkit, Tanstack-query 등{' '}
          <span className="font-bold">클라이언트 및 서버 상태 관리 라이브러리</span>를 사용하는 데
          익숙합니다.
        </li>
        <li className="leading-relaxed">
          최근에는 주로 Nextjs 기반의 <span className="font-bold">웹뷰 개발</span>에 참여했으며,
          네이티브 앱과의 통신에 대해서 이해하고 있습니다.
        </li>
        <li className="leading-relaxed">
          <span className="font-bold">Jenkins</span> 파이프라인을 작성하여 프론트엔드 배포를
          자동화하고, <span className="font-bold">CI/CD</span> 소요 시간을 줄인 경험이 있습니다.
        </li>
      </ul>
    </Section>
  )
}

export default Skill
