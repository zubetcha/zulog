import React from 'react'
// import * as _ from 'lodash'
import { isPlainObject } from 'lodash'

const anchorClassName = 'font-semibold text-blue-500 underline-offset-2 hover:underline'

const Resume = () => {
  return (
    <div className="flex flex-col gap-y-10 py-20">
      <div className="flex flex-col gap-y-10">
        <h1 className="text-5xl font-bold">안녕하세요, 정주혜입니다.</h1>
        <p className="text-xl">
          3년차 웹 프론트엔드 개발자로, 비효율적인 프로세스와 사람이 하는 반복적인 일을 자동화하여
          개선하는 데 관심이 많습니다. <br />
          사내에서 자발적으로 자동화 관련 백오피스 기능 및 툴 등을 만든 경험이 있습니다. 개인적으로
          게임 내 단체 컨텐츠를 편하게 즐기기 위해 명단을 관리하는 카카오톡용 봇을 개발해 운영하고
          있습니다.
        </p>
        <div className="border-y py-3">
          <table className="w-full">
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
      <div className="flex flex-col gap-y-20">
        {dataSource.map(({ title, content }) => (
          <div key={title} className="flex flex-col gap-y-10">
            <h2 className="text-3xl font-extrabold">{title}</h2>

            {content.map(({ name, period, tableData, detail }) => (
              <div key={name} className="flex flex-col gap-y-10">
                {(Boolean(name) || Boolean(period)) && (
                  <div className="flex justify-between">
                    <h3 className="text-2xl font-bold text-blue-500">{name}</h3>
                    <span>{period}</span>
                  </div>
                )}

                {Boolean(tableData) && (
                  <div className="border-y py-3">
                    <table className="w-full">
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
                    <h4 className="text-xl font-semibold">{detailName}</h4>
                    <ul className="flex list-disc flex-col gap-y-2 pl-4">
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
          '기존에 PHP로 운영하고 있던 화면들을 React로 리팩토링 진행',
        ],
      },
      {
        name: 'Turborepo & yarn berry를 활용한 모노레포 구축',
        children: [
          '멀티레포 구조로 관리하던 백오피스 프로덕트들을 Turborepo 기반 모노레포로 구축 및 공통 모듈 패키지를 설계, 개발하여 유지보수 용이성 향상',
          'CI/CD에 소요되는 시간 절약을 위해 Jenkins 서버에서 레포지토리 전체를 clone하는 게 아닌 변경사항만 merge하도록 파이프라인 리라이팅',
          '패키지 이름을 외우지 않아도 간편하게 스크립트를 실행시킬 수 있도록 모노레포용 CLI 라이브러리 개발',
        ],
      },
      {
        name: '랜딩페이지 에디터 개발',
        children: [
          '유관부서에서 직접 랜딩페이지를 제작할 수 있는 웹 에디터를 개발',
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
          '다국어 지원 기능을 개발하기 위해 사용한 next-i18next 라이브러리에서 휴먼 에러가 발생할 수 있는 가능성을 개선하기 위해 자동 완성되는 object literal을 생성해주는 유틸함수 개발',
        ],
      },
      {
        name: '빠른 솔루션 제공을 위한 디자인 시스템 구축',
        children: [
          '의존도를 없애고 자유로운 커스터마이징을 위해 UI 컴포넌트 라이브러리는 사용하지 않고 개발',
          '네이밍과 유연함에 중점을 두어 공통 컴포넌트 인터페이스 설계 및 개발',
          'UI 테스트를 위한 Storybook 프로젝트 구성',
          '인터페이스 설계 과정 및 고민했던 점들을 문서화하여 팀내 공유',
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
          '관심사분리, 관리 포인트 최소화 및 빌드 시간 단축을 통해 DX 향상',
        ],
      },
      {
        name: '사내 회의 예약 관리 백오피스 서비스 개발',
        children: [
          '엑셀 시트로 회의를 예약해야 하는 불편함을 해소하고자 개발팀이 자발적으로 기획 및 디자인하여 개발',
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
        name: 'npm',
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
          '토이프로젝트 | 모노레포 구조에서 패키지 이름이나 스크립트를 외우고 있지 않아도 간편하게 선택하여 실행시켜주는 CLI 라이브러리',
      },
    ],
    detail: [
      {
        name: '상세 내용',
        children: [
          '초기화 명령어를 통해 모노레포 내 패키지 이름과 각 패키지의 스크립트 정보 수집하여 json 파일 생성',
          '실행 명령어를 통해 실행할 패키지와 해당 패키지에 있는 스크립트를 Select 방식으로 선택',
        ],
      },
    ],
  },
  {
    name: '카카오톡 챗봇 개발',
    period: '2024',
    tableData: [
      {
        name: 'Github',
        children: (
          <a
            href="https://github.com/zubetcha/seed-bot"
            target="_blank"
            className={anchorClassName}
          >
            https://github.com/zubetcha/seed-bot
          </a>
        ),
      },
      { name: 'Teck Stack', children: ['Express', 'Supabase', 'Koyeb'] },
      {
        name: 'Description',
        children:
          '토이프로젝트 | 게임 내 단체 컨텐츠 참여 인원 명단을 채팅 명령어로 관리할 수 있는 메신저 봇',
      },
    ],
    detail: [
      {
        name: '상세 내용',
        children: ['명단 관리에 필요한 데이터베이스 구조 설계', '명령어 채팅에 상응하는 API 개발'],
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
          '스파르타 코딩클럽 부트캠프 항해99 멘토링 (8개 기수)',
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
          '스파르타 코딩클럽 항해99 4기 수료 (2021.11 - 2022.02)',
          '가천대학교 경영학트랙 전공 및 2018년 2월 졸업 (2013.03 - 2018.02)',
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
