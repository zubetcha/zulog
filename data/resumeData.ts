const resumeData = [
  {
    company: '',
    period: '',
    summary: '',
    skillList: [],
    taskList: [{ title: '' }],
  },
  { title: 'Projects', children: [] },
  {
    title: 'Activities',
    children: [
      {
        content: '오픈 소스',
        children: [
          {
            content: 'monorepo-ez-script 개발',
            children: [
              {
                content:
                  '모노레포 환경에서 각 워크스페이스의 이름과 스크립트를 외우고 있지 않아도 간편하게 실행할 수 있도록 도와주는 CLI 라이브러리',
              },
            ],
          },
        ],
      },
      {
        content: '교육 프로그램 React 멘토링',
        children: [
          { content: '스파르타 코딩클럽 항해99 (9기, 10기, 12기, 15기, 16기, 17기) (2022.09 ~)' },
          {
            content: '스파르타 코딩클럽 X ICT 이노베이션 캠프 (서울, 동북) (2022.06 - 2022.09)',
          },
          { content: '라이브 세션 진행', children: [{ content: 'React와 Virtual DOM (2022.11)' }] },
        ],
      },
    ],
  },
  {
    title: 'Others',
    children: [
      {
        content: '외국어',
        children: [
          {
            content: '영어',
            children: [
              {
                content: 'TOEIC 950점 (취득일: 2021.01.24)',
              },
              { content: 'TOEIC Speaking level 6 <Period>(취득일: 2021.05.02)' },
            ],
          },
          {
            content: '일본어',
            children: [{ content: '일본어: JLPT N1 <Period>(취득일: 2021.08.09)' }],
          },
        ],
      },
      {
        content: '교육',
        children: [
          { content: '스파르타 코딩클럽 항해99 4기 수료 (2021.11 - 2022.02)' },
          { content: '가천대학교 경영학트랙 전공 (2013.03 - 2018.02)' },
        ],
      },
      {
        content: '개발 외 업무 경험',
        children: [{ content: '무인양품 상품팀 생활잡화 파트 MD (대리) (2018.03 - 2021.10)' }],
      },
    ],
  },
]

export default resumeData
