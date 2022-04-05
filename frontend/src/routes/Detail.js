import { getCard } from "../api/message";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

function Detail() {
  const { card_id } = useParams();

  useEffect(() => { 
    getCard(card_id, (response) => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    }
    )
    console.log(card_id);
  }, [card_id]);

  return (
    <div>

      <LOC>
        <Link to='/'>
        <ToMain>처음으로</ToMain>
        </Link>
      </LOC>
       
      <Center>
        <h2>
          메세지결과
          {<video src={`https://localhost3000/card/${card_id}`} />}
          {/* {<video src={`https://j6c202.p.ssafy.io/api/card/${card_id}`} />} */}
        </h2>
      </Center>

      <Center>
        <Link to="/logo512.png" target="_blank" download>Download</Link>
        <CopyToClipboard text={`https://localhost3000/card/${card_id}`}>
        {/* <CopyToClipboard text={`https://j6c202.p.ssafy.io/api/card/${card_id}`}> */}
          <CopyButton>url복사</CopyButton>
        </CopyToClipboard>
      </Center>

      <br />

      <Center>
        <FacebookShareButton style={{ marginRight: "20px" }} url={`https://localhost3000/card/${card_id}`}>
          <FacebookIcon size={48} round={true} borderRadius={24}></FacebookIcon>
        </FacebookShareButton>
        <FacebookMessengerShareButton style={{ marginRight: "20px" }} url={`https://localhost3000/card/${card_id}`}>
          <FacebookMessengerIcon size={48} round={true} borderRadius={24}></FacebookMessengerIcon>
        </FacebookMessengerShareButton>
        <TwitterShareButton style={{ marginRight: "20px" }} url={`https://localhost3000/card/${card_id}`}>
          <TwitterIcon size={48} round={true} borderRadius={24}></TwitterIcon>
        </TwitterShareButton>
        <LineShareButton style={{ marginRight: "20px" }} url={`https://localhost3000/card/${card_id}`}>
          <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
        </LineShareButton>
        <EmailShareButton style={{ marginRight: "20px" }} url={`https://localhost3000/card/${card_id}`}>
          <EmailIcon size={48} round={true} borderRadius={24}></EmailIcon>
        </EmailShareButton>

      </Center>
    </div>
  );
}

export default Detail;

const ToMain = styled.button `
  border: none;
  width: 80px;
  margin-top: 0.5rem;
  margin-right : 0.5rem;
  height: 30px;
  border-radius: 10px;
  background-color: #e7e7e7;
  box-shadow: 3px 3px #EDB949;
  font-family:"Gowun Batang";
  font-weight: bold;
  font-size:10pt;
  justify-content:right;
`

const LOC = styled.div `
  justify-content:right;
  display: flex;
`

const CopyButton = styled.button `
  border: none;
  width: 80px;
  height: 30px;
  margin : 1.5rem;
  border-radius: 10px;
  background-color: #64B998;
  box-shadow: 3px 3px #EDB949;
  font-family:"Gowun Batang";
  font-weight: bold;
  font-size:10pt;
`

const Center = styled.div `
  justify-content: center;
  display: flex;
  align-items: center;
`
