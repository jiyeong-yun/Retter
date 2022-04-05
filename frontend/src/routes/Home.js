import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import "../index.css";
import { setMainTitle } from "../components/Title";
import { Link } from "react-router-dom";

AOS.init();

function Home() {
  useEffect(() => setMainTitle(), []);
  // 스크롤 생성, 버튼변화는 css적용해야
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  // 100 초과하면 버튼에 스크롤 따라오게
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };
  // 맨위 0으로 올라오게
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setBtnStatus(false);
  };

  useEffect(() => {
    const watch = () => {
      window.addEventListener("scroll", handleFollow);
    };
    watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  // 로고 효과
  const useFadeIn = (duration = 1, delay = 0) => {
    const element = useRef();
    useEffect(() => {
      if (typeof duration !== "number" || typeof delay !== "number") {
        return;
      }
      if (element.current) {
        const { current } = element;
        current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
        current.style.opacity = 1;
      }
    }, [delay, duration]);
    return { ref: element, style: { opacity: 0 } };
  };
  const fadeInH1 = useFadeIn(3, 1);

  // 서비스 설명 박스로 할 경우
  let boxStyle = {
    width: "100%",
    fontSize: "20px",
    background: "gray",
    color: "white",
    textAlign: "center",
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <>
      <WRAP>
        {/* <h1 {...fadeInH1}>Re:tter</h1> */}
        <div
          data-aos="fade-right"
          data-aos-offset="600"
          data-aos-easing="ease-in-sine"
        >
          <br />
          <BACK>
            <DIV>
              <H2>소중한 사람들에게</H2>
              <H22>마음을 전해요!</H22>
              <h3>
                Re:ttr는 인공지능 TTS 서비스로 대신 읽어드리는 음성 메세지
                카드입니다
              </h3>
              <h3>목소리를 담은 나만의 특별한 메시지를 보내보세요!</h3>
              <Link to="/select">
                <SButton primary>카드 만들기</SButton>
              </Link>
            </DIV>
          </BACK>
          <br />
        </div>

        <div>
          <INTRO1>
            <IMG1 src="images/letter2.png"></IMG1>

            <TEXTDIV>
              <BIGTEXT>
                <h1 data-aos="fade-right">말로 하긴 부끄럽고</h1>
                <h1 data-aos="fade-right">텍스트는 불안할 때</h1>
              </BIGTEXT>

              <P>
                <p data-aos="fade-right">
                  코로나 19로 사회적 거리두기가 강화되면서
                </p>
                <p data-aos="fade-right">
                  마음의 거리두기도 진행되고 있는 지금...
                </p>
                <p data-aos="fade-right">
                  글로만 전하기에는 딱딱하기만 한 마음을
                </p>
                <p data-aos="fade-right">여러가지 목소리와 함께 전해보세요</p>
                <p data-aos="fade-right">편지의 감성과 최신 기술을 이용해</p>
                <p data-aos="fade-right">나만의 카드를 만들어 보세요!</p>
              </P>
            </TEXTDIV>
          </INTRO1>

          <INTRO2>
            <TEXTDIV2>
              <BIGTEXT>
                <h1 data-aos="fade-right">좋아하는 목소리를</h1>
                <h1 data-aos="fade-right">고를 수 있어요</h1>
              </BIGTEXT>
              <P>
                <p data-aos="fade-right">
                  내 목소리 또는 다른 목소리와 함께 내 마음을 전해보세요
                </p>
                <p data-aos="fade-right">
                  글로만 전하는 편지보다 훨씬 특별한 편지가 될 거에요
                </p>
              </P>
            </TEXTDIV2>

            <IMG2 src="images/people.png"></IMG2>
          </INTRO2>

          <INTRO3>
            <IMG3 src="images/phonesticker.png"></IMG3>
            <BIGTEXT>
              <h1 data-aos="fade-right">개성만점 스티커로</h1>
              <h1 data-aos="fade-right">편.꾸하자!</h1>
            </BIGTEXT>
            <P>
              <p data-aos="fade-right">다이어리처럼 편지도 꾸밀 수 있어요</p>
              <p data-aos="fade-right">나만의 스타일로 편지를 꾸며보세요</p>
            </P>
          </INTRO3>

          <Link to="/select">
            <BUTTLOCA>
              <SButton primary>카드 만들기</SButton>
            </BUTTLOCA>
          </Link>

          <br></br>
          <TBUTTON
            background="black"
            size="small"
            className={BtnStatus ? "topBtn active" : "topBtn"}
            onClick={handleTop}
          >
            TOP
          </TBUTTON>

          <FOOT>
            <PT>만든 사람들</PT>
            <PT>사서함 202호</PT>
            <FOOTDIV>
              <p>FE 김혜인 성당현</p>
              <p>BE 김은서 노건우 서예진 윤지영</p>
              <p>목소리 김혜인 일반여성</p>
            </FOOTDIV>
            <FOOTDIV2>
              <p>이미지 저작권 표시</p>
              <p>Re:ttr는 영리적인 목적으로 서비스를 운영하지 않습니다.</p>
            </FOOTDIV2>
          </FOOT>
        </div>
      </WRAP>
    </>
  );
}

export default Home;
const IMG3 = styled.img`
  float: right;
  margin-right: 20%;
  width: 30%;
`;
const TEXTDIV2 = styled.div`
  float: right;
`;
const P2 = styled.div`
  font-size: 20px;
  line-height: 100%;
  margin-top: 4%;
  font-weight: bold;
  text-align: right;
`;
const FOOTDIV2 = styled.div`
  // padding-left: 40%;
  text-align: center;
  line-height: 1.5em;
`;
const FOOTDIV = styled.div`
  // padding-left: 40%;
  word-spacing: 20px;
  margin-top: 2%;
  text-align: center;
  line-height: 1.5em;
`;
const PT = styled.p`
  font-size: 21px;
  text-align: center;
  line-height: 1.5em;
`;
const H22 = styled.h2`
  font-size: 50px;
  color: white;
  margin-bottom: 1.5em;
  font-weight: bold;
`;
const IMG1 = styled.img`
  float: right;
  width: 25%;
  margin-right: 20%;
`;
const P = styled.div`
  // font-family: 'Noto Sans KR', sans-serif;
  font-size: 20px;
  line-height: 2em;
  margin-top: 4%;
  font-weight: bold;
`;
const FOOT = styled.div`
  font-size: 17px;
  background-color: gray;
  color: white;

  padding: 1%;
  margin-top: 7%;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: lighter;
  line-height: 100%;
`;
const TBUTTON = styled.button`
  border-radius: 50%;
  background-color: white;
  width: 70px;
  height: 70px;
  border: 0;
  outline: 0;
  font-weight: bold;
  font-size: 15px;
  float: right;
  font-family: "Noto Sans KR", sans-serif;
  margin-right: 2%;
`;
const INTRO3 = styled.div`
  padding-left: 10%;
  margin-bottom: 30%;
  margin-top: 15%;
`;
const IMG2 = styled.img`
  width: 55%;
  padding-top: 5%;
`;
const INTRO2 = styled.div`
  margin: 10%;
  margin-bottom: 5%;
`;
const BIGTEXT = styled.div`
  font-size: 60px;
  line-height: 120%;
  font-weight: bold;
`;

const BUTTLOCA = styled.div`
  text-align: center;
`;

const TEXTDIV = styled.div`
  margin-top: 15%;
`;

const INTRO1 = styled.div`
  padding-left: 10%;
  margin-bottom: 5%;
`;

const BACK = styled.div``;

const IMG = styled.img`
  object-fit: cover;
  height: 200vh;
  witdh: 50vw;
  text-align: center;
  position: relative;
`;

const WRAP = styled.div`
  margin-left: 10%;
  margin-right: 10%;
  font-family: "Gowun Batang", serif;
  max-width: 80%;
`;

const SButton = styled.button`
  margin-top: 1.5em;
  padding: 1rem 8rem;
  font-size: 40px;
  border-radius: 10px;
  background-color: #fb6b4c;
  border: 0;
  outline: 0;
  color: white;
  font-family: "Gowun Batang", serif;
  font-weight: bold;
`;

const H2 = styled.h2`
  font-size: 50px;
  color: white;
  padding-top: 75%;
  line-height: 120%;
  margin: 0;
  font-weight: bold;
`;

const DIV = styled.div`
  background-image: url("/images/background2.jpg");
  height: 180vh;
  background-size: cover;
  text-align: center;
  line-height: 2em;
  color: white;
  font-size: 25px;
  font-weight: bold;
`;
