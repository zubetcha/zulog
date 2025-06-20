'use client'

const Resume = () => {
  return (
    <div className="mx-auto max-w-[800px] p-[60px] text-gray-700">
      <header className="mb-10">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center gap-3">
            <span className="min-w-[80px] font-semibold">Phone</span>
            <span>010-4860-8906</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-[80px] font-semibold">Blog</span>
            <a href="https://ttaenim.tistory.com/" className="hover:underline">
              https://ttaenim.tistory.com/
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-[80px] font-semibold">GitHub</span>
            <a href="https://github.com/ttaenim" className="hover:underline">
              https://github.com/ttaenim
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="min-w-[80px] font-semibold">E-Mail</span>
            <a href="mailto:ttrrr121@gmail.com" className="hover:underline">
              ttrrr121@gmail.com
            </a>
          </div>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-black">Introduce.</h2>
        <ul className="list-disc space-y-3 pl-5">
          <li className="leading-relaxed">
            편안하게 의견 교환을 할 수 있는 심리적 안전감이 있는 환경에서 일하는 것을 중요시
            여깁니다.
          </li>
          <li className="leading-relaxed">
            사용자를 최우선으로 생각합니다. 사용자를 위한 UI/UX를 생각하고 함께 일하는 개발자를 위해
            DX를 고려하여 더 좋은 아이디어를 냅니다.
          </li>
          <li className="leading-relaxed">
            더 나은 코드로 나아가기 위한 마이그레이션이나 리팩토링 과정을 즐겁게 생각합니다.
          </li>
          <li className="leading-relaxed">
            주기적인 회고와 코드 리뷰를 통해 서로의 의견과 생각을 공유하고 피드백을 주고받아 작업
            방식과 프로세스를 개선시킬 수 있는 환경을 좋아합니다.
          </li>
          <li className="leading-relaxed">
            주도적으로 좋은 문화를 팀에 전파하여 선순환 구조를 만들어 긍정적인 영향을 끼치는 사람이
            되고 싶습니다.
          </li>
          <li className="leading-relaxed">
            네이버 부스트캠프 내에서 포스팅 인증 스터디를 2차례 운영한 경험이 있습니다.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-black">Work Experience.</h2>
        <div className="mb-8">
          <h3 className="mb-2 text-xl font-semibold">Redbrick</h3>
          <div className="mb-3 text-gray-500">2022. 04 ~ 2023. 07</div>
          <p className="mb-4 leading-relaxed">
            크리에이터들이 웹 상에서 쉽고 빠르게 메타버스를 구축할 수 있는 Web 3.0 기반 메타버스
            창작 플랫폼을 제공합니다.
          </p>
          <ul className="space-y-2">
            <li className="leading-relaxed">
              프론트엔드 개발자 약 10명 가량의 개발 조직에서 기획자/디자이너/개발자와 협업하며
              레드브릭 사이트와 백 오피스 반응형 디자인과 개발, 멀티 브라우저/디바이스 지원과
              유지보수를 포함하는 프론트엔드 개발 업무를 담당했습니다.
            </li>
            <li className="leading-relaxed">
              React Intl을 사용하여 한국어, 영어, 중국어, 일본어, 말레이시아어를 포함하는 소프트웨어
              국제화 시스템을 지원했습니다.
            </li>
            <li className="leading-relaxed">
              TypeScript, Monorepo, CRA에서 Vite로 마이그레이션, Storybook, Test Code 등을 도입하여
              개발자 편의성을 향상시키기 위한 주간 프론트엔드 기술개선 미팅을 주도하여 진행했습니다.
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-black">Project.</h2>

        {/* Redbrick 3.0 */}
        <div className="mb-8">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-xl font-semibold">Redbrick 3.0</h3>
            <span className="text-gray-500">2023. 03 ~ 2023. 07</span>
          </div>
          <div className="mb-3 text-gray-500">FE 2~5명 / BE 4명</div>
          <div className="mb-3">Redbrick | Redbrick 2.0 → 3.0 웹 사이트 개편 및 UX/DX 개선</div>
          <div className="mb-3">
            <a href="https://redbrick.land/" className="text-blue-600 hover:underline">
              ✍ Service Link: https://redbrick.land/
            </a>
          </div>
          <div className="mb-4">
            <strong className="font-semibold">기술 스택</strong> JavaScript / React / React Query /
            Redux Toolkit / React Hook Form / SASS / PostCSS / React Three Fiber / Cypress / Jest
          </div>
          <div className="mb-4">
            <div className="mb-2 font-semibold">기여한 부분</div>
            <ul className="list-disc space-y-2 pl-5">
              <li className="leading-relaxed">
                멀티레포 구조에서 개발자 경험 향상을 위한 Nx 모노레포 전환 경험
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    세 가지 프로젝트에서 공통적으로 사용하는 모듈이 각 프로젝트마다 분산되어
                    있었습니다. 이 모듈들의 효율적 관리를 위해 모노레포로 전환하게 되었습니다.
                  </li>
                  <li>
                    모노레포를 경험해 본 팀원이 없는 환경에서 시각적으로 도움을 줄 수 있는 GUI 툴인
                    Nx console을 사용하는 것이 개발자 경험 측면에서 유리할 것이라고 판단했습니다.
                  </li>
                  <li>
                    결과적으로 여러 프로젝트에서 사용하는 공통 모듈을 한 곳에서 효율적으로 관리하여
                    사용할 수 있었습니다.
                  </li>
                </ul>
              </li>
              <li className="leading-relaxed">
                Google Sheets API를 활용한 변동이 잦은 mock data 관리 개선
                <ul className="mt-2 list-disc pl-5">
                  <li>
                    Google Sheets API를 사용하여 프론트엔드 코드를 변경하지 않고도 기획자가 직접
                    데이터를 수정해 웹 사이트에 바로 반영될 수 있도록 했습니다.
                  </li>
                </ul>
              </li>
              <li className="leading-relaxed">
                Three.js를 사용한 아바타 선택, 마우스 조작 및 애니메이션 재생 기능을 포함하는 아바타
                시스템 개발
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    React Three Fiber 라이브러리와 오픈 아바타 서비스를 제공하는 Ready Player Me의
                    아바타를 사용할 수 있도록 Integration 작업을 진행했습니다.
                  </li>
                  <li>
                    처음으로 Three.js를 사용해 본 프로젝트로, Three.js에 관심을 가지게 되는 계기가
                    되었습니다.
                  </li>
                  <li>ChatGPT의 도움을 다수 받았습니다.</li>
                </ul>
              </li>
              <li className="leading-relaxed">
                사용자 경험 개선을 위한 스켈레톤 UI, 404 페이지 제안 및 개발
              </li>
            </ul>
          </div>
        </div>

        {/* Redbrick 2.0 */}
        <div className="mb-8">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-xl font-semibold">Redbrick 2.0</h3>
            <span className="text-gray-500">2022. 08 ~ 2023. 07</span>
          </div>
          <div className="mb-3 text-gray-500">FE 2~5명 / BE 3~4명</div>
          <div className="mb-3">Redbrick | Redbrick 1.0 → 2.0 웹 사이트 개편 및 유지보수</div>
          <div className="mb-3">
            <a href="https://create.redbrick.land/" className="text-blue-600 hover:underline">
              ✍ Service Link: https://create.redbrick.land/
            </a>
          </div>
          <div className="mb-4">
            <strong className="font-semibold">기술 스택</strong> JavaScript / React / React Query /
            Redux Toolkit / React Hook Form / SASS / PostCSS
          </div>
          <div className="mb-4">
            <div className="mb-2 font-semibold">기여한 부분</div>
            <ul className="list-disc space-y-2 pl-5">
              <li className="leading-relaxed">
                효율적인 비동기 데이터 처리와 클라이언트/서버 상태 분리를 위한 React Query 도입
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    이전에는 Fetch 해 온 데이터를 모두 Redux에 저장하고 있었는데, Store가 너무
                    비대해지는 문제를 겪었습니다.
                  </li>
                  <li>
                    Store를 온전히 클라이언트의 전역 상태로 사용하기 위해 비동기 통신을 걷어내고
                    Client와 Server 상태를 분리했습니다.
                  </li>
                  <li>
                    또한, React Query의 캐싱 기능을 사용하여 데이터 로딩 중에 사용자에게 보여 주는
                    화면을 개선했습니다.
                  </li>
                </ul>
              </li>
              <li className="leading-relaxed">
                Lighthouse와 웹 번들 시각화 툴 사용으로 번들 크기를 약 22% 줄여 웹 성능 최적화
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    웹 번들 시각화 툴로 프로젝트의 번들 크기를 살펴본 결과, 이전에 사용하고 있던
                    moment 라이브러리의 크기가 크다는 문제를 알게 되었습니다. 이를 dayjs
                    라이브러리로 대체하여 번들 크기를 줄였습니다.
                  </li>
                  <li>
                    또한, 번들 사이즈를 50% 가량 차지하고 있던 aws-sdk를 필요한 모듈만 import 할 수
                    있는 @aws-sdk/core로 교체했습니다.
                  </li>
                </ul>
              </li>
              <li className="leading-relaxed">
                효과적인 작업 프로세스를 위한 git flow 브랜치 전략 도입
              </li>
              <li className="leading-relaxed">
                사용자의 사이트 체류 시간을 증가시키기 위해 GSAP을 사용한 인터랙티브 애니메이션 구현
              </li>
            </ul>
          </div>
        </div>

        {/* Redbrick Admin */}
        <div className="mb-8">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-xl font-semibold">Redbrick Admin</h3>
            <span className="text-gray-500">2022. 12 ~ 2023. 07</span>
          </div>
          <div className="mb-3 text-gray-500">FE 1~2명 / BE 1~2명</div>
          <div className="mb-3">
            Redbrick | 내부 운영과 관리를 효율적으로 지원하기 위한 백 오피스 개발
          </div>
          <div className="mb-4">
            <strong className="font-semibold">기술 스택</strong> TypeScript / React / React Query /
            Redux Toolkit / React Hook Form / SASS / Ant Design
          </div>
          <div className="mb-4">
            <div className="mb-2 font-semibold">기여한 부분</div>
            <div className="leading-relaxed">
              기존 JavaScript 코드 베이스에 추가된 백 오피스에 타입 안정성과 코드 품질 향상을 위한
              TypeScript 도입
            </div>
          </div>
        </div>

        {/* Redbrick Creator Challenge */}
        <div className="mb-8">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-xl font-semibold">Redbrick Creator Challenge</h3>
            <span className="text-gray-500">2022. 04 ~ 2022. 08</span>
          </div>
          <div className="mb-3 text-gray-500">FE 1명 / BE 1명</div>
          <div className="mb-3">Redbrick | 크리에이터 챌린지 페이지 개발 및 유지보수</div>
          <div className="mb-3">
            <a href="https://redbrick.space/challenge/04" className="text-blue-600 hover:underline">
              ✍ Service Link: https://redbrick.space/challenge/04
            </a>
          </div>
          <div className="mb-4">
            <strong className="font-semibold">기술 스택</strong> JavaScript / React / Redux / React
            Hook Form / SASS
          </div>
          <div className="mb-4">
            <div className="mb-2 font-semibold">기여한 부분</div>
            <ul className="list-disc space-y-2 pl-5">
              <li className="leading-relaxed">
                React Hook Form 도입
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    기존 state만을 이용한 방식에서 효과적인 폼 관리와 유효성 검사를 위하여 Form
                    라이브러리를 도입했습니다.
                  </li>
                  <li>
                    Formik과 React Hook Form을 비교했을 때 비제어 컴포넌트 방식을 사용하는 React
                    Hook Form이 렌더링 측면에서 유리할 것이라고 판단했습니다.
                  </li>
                </ul>
              </li>
              <li className="leading-relaxed">
                Module CSS 방식을 도입하여 클래스 전역적 충돌 문제 해결
              </li>
            </ul>
          </div>
        </div>

        {/* 모락 */}
        <div className="mb-8">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-xl font-semibold">모락</h3>
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
                  <li>
                    TMap 지도 성능을 분석하여 사용자 경험이 더 좋은 SDK 스펙으로 변경했습니다.
                  </li>
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

        {/* For Minutes */}
        <div className="mb-8">
          <div className="mb-2 flex items-start justify-between">
            <h3 className="text-xl font-semibold">For Minutes</h3>
            <span className="text-gray-500">2021. 04 ~ 2021. 10</span>
          </div>
          <div className="mb-3 text-gray-500">프로젝트 팀장</div>
          <div className="mb-3 text-gray-500">FE 2명 / BE 2명</div>
          <div className="mb-3">
            Side Project | 캡스톤 디자인 2021로 진행한 인공지능 회의록 요약 서비스
          </div>
          <div className="mb-3">
            <a
              href="https://github.com/ttaerrim/for-minutes"
              className="text-blue-600 hover:underline"
            >
              🔗 GitHub: https://github.com/ttaerrim/for-minutes
            </a>
          </div>
          <div className="mb-4">
            <strong className="font-semibold">기술 스택</strong> JavaScript / React / HTML/CSS /
            Django / Naver Cloud Platform
          </div>
          <div className="mb-4">
            <div className="mb-2 font-semibold">기여한 부분</div>
            <ul className="list-disc space-y-2 pl-5">
              <li className="leading-relaxed">
                프로젝트 팀장으로서 프로젝트 개발 계획 수립과 주기적인 미팅 주도
              </li>
              <li className="leading-relaxed">
                FrontEnd: 회의록 정보 작성, 회의 스크립트·요약·키워드 기능, 라이브러리를 사용한 PDF
                변환 기능 개발
              </li>
              <li className="leading-relaxed">
                BackEnd: STT(Speech-to-Text) API와 요약 API를 연동
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-black">Education.</h2>
        <ul className="space-y-4">
          <li>
            <div className="font-semibold">네이버 부스트캠프 웹-모바일 8기 수료</div>
            <div className="text-gray-500">2023.07 ~ 2023.12</div>
          </li>
          <li>
            <div className="font-semibold">원티드 프리온보딩 프론트엔드 코스 수료</div>
            <div className="text-gray-500">2022.01 ~ 2022.03</div>
          </li>
          <li>
            <div className="font-semibold">덕성여자대학교 멋쟁이사자처럼</div>
            <div className="text-gray-500">2020.03 ~ 2020.10 8기 운영진</div>
            <div className="text-gray-500">2019.03 ~ 2019.10 7기 회원</div>
          </li>
          <li>
            <div className="font-semibold">덕성여자대학교 IT미디어공학과</div>
            <div className="text-gray-500">2017.03 ~ 2022.02 (졸업)</div>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-black">Skills.</h2>
        <ul className="space-y-4">
          <li className="flex gap-3">
            <span className="min-w-[120px] font-semibold">Language:</span>
            <span className="text-gray-600">JavaScript, TypeScript</span>
          </li>
          <li className="flex gap-3">
            <span className="min-w-[120px] font-semibold">FrontEnd:</span>
            <span className="text-gray-600">
              React, Redux, Redux Toolkit, TanStack Query, HTML/CSS
            </span>
          </li>
          <li className="flex gap-3">
            <span className="min-w-[120px] font-semibold">Communication:</span>
            <span className="text-gray-600">Git, Github, Notion, Slack, Jira, Figma</span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-6 text-2xl font-semibold text-black">Certificate.</h2>
        <div>
          <div className="font-semibold">정보처리기사</div>
          <div className="text-gray-500">2021.08 취득</div>
        </div>
      </section>
    </div>
  )
}

export default Resume
