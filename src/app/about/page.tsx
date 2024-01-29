"use client";

import ContentArea from "../client/ContentArea";

export default async function AboutPage() {
  return (
    <ContentArea>

      <section id="link" className="flex flex-col items-end mb-6">
        <div className="flex my-2 space-x-2 md:space-x-4">
          <div className="tooltip" data-tip="msl9204@gmail.com" onClick={emailCopy}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/email-icon.png" className="ficon w-8 cursor-pointer" alt="email image" />

          </div>
          <a href="https://github.com/preinpost" target="_blank">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/github-icon.png" className="ficon w-8" alt="github image" />
          </a>
        </div>
      </section>


      <section className="flex flex-col text-lg md:text-2xl font-noto-sans leading-1">
        <p>안녕하세요 Fullstack 개발자 이민수 입니다.</p>
        <p>만 3년차 개발자로 주로 Java를 사용하여 업무하고 있습니다.</p>
        <p>현재 금융권 SI/SM 프로젝트에 참여하고 있습니다.</p>
      </section>

      <section id="core-tech">
        <h3>핵심기술</h3>
        <div className="card card-compact bg-base-200 shadow-xl">
          <div className="card-body -mt-6">
            <h4>Language</h4>
            <div className="flex flex-wrap -mt-3 md:flex-row md:space-x-3">
              <div className="badge language-badge-color">Java</div>
              <div className="badge language-badge-color">JavaScript</div>
              <div className="badge language-badge-color">TypeScript</div>
              <div className="badge language-badge-color">Python</div>
              <div className="badge language-badge-color">C</div>
              <div className="badge language-badge-color">Rust</div>
            </div>
            <h4>Framework/Library</h4>
            <div className="flex flex-wrap -mt-3 md:flex-row md:space-x-3">
              <div className="badge framework-badge-color">Spring Boot</div>
              <div className="badge framework-badge-color">React</div>
              <div className="badge framework-badge-color">Vue.js</div>
              <div className="badge framework-badge-color">Next.js</div>
              <div className="badge framework-badge-color">Nuxt.js</div>
            </div>

            <h4>Tool/Etc</h4>
            <div className="flex flex-wrap -mt-3 md:flex-row md:space-x-3">
              <div className="badge tool-badge-color">Oracle</div>
              <div className="badge tool-badge-color">Mysql</div>
              <div className="badge tool-badge-color">AWS</div>
              <div className="badge tool-badge-color">Git</div>
              <div className="badge tool-badge-color">Terraform</div>
              <div className="badge tool-badge-color">Docker</div>
              <div className="badge tool-badge-color">Intellij</div>
              <div className="badge tool-badge-color">Vscode</div>
            </div>
          </div>
        </div>
      </section>

      <section id="career">
        <h3>경력</h3>
        <div className="card card-compact px-3 divide-y-2 divide-dotted divide-orange-400 bg-base-200 shadow-xl">
          <div className="card-body">
            <h4 className="card-title">[ 2023.02 ~ 진행중 ]</h4>
            <div className="font-bold">저축은행중앙회 신규 서비스 개발 프로젝트</div>
            <ul>
              <li>사용 기술 : Java, Jsp, jQuery, Oracle, MyBatis</li>
              <li>사용 프레임워크 : JEX/Nexcore 프레임워크</li>
              <li>담당업무 1. 화면 개발 및 코어뱅킹 개발 (BC체크카드 발급/결제/정산)</li>
              <li>담당업무 2. 자사 신규서비스 화면 개발 및 연동</li>
            </ul>

            <div className="flex flex-col px-3 py-3 space-y-3">
              <div>기존 체크카드 프로세스 분석 및 설계</div>
              <div>대외계와 FEP 를 연동해 BC체크카드 발급 실시간 처리 프로그램 개발</div>
              <div>신규 상품 요구사항에 맞춰 카드 데이터 전처리&적재 및 회계 처리</div>
            </div>
          </div>


          <div className="card-body">
            <h4 className="card-title">[ 2022.02 ~ 2023.01 ]</h4>
            <div className="font-bold">클라우드 기반 핀테크 계산기 신규 서비스 개발</div>
            <ul>
              <li>사용 기술 : Python, Terraform, Docker, AWS ApiGateway/Lambda/DynamoDB</li>
              <li>담당업무 : Serverless REST API 서버 구축</li>
            </ul>

            <div className="flex flex-col px-3 py-3 space-y-3">
              <div>Terraform 을 사용하여 클라우드 Serverless API 서버를 구축</div>
              <div>Poetry, Terraform, Docker를 사용하여 Dockerize 및 클라우드 업로드 자동화</div>
              <div>TeamCity를 사용하여 CI/CD 구성</div>
            </div>
          </div>

          <div className="card-body">
            <h4 className="card-title">[ 2020.09 ~ 2021.06 ]</h4>
            <div className="font-bold">인포스탁 서비스 개선 프로젝트</div>
            <ul>
              <li>사용 기술 : Spring Boot, Mysql, Vue.js, Python, AWS CloudFront/S3/EC2/Lambda</li>
              <li>담당업무: 주식 데이터 가공 및 API 개발</li>
            </ul>

            <div className="flex flex-col px-3 py-3 space-y-3">
              <div>주식신문 생성 뉴스봇 개발</div>
              <div>퍼블리싱 된 화면 적용 및 화면 로직 개발</div>
              <div>관리자 페이지 화면 및 API 개발</div>
            </div>
          </div>

        </div>

      </section>

      <section>
        <h3>자격증</h3>

        <div className="card card-compact bg-base-200 shadow-xl md:w-32">
          <div className="card-body -mt-6 -mb-2">
            <h3 className="card-title">정보처리기사</h3>
          </div>
        </div>
      </section>

      <section>
        <h3>Products</h3>
        <div className="card card-compact bg-base-200 shadow-xl">
          <div className="card-body -mt-6">
            <h4>EclipseTimer</h4>
            <a href="https://apps.apple.com/kr/app/eclipsetimer-track-my-daily/id6453854152" target="_blank">링크</a>
            <div>
              코딩테스트 연습을 위한 맥용 앱입니다.
              Swift/SwiftUi 를 사용해서 개발하였습니다.
            </div>

          </div>
        </div>
      </section>
    </ContentArea>

  )
}

function emailCopy() {
  const toast = document.getElementById('toast-alert');
  const alert = document.querySelector('.alert');

  const emailAddress = "msl9204@gmail.com"
  navigator.clipboard.writeText(emailAddress)
  .then(() => {
      alert!.innerHTML = "이메일 주소가 복사되었습니다.";
      toast!.classList.toggle('hidden');

    setTimeout(() => {
      toast!.classList.toggle('hidden');
    }, 3000);
  })
  .catch(err => {
    alert!.innerHTML = "복사에 실패하였습니다.";
    toast!.classList.toggle('hidden');

    setTimeout(() => {
      toast!.classList.toggle('hidden');
    }, 3000);
  });



}