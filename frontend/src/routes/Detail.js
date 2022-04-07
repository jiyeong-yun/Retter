import { getCard } from "../api/message";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BACKEND_URL, BACKEND_API_URL } from "../api/index";

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { setTitle } from "../components/Title";
// import KakaoShare from "../components/kakao";

function Detail() {
  useEffect(() => setTitle("移대뱶 蹂닿린?뮉"), []);
  const { card_id } = useParams();
  const [video, setVideo] = useState();

  useEffect(() => {
    getCard(
      card_id,
      ({ data }) => {
        // console.log(data);
        setVideo(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [card_id]);


  useEffect(() => {
    initKakao();
  }, []);

  //?먮컮?ㅽ겕由쏀듃 ?ㅻ줈 移댁뭅??init
  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
        // console.log(kakao.isInitialized());
      }
    }
    window.Kakao.Link.createCustomButton({
      container: '#kakao-link-btn',
      //硫붿떆吏 ?쒗뵆由??꾩씠?? [???좏뵆由ъ??댁뀡 > 移댁뭅?ㅻ쭅??> 硫붿떆吏 ?쒗뵆由??먯꽌 ?뺤씤
      templateId: 74531,
      templateArgs: {
        //硫붿떆吏 ?쒗뵆由우뿉???쒖슜??arguments
        url: `https://j6c202.q.ssafy.io/card/`,
        key: card_id
      },
    });
  };

  const onShareKakaoClick = () => {
    Detail(card_id);
  };

  return (
    <div>
      <LOC>
        <Link to="/">
          <ToMain>泥섏쓬?쇰줈</ToMain>
        </Link>
      </LOC>

      <Center>
        {video ? (
          <video controls src={`${BACKEND_API_URL}/${video}`}></video>
        ) : null}
      </Center>

      <Center>
        {/* <Link to={new URL(`${BACKEND_URL}/${video}`)} target="_blank" download>
          Download
        </Link> */}
        <button
          id="kakao-link-btn"
          type="button"
          onClick={onShareKakaoClick}
        >
          <img src="/images/kakao.png" alt="移댄넚怨듭쑀" />
        </button>
        {/* <KakaoShare /> */}
        <CopyToClipboard text={`https://j6c202.q.ssafy.io/card/${card_id}`}>
          <CopyButton>url蹂듭궗</CopyButton>
        </CopyToClipboard>
      </Center>

      <br />

      <Center>
        <FacebookShareButton
          style={{ marginRight: "20px" }}
          url={`https://j6c202.q.ssafy.io/card/${card_id}`}
        >
          <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
        </FacebookShareButton>
        <FacebookMessengerShareButton
          style={{ marginRight: "20px" }}
          url={`https://j6c202.q.ssafy.io/card/${card_id}`}
        >
          <FacebookMessengerIcon
            size={48}
            round={true}
            borderRadius={24}
          ></FacebookMessengerIcon>
        </FacebookMessengerShareButton>
        <TwitterShareButton
          style={{ marginRight: "20px" }}
          url={`https://j6c202.q.ssafy.io/card/${card_id}`}
        >
          <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
        </TwitterShareButton>
        <LineShareButton
          style={{ marginRight: "20px" }}
          url={`https://j6c202.q.ssafy.io/card/${card_id}`}
        >
          <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
        </LineShareButton>
        <EmailShareButton
          style={{ marginRight: "20px" }}
          url={`https://j6c202.q.ssafy.io/card/${card_id}`}
        >
          <EmailIcon size={48} round={true} borderRadius={24}></EmailIcon>
        </EmailShareButton>
      </Center>
    </div>
  );
}

export default Detail;

const ToMain = styled.button`
  border: none;
  width: 80px;
  margin: 1rem;
  height: 30px;
  border-radius: 10px;
  background-color: #e7e7e7;
  box-shadow: 3px 3px #edb949;
  font-family: "gowun";
  font-size: 10pt;
  justify-content: right;
`;

const LOC = styled.div`
  justify-content: right;
  display: flex;
`;

const CopyButton = styled.button`
  border: none;
  width: 80px;
  height: 30px;
  margin: 1.5rem;
  border-radius: 10px;
  background-color: #64b998;
  box-shadow: 3px 3px #edb949;
  font-family: "gowun";
  font-size: 10pt;
`;

const Center = styled.div`
  justify-content: center;
  display: flex;
  align-items: center;
`;
