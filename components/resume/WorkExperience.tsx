import Section from '@/components/resume/common/Section'

function WorkExperience() {
  return (
    <Section title="Work Experience">
      {/* 의식주컴퍼니 */}
      <div className="mb-10">
        <div className="mb-2 flex items-end gap-2">
          <h3 className="text-2xl font-bold">의식주컴퍼니 </h3>
          <span className="text-base font-normal text-gray-500">(2023. 01 ~ 재직중)</span>
        </div>

        <p className="mb-5 leading-relaxed">
          세탁 공장 및 운송 시스템을 기반으로 비대면 세탁 서비스를 제공합니다.
        </p>
        <div className="mb-6">
          <h4 className="mb-2 text-lg font-bold">런드리고 앱 웹뷰 개발</h4>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              스토어, 가격표, 세탁비 계산, 요금제 등 정보 제공성 페이지 및 복잡한 인터랙션이 필요한
              프로모션 랜딩페이지 등 개발
            </li>
            <li className="leading-relaxed">
              바텀시트 등 디자인 시스템 기반의 모바일 친화적인{' '}
              <span className="font-bold">공통 컴포넌트</span>를 개발하였으며, 확장성을 고려해
              인터랙션 제어 로직을 커스텀훅으로 분리하여 재사용성을 높임
            </li>
            <li>
              신속한 웹뷰 이슈 대응을 위해 디버깅 툴 <span className="font-bold">Charles</span> 도입
            </li>
            <li>
              성능 개선을 통한 사용자 경험 향상을 위해{' '}
              <span className="font-bold">lottie 애니메이션</span> 제안 및 적용
            </li>
            <li>
              인증 관련 커맨드, Amplitude 로깅 등 페이지마다 중복되는 로직을 커스텀훅으로 분리하여
              재사용성을 제고하고 유지보수 용이성 개선
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="mb-2 text-lg font-bold">런드리고 어드민 개발</h4>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              공장 및 운송 시스템, 그룹웨어 등 B2C 고객향 서비스 운영에 필요한 모든 어드민 고도화
              작업에 참여
            </li>
            <li>공장 내 세탁물 식별 및 공정 트래킹을 위한 RFID 도입 기술 지원</li>
            <li>
              공장에서 화면 터치 시 API가 중복 호출되는 이슈를 해결하기 위해 일정 시간 동안 여러번
              호출된 동일한 요청을 1회로 간주하도록 <span className="font-bold">throttling</span>을
              활용하여 axios interceptor 로직 개선
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="mb-2 text-lg font-bold">프론트엔드 개발 환경 모던화</h4>
          <ul className="list-disc space-y-1.5 pl-5">
            <li className="leading-relaxed">
              PHP 기반 프로젝트들을 React 18버전으로 점진적 마이그레이션 진행
            </li>
            <li>
              Yarn berry와 Turborepo를 활용하여{' '}
              <span className="font-bold">프론트엔드 모노레포</span> 환경 구축
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li>
                  <span className="font-bold">공통 인터페이스와 모듈</span>을 패키지화하여 코드 중복
                  제거 및 개발자 경험 개선
                </li>
                <li>
                  <span className="font-bold">Jenkins 파이프라인</span>을 모노레포 구조에 적합하게
                  rewriting하여 CI/CD 소요 시간 단축
                </li>
                <li>
                  프로젝트 생성과 함께 공통으로 사용하는 패키지의 동일한 버전을 자동으로 설치하는 쉘
                  스크립트를 작성하여 <span className="font-bold">초기 세팅 자동화</span>
                </li>
                <li>
                  모노레포 스크립트 실행을 위한 select 방식의{' '}
                  <span className="font-bold">CLI 라이브러리</span>를 주도적으로 개발
                </li>
              </ul>
            </li>
            <li>
              생성형 AI가 일관성 있는 규칙으로 코드를 작성할 수 있도록 React 컴포넌트와 모듈 관련{' '}
              <span className="font-bold">Cursor Rule</span> 작성
            </li>
            <li>런드리고 디자인 시스템(LDS) 기반 컴포넌트 설계 및 개발 주도적 진행</li>
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="mb-2 text-lg font-bold">데이터 분석을 위한 마케팅 기술 지원</h4>
          <ul className="list-disc space-y-1.5 pl-5">
            <li className="leading-relaxed">
              유저 행동 패턴을 분석하고 비즈니스 인사이트를 제공하기 위해 Amplitude, braze 등 유저{' '}
              <span className="font-bold">CRM 툴</span> 기술 이식 업무 지원
            </li>
            <li>
              마케터가 직접 랜딩페이지를 제작할 수 있는{' '}
              <span className="font-bold">웹 기반 에디터</span>
              개발
              <ul className="mt-2 list-disc space-y-1.5 pl-5">
                <li className="leading-relaxed">
                  이미지 첨부, 드래그 앤 드롭을 통한 순서 변경, CTA 버튼 삽입 및 딥링크 연결,
                  Amplitude 로깅 등 에디터에 필요한 기능 자체적으로 기획 및 개발
                </li>
                <li>
                  기존의 6단계에 이르던 업무 프로세스 제거하여{' '}
                  <span className="font-bold">0.1man/month</span> 감소
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* 젠틀에너지 */}
      <div className="mb-8">
        <div className="mb-2 flex items-end gap-2">
          <h3 className="text-2xl font-bold">젠틀에너지</h3>
          <span className="text-base font-normal text-gray-500">(2022. 03 ~ 2023. 01)</span>
        </div>
        <p className="mb-4 leading-relaxed">
          실시간으로 공장의 전력 사용량을 측정하여 대시보드를 통해 인사이트를 제공하는 B2B 솔루션을
          제공합니다.
        </p>
        <div className="mb-6">
          <h4 className="mb-2 text-lg font-bold">실시간 차트 대시보드 개발</h4>
          <ul className="list-disc space-y-1.5 pl-5">
            <li className="leading-relaxed">
              빠른 PoC 구현을 위해 <span className="font-bold">polling</span> 방식을 이용하여 실시간
              차트 개발
            </li>
            <li className="leading-relaxed">
              성능 최적화를 위해 Echarts 라이브러리에 <span className="font-bold">트리쉐이킹</span>
              을 적용하여 <span className="font-bold">번들 사이즈 약 46%</span> 감소
            </li>
            <li className="leading-relaxed">
              next-intl을 도입하여 영어, 독일어를 지원하는 <span className="font-bold">국제화</span>
              를 적용하였으며, 인터페이스로 인해 휴먼 에러가 발생할 수 있는 부분을 개선하기 위해
              번역 json 파일을 읽어 자동완성이 가능한 Object Literal로 변환하는 유틸 함수 개발
            </li>
          </ul>
        </div>
        <div className="mb-6">
          <h4 className="mb-2 text-lg font-bold">사내 회의실 예약 관리 백오피스 개발</h4>
          <ul className="list-disc space-y-1.5 pl-5">
            <li className="leading-relaxed">
              프로젝트 리드를 담당하여 일정 관리 및 유관부서와의 커뮤니케이션 주도
            </li>
            <li className="leading-relaxed">
              <span className="font-bold">PWA</span> 및{' '}
              <span className="font-bold">Firebase Cloud Messaging</span> 서비스를 이용하여 웹 푸시
              알림 개발
            </li>
            <li className="leading-relaxed">
              <span className="font-bold">SSE</span>를 이용해 실시간 알림 메시지 수신 기능 개발
            </li>
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default WorkExperience
