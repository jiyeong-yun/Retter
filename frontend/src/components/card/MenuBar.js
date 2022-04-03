import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import html2canvas from "html2canvas";
import { useCallback } from "react";
import { connect } from "react-redux";
import { sendImageURL, deleteCard } from "../../api/message";
import { setCardID } from "../../store/actions/cardActions";
import { useNavigate } from "react-router-dom";

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
  const saveCard = useCallback(() => {
    if (!card_id) return;

    const card = document.getElementById("card");
    html2canvas(card).then(function (canvas) {
      canvas.toBlob(function (blob) {
        const file = new File([blob], "card.png", {
          lastModified: new Date().getTime(),
          type: "image/png",
        });

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

  return (
    <nav>
      <ul>
        <List onClick={saveCard} disabled={card_id ? false : true}>저장</List>
        <List>재생</List>
        <List onClick={goMain}>
          <ArrowBackIosRoundedIcon />
        </List>
      </ul>
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
