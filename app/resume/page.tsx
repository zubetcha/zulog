import React from 'react'
// import * as _ from 'lodash'
import { isPlainObject } from 'lodash'

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

const Resume = () => {
  return (
    <div className="flex flex-col gap-y-10 py-20">
      <p> 👷🏻‍♀️ 공사중 . . .</p>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-5xl font-bold">안녕하세요, 정주혜입니다.</h1>
        <p className="text-xl">나를 소개하지.</p>
        <div className="border-y py-3">
          <table className="w-full">
            {contacts.map((childContacts, i) => (
              <tr key={`contact-table-row-${i}`}>
                {childContacts.map(({ label, value, href }, j) => (
                  <>
                    <th className="w-1/6 py-1">{label}</th>
                    <td className="w-2/6">{href ? <a href={href}>{value}</a> : value}</td>
                  </>
                ))}
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className="flex flex-col gap-y-10">
        {dataSource.map(({ title, content }) => (
          <div key={title} className="flex flex-col gap-y-5">
            <h2 className="text-3xl font-extrabold">{title}</h2>
            <div>
              {content.map(({ name, period, tableData, detail }) => (
                <div key={name} className="flex flex-col gap-y-5">
                  <div className="flex justify-between">
                    {Boolean(name) && <h3 className="text-2xl font-bold">{name}</h3>}
                    {Boolean(name) && <span>{period}</span>}
                  </div>
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
                      <ul className="list-disc pl-4">
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
                          // console.log(child)
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Resume

const works = [
  {
    name: '젠틀에너지',
    period: '2022.03 - 2023.01',
    tableData: [
      {
        name: 'Teck Stack',
        children: [
          'Nextjs',
          'react-query',
          'redux-toolkit',
          'graphQL',
          'recoil',
          'typescript',
          'scss',
          'echarts',
          'turborepo',
          'storybook',
        ],
      },
      {
        name: 'Description',
        children: ['디자인 시스템', '웹 솔루션', '모노레포', '백오피스', '어드민'],
      },
    ],
    detail: [
      {
        name: '디자인 시스템 개발',
        children: [
          '의존도를 없애고 자유로운 커스터마이징을 위해 외부 라이브러리 없이 0부터 개발',
          '네이밍과 유연함에 중점을 두어 공통 컴포넌트 인터페이스 설계 및 개발',
          'UI 테스트를 위한 Storybook 프로젝트 구성',
          '인터페이스 설계 과정 및 고민했던 점들을 문서화하여 팀내 공유',
        ],
      },
      {
        name: '웹 솔루션 개발',
        children: [
          <>
            react-query의 useQuery로 다수의 API 동시 호출 시 API 개수만큼 발생하는 리렌더링을 1회로
            감소시켜 <a>렌더링 최적화</a>
          </>,
          'polling 방식을 이용한 실시간 차트, 데이터 시각화 및 대시보드 개발',
          <>
            echarts 라이브러리의 트리쉐이킹 적용을 통해 <a>번들 사이즈 최적화</a> (약 46% 감소)
          </>,
          '다국어 지원 기능을 개발하기 위해 사용한 next-i18next 라이브러리에서 휴먼 에러가 발생할 수 있는 가능성을 개선하기 위해 자동 완성되는 object literal을 생성해주는 유틸함수 개발',
        ],
      },
      {
        name: 'Turborepo 기반 모노레포 구축',
        children: [
          <>
            <a>공통 config 패키지화</a>를 통해 프로젝트 세팅 리소스 감소
          </>,
          '관심사분리, 관리 포인트 최소화 및 빌드 시간 단축을 통해 DX 향상',
        ],
      },
      {
        name: '어드민 개발',
        children: [
          '계정, 고객사 공장, 설비 및 부착된 센서를 관리하는 MES 및 ERP 서비스',
          'Google Map의 지도, 마커, 팝업 등의 UI 요소 인스턴스 생성 로직, 옵션 설정 로직 및 지도 컴포넌트를 분리하여 재사용성 향상',
          'DX 향상을 위해 MSW 라이브러리 도입을 주도하여 API 개발 전후 기준으로 수정해야 하는 코드량 감소',
        ],
      },
      {
        name: '사내 회의 예약 관리 백오피스 서비스 개발',
        children: [
          '엑셀 시트로 회의를 예약해야 하는 불편함을 해소하고자 자발적으로 자체 기획 및 디자인하여 개발',
          <>
            PWA 적용 및 Firebase Cloud Messaging 서비스를 이용하여 <a>웹 푸시 알림 개발</a>
          </>,
          'SSE 방식을 이용하여 실시간 알림 메시지 수신 기능 개발',
          '이미지 HEIC 확장자 변환 기능을 개발하여 크로스 플랫폼 지원',
          '유관부서와 QA 진행 및 개선사항 적용하여 사내 백오피스툴로 채택',
          '프로젝트 리드를 담당하여 일정 관리 및 유관부서와의 커뮤니케이션 주도',
        ],
      },
    ],
  },
]

const projects = [
  {
    name: '밈글밈글',
    period: '2021.12 - 2021.01',
    tableData: [
      { name: 'Github', children: <a>https://github.com/zubetcha/MemegleMemegle</a> },
      { name: 'Teck Stack', children: ['React', 'Redux', 'styled-components'] },
      {
        name: 'Description',
        children: '신조어와 최신 밈을 즐길 수 있는 신조어 오픈 사전 및 커뮤니티 서비스',
      },
    ],
    detail: [
      {
        name: 'CI/CD 및 최적화',
        children: [
          'Github Actions을 이용한 CI/CD 구축을 통해 DX 향상',
          'React 최적화 API 및 폰트 서브셋 제작을 통해 성능 최적화 (Lighthouse 퍼포먼스 점수 기준 79점 → 93점)',
        ],
      },
    ],
  },
]

const activities = [
  {
    detail: [
      {
        name: '스파르타 코딩클럽 항해99 React 튜터',
        children: [
          '스파르타 코딩클럽 항해99 (9기, 10기, 12기, 15기, 16기, 17기, 18기) (2022.09 - 현재)',
          '스파르타 코딩클럽 X ICT 이노베이션 캠프 (서울, 동북) (2022.06 - 2022.09)',
          <>
            수강생 대상 라이브 세션 진행 - <a>React와 Virtual DOM</a> (2022.11)
          </>,
        ],
      },
    ],
  },
]

const others = [
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
      {
        name: '개발 외 업무 경험',
        children: ['무인양품 상품팀 생활잡화 파트 MD (대리) (2018.03 - 2021.10)'],
      },
    ],
  },
]

const dataSource = [
  { title: 'Work Experiences', content: works },
  { title: 'Projects', content: projects },
  { title: 'Activities', content: activities },
  { title: 'Others', content: others },
]
