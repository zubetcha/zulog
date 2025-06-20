import Section from '@/components/resume/common/Section'

function Project() {
  return (
    <Section title="Project">
      {/* 밈글밈글 */}
      <div className="mb-8">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="text-xl font-semibold">밈글밈글</h3>
          <span className="text-gray-500">2023. 11 ~ now</span>
        </div>
        <div className="mb-3 text-gray-500">프로젝트 팀장 | 프론트엔드 개발자</div>
        <div className="mb-3 text-gray-500">FE 3명 / BE 2명</div>
        <div className="mb-3">
          Side Project | 네이버 부스트캠프 내에서 진행한 모임 모집/관리 플랫폼
        </div>
        <div className="mb-3">
          <div>
            <a
              href="https://github.com/boostcampwm2023/web17_morak"
              className="text-blue-600 hover:underline"
            >
              🔗 GitHub: https://github.com/boostcampwm2023/web17_morak
            </a>
          </div>
          <div>
            <a href="https://morak.io/" className="text-blue-600 hover:underline">
              🔗 Service Link: https://morak.io/
            </a>
          </div>
        </div>
        <div className="mb-4">
          <strong className="font-semibold">기술 스택</strong> TypeScript / React / Vite / React
          Query / Vanilla Extract / React Hook Form / TurboRepo
        </div>
        <div className="mb-4">
          <div className="mb-2 font-semibold">기여한 부분</div>
          <ul className="list-disc space-y-2 pl-5">
            <li className="leading-relaxed">
              TMap SDK를 활용한 지도 페이지 구현
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>TMap 지도 성능을 분석하여 사용자 경험이 더 좋은 SDK 스펙으로 변경했습니다.</li>
                <li>
                  장소를 검색하거나 지도를 직접 클릭해 원하는 장소를 선택할 수 있는 기능을
                  개발했습니다.
                </li>
              </ul>
            </li>
            <li className="leading-relaxed">
              모노레포를 사용한 공통 인터페이스, 공통 컴포넌트 등 공통 패키지 관리
            </li>
            <li className="leading-relaxed">
              FE/BE 개발을 병렬적으로 진행해 개발 생산성을 향상시키기 위한 MSW 사용
            </li>
            <li className="leading-relaxed">
              리팩토링 전후 동일 결과를 보장하기 위해 테스트 코드 작성
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  예기치 않은 UI 변경을 예방하기 위해 시각적 회귀 테스트를 실험적으로 로컬 환경에
                  도입해 보았습니다.
                </li>
                <li>
                  cypress를 사용하여 e2e 테스트 코드를 작성하여 로그인 로직의 리팩토링 전후 결과를
                  동일하게 보장할 수 있었습니다.
                </li>
              </ul>
            </li>
            <li className="leading-relaxed">
              프로젝트 팀장으로서 프로젝트 기획, 디자인 총괄 및 일정 관리
              <ul className="mt-2 list-disc space-y-2 pl-5">
                <li>
                  개발 히스토리를 남기기 위해 개발 일지 작성 문화를 도입하여 6주간 팀 내에서 약
                  70개의 개발 일지를 작성했습니다.
                </li>
                <li>
                  주마다 KPT 회고를 진행하여 팀의 사기를 높이고 부족한 점을 보완할 수 있었습니다.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default Project
