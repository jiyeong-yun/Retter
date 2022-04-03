import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import html2canvas from "html2canvas";
import { useCallback, useRef, useState } from "react";
import { connect } from "react-redux";
import { sendImageURL, deleteCard } from "../../api/message";
import { setCardID } from "../../store/actions/cardActions";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../api/index";

function mapStateToProps({ cardReducer }) {
  return {
    card_id: cardReducer.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCardID: (id) => dispatch(setCardID(id)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);

function Menu({ card_id, setCardID }) {
  const navigate = useNavigate();
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);

  const saveCard = useCallback(() => {
    // 음성을 생성하지 않았을 경우 return
    if (!card_id) return;

    // card를 이미지로 변환
    const card = document.getElementById("card");
    html2canvas(card).then(function (canvas) {
      canvas.toBlob(function (blob) {
        const file = new File([blob], "card.png", {
          lastModified: new Date().getTime(),
          type: "image/png",
        });

        // 만든 카드 이미지를 서버에 전송
        const form = new FormData();
        form.append("image", file);
        const params = {
          card_id,
          form,
        };
        sendImageURL(
          params,
          (response) => {
            navigate(`/card/${card_id}`);
          },
          (error) => {
            console.log(error);
            alert("카드 변환 중 에러가 발생했습니다. 다시 시도해주세요.");
          }
        );
      }, "image/png");
    });
  }, [card_id, navigate]);

  const goMain = useCallback(() => {
    if (
      window.confirm(
        "메인으로 돌아가면 현재까지 편집한 카드가 삭제돼요. 괜찮으시겠어요?"
      )
    ) {
      if (card_id) {
        deleteCard(
          card_id,
          (response) => {
            console.log(response);
            setCardID("");
            navigate(`/`);
          },
          (error) => {
            console.log(error);
            alert("카드 삭제에 실패했습니다. 다시 시도해 주세요.");
          }
        );
      }
    }
  }, [card_id, setCardID, navigate]);

  const controlAudio = useCallback(() => {
    // 음성을 생성하지 않았을 경우 return
    if (!card_id) return;

    const audio = audioRef.current;
    if (audio.paused || audio.ended) {
      setIsPlaying(true);
      audio.play();
    }
    else {
      audio.pause();
    }
  }, []);

  const stopAudio = useCallback(() => {
    setIsPlaying(false);
  }, []);


  return (
    <nav>
      <ul>
        <List onClick={saveCard} disabled={card_id ? false : true}>저장</List>
        <List onClick={controlAudio} >{card_id ? (isPlaying ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />) : "로딩중.."}</List>
        <List onClick={goMain}>
          <ArrowBackIosRoundedIcon />
        </List>
      </ul>
      {card_id ? <audio src={`${BACKEND_URL}/media/${card_id}/${card_id}.wav`} ref={audioRef} onPlay={() => setIsPlaying(true)} onPause={stopAudio} onEnded={stopAudio} /> : null}

    </nav>
  );
}

const List = styled.li.attrs((props) => ({
  style: {
    color: props.disabled ? "lightgray" : "black",
  }
}))`
  list-style: none;
  cursor: pointer;
`;
