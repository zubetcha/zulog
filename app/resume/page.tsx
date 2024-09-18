import React from 'react'
// import * as _ from 'lodash'
import { isPlainObject } from 'lodash'

const anchorClassName = 'font-semibold text-blue-500 underline-offset-2 hover:underline'

const Resume = () => {
  return (
    <div className="flex flex-col md:gap-y-3 md:py-2 xl:mx-20 xl:gap-y-10 xl:py-20">
      <div className="flex flex-col md:gap-y-3 xl:gap-y-10">
        <h1 className="font-bold md:text-3xl xl:text-5xl">안녕하세요, 정주혜입니다.</h1>
        <p className="md:text-sm xl:text-xl">
          3년 차 웹 프론트엔드 개발자로, 비효율적인 프로세스와 사람이 하는 반복적인 일을 자동화하여
          리소스를 개선하는 데 관심이 많습니다. <br />
          사내에서 자발적으로 자동화 관련 백오피스 기능 및 툴 등을 만든 경험이 있습니다. 개인적으로
          게임 내 단체 콘텐츠를 편하게 즐기기 위해 명단을 관리하는 카카오톡용 봇을 개발해 운영하고
          있습니다.
        </p>
        <div className="border-y md:py-1 xl:py-3">
          <table className="w-full md:text-xs xl:text-base">
            {contacts.map((childContacts, i) => (
              <tr key={`contact-table-row-${i}`}>
                {childContacts.map(({ label, value, href }, j) => (
                  <>
                    <th className="w-1/6 py-1">{label}</th>
                    <td className="w-2/6">
                      {href ? (
                        <a href={href} target="_blank" className={anchorClassName}>
                          {value}
                        </a>
                      ) : (
                        value
                      )}
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className="flex flex-col md:gap-y-3 xl:gap-y-20">
        {dataSource.map(({ title, content }) => (
          <div key={title} className="flex flex-col md:gap-y-2 xl:gap-y-10">
            <h2 className="font-extrabold md:text-xl xl:text-3xl">{title}</h2>

            {content.map(({ name, period, tableData, detail }) => (
              <div key={name} className="flex flex-col md:gap-y-2 xl:gap-y-10">
                {(Boolean(name) || Boolean(period)) && (
                  <div className="flex justify-between">
                    <h3 className="font-bold text-blue-500  md:text-lg xl:text-2xl">{name}</h3>
                    <span>{period}</span>
                  </div>
                )}

                {Boolean(tableData) && (
                  <div className="border-y md:py-1 xl:py-3">
                    <table className="w-full md:text-xs xl:text-base">
                      <tbody>
                        {tableData.map(({ name, children }, i) => (
                          <tr key={`table-${name}`}>
                            <th className="w-40 py-1">{name}</th>
                            <td>{Array.isArray(children) ? children.join(' / ') : children}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {detail.map(({ name: detailName, children }, i) => (
                  <div key={`detail-${i}`} className="flex flex-col gap-y-2">
                    <h4 className="font-semibold md:text-base xl:text-xl">{detailName}</h4>
                    <ul className="flex list-disc flex-col gap-y-2 pl-4 md:text-xs xl:text-base">
                      {children.map((child, j) => {
                        return isPlainObject(child) && child.name ? (
                          <li className="">
                            {child.name}
                            <ul className="list-disc pl-6">
                              {child.children.map((c) => (
                                <li key={`child`}>{c}</li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li>{child}</li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resume

const contacts = [
  [
    { label: 'Email', value: 'zuhye5@gmail.com', href: 'zuhye5@gmail.com' },
    { label: 'Github', value: 'https://github.com/zubetcha', href: 'https://github.com/zubetcha' },
  ],
  [
    {
      label: 'Blog',
      value: 'https://zubetcha.com',
      href: 'https://zubetcha.com',
    },
    {
      label: 'Phone',
      value: '010-2292-6428',
      href: '',
    },
  ],
]

const works = [
  {
    name: '의식주컴퍼니',
    period: '2023.01 - 현재',
    summaries: [
      '비대면 세탁 서비스인 런드리고 및 커머스를 운영하는 스타트업',
      '세탁 팩토리, 운송, 그룹웨어, 앱 어드민 등 서비스 운영과 관련된 백오피스 웹 프론트엔드 개발',
    ],
    tableData: [
      {
        name: 'Teck Stack',
        children: [
          'React',
          'Nextjs',
          'Typescript',
          'Redux-toolkit',
          'Styled-components',
          'Turborepo',
          'Yarn berry',
        ],
      },
      {
        name: 'Description',
        children: [
          '백오피스 및 어드민 유지보수',
          'PHP 리팩토링',
          '모노레포 구축',
          '콘텐츠 에디터 개발',
        ],
      },
    ],
    detail: [
      {
        name: '서비스 운영에 필요한 백오피스 어드민 개발',
        children: [
          'PHP 및 react 기반 팩토리, 운송, 그룹웨어, 런드리고 앱 어드민 등 백오피스 기능 개발 및 유지보수',
          '기존에 PHP로 운영하고 있던 화면들을 React로 점진적 이관 진행',
          'SSR, 웹서버 등이 필요하지 않은 Next 기반 어드민을 React로만 서빙하도록 리팩토링하여 불필요한 비용 개선',
          '팩토리에서 작업 미완료 전 화면 이탈 방지를 위한 커스텀훅 개발',
        ],
      },
      {
        name: 'Turborepo & yarn berry를 활용한 모노레포 구축',
        children: [
          '멀티레포 구조로 관리하던 백오피스 프로덕트들을 Turborepo 기반 모노레포로 구축 및 공통 모듈 패키지를 설계, 개발하여 유지보수 용이성 향상',
          'CI/CD에 소요되는 시간 절약을 위해 Jenkins 서버에서 레포지토리 전체를 clone 하는 게 아닌 변경 사항만 merge 하도록 파이프라인 리라이팅',
          '패키지 이름을 외우지 않아도 간편하게 스크립트를 실행시킬 수 있도록 모노레포용 CLI 라이브러리 개발',
        ],
      },
      {
        name: '랜딩페이지 에디터 개발',
        children: [
          '이미지, 텍스트, 버튼 등 랜딩페이지에 필요한 요소들을 추가하고 원하는 위치에 배치하여 직접 제작할 수 있는 웹 에디터',
          '추후 확장성과 이관 가능성을 고려하여 DOM 조작과 관련된 주요 로직은 인스턴스화 하여 분리해 관리',
          '주 평균 2회 있던 랜딩페이지 제작 요청을 없애 인적 개발 리소스 개선',
        ],
      },
      {
        name: '기타',
        children: [
          '주 1회 프론트엔드 주니어 스터디를 진행하여 테스트 코드, 성능 개선, 컨벤션 정립 등 실무에 적용',
        ],
      },
    ],
  },
  {
    name: '젠틀에너지',
    period: '2022.03 - 2023.01',
    summaries: [
      '자체적으로 개발한 센서를 이용해 공장의 전력 사용량을 측정하여 전력 비용을 개선할 수 있는 B2B 솔루션 스타트업',
      '센서가 측정하는 지표들을 실시간으로 시각화하여 보여주는 웹 대시보드 및 어드민 개발',
    ],
    tableData: [
      {
        name: 'Teck Stack',
        children: [
          'React',
          'Nextjs',
          'Typescript',
          'Tanstack-query',
          'Redux-toolkit',
          'SCSS',
          'Echarts',
          'Turborepo',
          'Storybook',
        ],
      },
      {
        name: 'Description',
        children: ['웹 솔루션', '웹 솔루션', '모노레포', '백오피스'],
      },
    ],
    detail: [
      {
        name: '데이터 시각화 웹 솔루션 개발',
        children: [
          'polling 방식을 이용한 실시간 차트 대시보드 개발',
          <>
            echarts 라이브러리의 트리쉐이킹 적용을 통해{' '}
            <a
              href="https://zubetcha.com/post/2022/08/bundle-optimization-with-tree-shaking"
              target="_blank"
              className={anchorClassName}
            >
              번들 사이즈 최적화
            </a>{' '}
            (약 46% 감소)
          </>,
          '다국어 지원 기능을 개발하기 위해 사용한 next-i18next 라이브러리에서 휴먼 에러가 발생할 수 있는 가능성을 개선하기 위해 자동 완성되는 Object Literal을 생성해 주는 유틸함수 개발',
        ],
      },
      {
        name: '빠른 솔루션 제공을 위한 디자인 시스템 구축',
        children: [
          '의존도를 없애고 자유로운 커스터마이징을 위해 UI 컴포넌트 라이브러리는 사용하지 않고 개발',
          'UI 테스트를 위한 Storybook 프로젝트 구성',
          '컴포넌트 인터페이스 설계 과정 및 고민했던 점들을 문서화하여 팀 내 공유',
        ],
      },
      {
        name: 'Turborepo 기반 모노레포 구축',
        children: [
          <>
            <a
              href="https://zubetcha.com/post/2022/11/monorepo-with-turborepo"
              target="_blank"
              className={anchorClassName}
            >
              공통 config 패키지화
            </a>
            를 통해 프로젝트 세팅 리소스 감소
          </>,
          '관심사 분리, 관리 포인트 최소화 및 빌드 시간 단축을 통해 DX 향상',
        ],
      },
      {
        name: '사내 회의 예약 관리 백오피스 서비스 개발',
        children: [
          '엑셀 시트로 회의를 예약해야 하는 불편을 해소하고자 개발팀이 자발적으로 기획 및 디자인하여 개발',
          '프로젝트 리드를 담당하여 일정 관리 및 유관부서와의 커뮤니케이션 주도',
          <>
            PWA 적용 및 Firebase Cloud Messaging 서비스를 이용하여{' '}
            <a
              href="https://zubetcha.com/post/2022/10/web-push-alarm-with-firebase-cloud-messaging"
              target="_blank"
              className={anchorClassName}
            >
              웹 푸시 알림 개발
            </a>
          </>,
          'SSE 방식을 이용하여 실시간 알림 메시지 수신 기능 개발',
        ],
      },
    ],
  },
]

const projects = [
  {
    name: '오픈 소스  개발',
    period: '2023',
    tableData: [
      {
        name: 'Npm',
        children: (
          <a
            href="https://www.npmjs.com/package/monorepo-ez-script"
            target="_blank"
            className={anchorClassName}
          >
            monorepo-ez-script
          </a>
        ),
      },
      {
        name: 'Github',
        children: (
          <a
            href="https://github.com/zubetcha/monorepo-ez-script"
            target="_blank"
            className={anchorClassName}
          >
            https://github.com/zubetcha/monorepo-ez-script
          </a>
        ),
      },
      { name: 'Teck Stack', children: ['Nodejs'] },
      {
        name: 'Description',
        children:
          '토이프로젝트 | 모노레포 구조에서 패키지 이름이나 스크립트를 외우고 있지 않아도 간편하게 선택하여 실행시켜 주는 CLI 라이브러리',
      },
    ],
    detail: [
      {
        name: '상세 내용',
        children: [
          '초기화 명령어를 통해 모노레포 내 패키지 이름과 각 패키지의 스크립트 정보 수집하여 JSON 형식의 config 파일 생성',
          '실행 명령어를 입력하면 config 파일에서 패키지와 스크립트 이름을 불러와 터미널에 select 형태로 노출 및 선택 완료하면 해당 패키지의 스크립트를 자동으로 실행',
        ],
      },
    ],
  },
]

const otherExperience = [
  {
    detail: [
      {
        name: '스파르타 코딩클럽 주관 부트캠프 React 멘토 (2022~)',
        children: [
          '스파르타 코딩클럽 부트캠프 항해 99 멘토링 (8개 기수)',
          '스파르타 코딩클럽 X ICT 이노베이션 캠프 멘토링 (3개 기수)',
        ],
      },
    ],
  },
]

const etc = [
  {
    detail: [
      {
        name: '외국어',
        children: [
          {
            name: '영어',
            children: [
              'TOEIC 950점 (취득일: 2021.01.24)',
              'TOEIC Speaking level 6 (취득일: 2021.05.02)',
            ],
          },
          { name: '일본어', children: ['JLPT N1 (취득일: 2021.08.09)'] },
        ],
      },
      {
        name: '교육',
        children: [
          '스파르타 코딩클럽 항해 99 4기 수료 (2021.11 - 2022.02)',
          '가천대학교 경영학 트랙 전공 및 2018년 2월 졸업 (2013.03 - 2018.02)',
        ],
      },
    ],
  },
]

const dataSource = [
  { title: 'Work Experience.', content: works },
  { title: 'Project.', content: projects },
  { title: 'Other Experience.', content: otherExperience },
  { title: 'Etc.', content: etc },
]
