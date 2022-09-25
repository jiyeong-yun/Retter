# Re:tter💌 (레터)

> **_소중한 사람들에게 마음을 전해요._**

아날로그(음성)와 디지털(인공지능)을 잇는 음성 메세지 카드

- 개발 기간: 2022.02.21 ~ 2022.04.08 (7주)
- 삼성 청년 SW 아카데미 6기 특화프로젝트(인공지능-음성) 우수상 (3위) 🥉

## 서비스 소개

- 인공지능 TTS 서비스를 활용한 메세지 전달 웹 서비스

## 개발 배경

- **텍스트만으로는 잘 전해지지 않는 마음, Re:tter가 대신 전해드립니다.**
- 코로나19로 사회적 거리두기가 일반화된 지금, 직접 만나기보단 온라인에서 안부 인사를 전하는 일이 잦아졌습니다. 여러분은 생일, 기념일과도 같은 특별한 날, 혹은 평소에 전하고 싶은 이야기를 어떻게 전하고 계신가요?
- `Re:tter`는 텍스트로만 전하기에는 의도가 잘 전달되지 않을 것 같아 불안하고, 전화는 분위기가 너무 무겁지 않을까 걱정되는 사람들을 위한 인공지능 TTS 음성 메세지 카드입니다. 전하고 싶은 메세지를 입력하면 직접 구현한 TTS가 메세지를 음성으로 변환해 주고, 에디터로 나만의 카드를 만들어 음성 메시지와 함께 SNS로 공유할 수 있습니다.
- 프로젝트명 `Re:tter`는 `Record(녹음) + Letter(편지)`의 합성어로, 마음에 답글(`Re:`)을 단다는 의미에서 지어졌습니다.

## 팀원 소개

Team. 사서함 202호 (6명)

