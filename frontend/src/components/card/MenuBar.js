import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import html2canvas from "html2canvas";
import { useCallback } from "react";
import { connect } from "react-redux";
import { sendImageURL } from "../../api/message";
import { useNavigate } from "react-router-dom";

function mapStateToProps({ cardReducer }) {
  return {
    card_id: cardReducer.id,
  };
}
export default connect(mapStateToProps)(Menu);

function Menu({ card_id }) {
  const navigate = useNavigate();
  const saveCard = useCallback(() => {
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

  const deleteCard = useCallback(() => {}, []);

  return (
    <nav>
      <ul>
        <List onClick={saveCard}>저장</List>
        <List>재생</List>
        <List onClick={deleteCard}>
          <ArrowBackIosRoundedIcon />
        </List>
      </ul>
    </nav>
  );
}

const List = styled.li`
  list-style: none;
  cursor: pointer;
`;
