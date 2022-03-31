import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
  // 클릭하면 페이지이동
  const handleClick = () => {
    window.location.href = "/"
  }
  // id마다 결과페이지(아직 json이 없음)
  const { card_id } = useParams();
  const getResult = async () => {
    const json = await (
      await fetch(`https://localhost3000/card/${card_id}`)
    ).then((response) => response.json());
    console.log(json);
  };
  console.log(card_id);
  useEffect(() => {
    getResult();
  }, []);
  return (
    <div>
      <button onClick={handleClick}>처음으로</button>
      <h2>메세지결과</h2>
      <Link to="/logo512.png" target="_blank" download>Download</Link>
      <CopyToClipboard text={`https://localhost3000/card/${card_id}`}>
        <button>url복사</button>
      </CopyToClipboard>
      <br />
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
    </div>
  );
}

export default Detail;