| [![김은서](https://avatars.githubusercontent.com/u/84255977?v=4)](https://github.com/eunseo130) |        [![김혜인](https://avatars.githubusercontent.com/u/25563077?v=4)](https://github.com/HyeIn-Kim)         | [![노건우](https://avatars.githubusercontent.com/u/87460298?v=4)](https://github.com/rogonu) | [![서예진](https://avatars.githubusercontent.com/u/87715721?v=4)](https://github.com/Ginnyseo2) | [![성당현](https://avatars.githubusercontent.com/u/100592455?v=4)](https://github.com/dangbba) | [![윤지영](https://avatars.githubusercontent.com/u/70522500?v=4)](https://github.com/jiyeong-yun) |
| :---------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------: |
|           [**김은서**](https://github.com/eunseo130)<br/>팀장<br/>Back-end, AI, Infra           | [**김혜인**](https://github.com/HyeIn-Kim)<br/>Front-end<br/>카드 에디터 개발<br/>TTS 학습용 목소리 녹음 |                   [**노건우**](https://github.com/rogonu)<br/>Back-end, AI                   |                   [**서예진**](https://github.com/Ginnyseo2)<br/>Back-end, AI                   |                     [**성당현**](https://github.com/dangbba)<br/>Front-end                     |               [**윤지영**](https://github.com/jiyeong-yun)<br/>Back-end, AI, Infra                |

## 기술 스택

### Front-end

<img src="https://img.shields.io/badge/-React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/-Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=black"/> <img src="https://img.shields.io/badge/-Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"/> <img src="https://img.shields.io/badge/-styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

### Back-end

<img src="https://img.shields.io/badge/-python-3776AB?style=for-the-badge&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/-django-092E20?style=for-the-badge&logo=django&logoColor=white"/> <img src="https://img.shields.io/badge/-mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/>

### AI

<img src="https://img.shields.io/badge/-python-3776AB?style=for-the-badge&logo=python&logoColor=white"/> <img src="https://img.shields.io/badge/-pytorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white"/> <img src="https://img.shields.io/badge/-tacotron2-76B900?style=for-the-badge"/> <img src="https://img.shields.io/badge/-waveglow-4285F4?style=for-the-badge"/>

### Infra

<img src="https://img.shields.io/badge/-amazon ec2 server-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=white"/> <img src="https://img.shields.io/badge/-docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/> <img src="https://img.shields.io/badge/-nginx-009639?style=for-the-badge&logo=nginx&logoColor=white"/>

### Editor

<img src="https://img.shields.io/badge/-visual studio code-2496ED?style=for-the-badge&logo=visual-studio-code&logoColor=white"/>

### 협업 툴

<img src="https://img.shields.io/badge/-gitlab-FC6D26?style=for-the-badge&logo=gitlab&logoColor=white"/> <img src="https://img.shields.io/badge/-jira-0052CC?style=for-the-badge&logo=jira-software&logoColor=white"/> <img src="https://img.shields.io/badge/-mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white"/> <img src="https://img.shields.io/badge/-notion-000000?style=for-the-badge&logo=notion&logoColor=white"/>

## 기능 설명

### 메인 화면

![메인 화면](https://user-images.githubusercontent.com/25563077/187306409-23d1fde2-e891-4b0c-be38-9db93f194add.gif)

- 전체적인 서비스 설명 및 가이드 확인 가능
- '카드 만들기' 버튼을 눌러 '목소리 선택' 페이지로 이동

### 내 목소리로 카드 만들기

![내 목소리로 카드 만들기](https://user-images.githubusercontent.com/25563077/187304248-9a026a2d-cedb-4fa7-83a7-2180f1c54e81.png)

- '녹음 버튼'을 눌러 나의 목소리를 녹음 (최대 20초)

### 다른 목소리로 카드 만들기

![다른 목소리로 카드 만들기](https://user-images.githubusercontent.com/25563077/187304502-9519a5eb-c68a-466e-b77d-10c563ac647c.png)

- 텍스트 박스에 전달하고 싶은 메시지를 입력
- 재생버튼을 눌러 미리듣기 음성을 듣고 마음에 드는 목소리 선택

### 카드 만들기

![카드 만들기](https://user-images.githubusercontent.com/25563077/187304951-229f97e0-5b80-4dd0-ba76-7e055316de77.png)

- 마음에 드는 스티커, 배경 등을 골라 카드 꾸미기

- tts로 음성합성 후 카드를 만들 때 '텍스트'를 눌러 text 불러오기

- 카드 꾸미기가 완료되면 '저장' 버튼을 눌러 카드 완성

### 완성한 카드 확인 및 공유

![완성한 카드 확인 및 공유](https://user-images.githubusercontent.com/25563077/187305341-e6814560-9404-4b06-8342-fa7e7c99949c.png)

- 재생 버튼을 통해 영상을 확인
- 'URL 복사' 버튼을 통해 url을 클립보드에 저장
- 카카오톡 버튼을 눌러 카카오톡을 통해 메시지를 공유
- '처음으로' 버튼을 눌러 서비스 메인화면으로 돌아감

## 카드 에디터 구현

- 외부 라이브러리 없이 `MouseEvent`를 활용한 `React + Javascript` 카드 에디터 직접 구현
- [🖌️ 카드 에디터: 기술 선정부터 구현까지](https://tulip-cupboard-6c2.notion.site/f34d7a2047ad40e1ba26bc2e0a72be93)

## 인공지능

### TTS 기능 구현

![Text-to-Speech(TTS)](https://user-images.githubusercontent.com/25563077/187439320-e2d83489-4558-40f5-b3ee-468e2ff8b581.png)

- 서비스에 사용되는 TTS 기능을 직접 구현(총 2개의 모델)
- `Tacotron2`: 텍스트 -> Mel-spectogram 변환
- `Waveglow`: Mel-spectogram -> 음성 변환

### 데이터 전처리 & 데이터셋

![Data processing](https://user-images.githubusercontent.com/25563077/187440266-cda7aa8e-5e4b-47f9-abb8-9c42f407c405.png)

- 녹음용 대본과 녹화 환경은 [Mimic Recording Studio 한국어 버전](https://sce-tts.github.io/#/v2/recoding)을 사용

## 아키텍쳐

![아키텍쳐](https://user-images.githubusercontent.com/25563077/187202238-204b3a7d-b96e-4d2b-8e3a-f53200b3fa4c.png)

## 배포

### 버전 정보 - Frontend

- Visual Studio Code 1.66.0
- React 17.0.2
- Redux 4.1.2
- styled-components 5.3.5
- npm 8.1.2

```bash
# 로컬
cd frontend
npm install
npm start
```

### 버전 정보 - Backend

- Visual Studio Code 1.66.0
- Python 3.7.11
- Django 3.2.12
- Docker 20.10.14
- Nginx nginx/1.18.0

```bash
# 로컬 환경에서 실행
cd docker-server/backend

# 가상환경 생성 & 설치
conda create -n retter
conda activate retter
pip install -r requirements.txt

# Django 서버 실행
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

```

```bash
# 서버에 최종 빌드
docker-compose up --build
```

### 버전 정보 - AI

- torch 1.7.1+cu110
- cuda 11.2
- cudatoolkit 11.3.1
- cudnn 8.2.1 (11.3 링크를 통해 다운로드)

### 버전 정보 - DB

- MySql 8.0.28-0
- ubuntu 0.20.04.3
- DB 이름: `retter`

- 서버에서 DB 접속 시 : `mysql -u root -p ` Enter password: `retter`
  - NAME: retter
  - USER: ssafy
  - PASSWORD: retter
- DB 덤프 파일: `exec` > `Retter.sql`

### 환경 변수 설정

`시스템 변수 > Path` 에 다음의 경로를 추가한다.

```bash
- `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.2\bin`
- `C:\Program Files\NVIDIA GPU Computing Toolkit\CUDA\v11.2\libnvvp`
```
