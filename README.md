## 지원자

- 이름 : 김동구
- 이메일 : kdonggoo44gmail.com

## 개발 환경

### Developement

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white"/> <img src="https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white"/>

### Styling

<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=white"/>

## 실행 방법

- 이 애플리케이션은 json server를 사용하고 있습니다. npm start 시 json server가 함께 실행 됩니다.

- http://localhost:5173/ 에서 애플리케이션을 확인할 수 있습니다.

```
$ git clone https://github.com/kimdonggu42/Take-Home-Quiz.git

$ cd Take-Home-Quiz

$ npm install

$ npm start
```

## 디렉토리 구조

```
📦 src
 ┣ 📂 components
 ┃ ┗ 📜 ReservationCard.svelte
 ┣ 📂 lib
 ┃ ┣ 📂 icons
 ┃ ┃ ┣ 📜 add.svg
 ┃ ┃ ┣ 📜 ...
 ┃ ┃ ┗ 📜 trash.svg
 ┣ 📂 routes
 ┃ ┣ 📂 date
 ┃ ┃ ┣ 📂 [reservationId]
 ┃ ┃ ┃ ┗ 📜 +page.svelte
 ┃ ┃ ┣ 📜 +page.svelte
 ┃ ┣ 📂 edit
 ┃ ┃ ┣ 📂 [reservationId]
 ┃ ┃ ┃ ┗ 📜 +page.svelte
 ┃ ┣ 📂 new
 ┃ ┃ ┗ 📜 +page.svelte
 ┃ ┣ 📜 +layout.svelte
 ┃ ┗ 📜 +page.svelte
 ┣ 📂 stores
 ┃ ┣ 📜 +reservationData.js
 ┃ ┗ 📜 +reservations.js
 ┣ 📜 app.html
 ┗ 📜 global.css
```

## 작업 내용

### 1. Svelte Store

- reservation state는 src/stores/reservationDats.js에서 관리하도록 했습니다.

### 2. 예약 숨김 처리

- 예약 리스트를 seated라는 state에 따라 조건부 렌더링 되도록 했습니다. seated 버튼 클릭 시 seated: true가 되어 리스트에서 보이지 않도록 했습니다.

## 시연 화면

|                                                     **예약 추가**                                                     |                                                     **예약 수정**                                                     |
| :-------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| <img width="100%" src="https://github.com/kimdonggu42/saveme/assets/115632555/eeca86ed-ad56-4b35-b207-663967270873"/> | <img width="100%" src="https://github.com/kimdonggu42/saveme/assets/115632555/13b6c7e7-26fc-417f-9854-cda1b03d402c"/> |
|                                                     **예약 삭제**                                                     |                                                 **예약 시 숨김 처리**                                                 |
| <img width="100%" src="https://github.com/kimdonggu42/saveme/assets/115632555/be1c0d06-bc67-4e09-b0e5-311dc587e4e6"/> | <img width="100%" src="https://github.com/kimdonggu42/saveme/assets/115632555/2755f822-e0e7-43d7-80c9-5d870ea5c8e3"/> |
