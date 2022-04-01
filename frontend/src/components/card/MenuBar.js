import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import html2canvas from "html2canvas";
import { useCallback } from "react";
import { connect } from "react-redux";
import { sendImageURL } from "../../api/message";
import axios from "axios";

function mapStateToProps({ cardReducer }) {
  return {
    card_id: cardReducer.id,
  };
}
export default connect(mapStateToProps)(Menu);

function Menu({ card_id }) {
  const saveCard = useCallback(() => {
    const card = document.getElementById("card");
    html2canvas(card).then(function (canvas) {
      // const url = canvas.toDataURL();
      // console.log(card_id);
      canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);

        const form = new FormData();
        form.append("image", url);
        // const params = {
        //   card_id,
        //   form,
        // };
        // sendImageURL(
        //   params,
        //   (response) => console.log(response),
        //   (error) => console.log(error)
        // );

        axios
          .post(`http://127.0.0.1:8000/api/card/${card_id}/`, form, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => console.log(response))
          .catch((error) => console.log(error));
      });

      // todo: 서버로 이미지 보내기

      // console.log(params);
      // sendImageURL(
      //   params,
      //   (response) => console.log(response),
      //   (error) => console.log(error)
      // );

      // axios
      //   .post(`http://127.0.0.1:8000/api/card/${card_id}/`, form, {
      //     headers: { "Content-Type": "multipart/form-data" },
      //   })
      //   .then((response) => console.log(response))
      //   .catch((error) => console.log(error));
    });
  }, [card_id]);

  return (
    <nav>
      <ul>
        <List onClick={saveCard}>저장</List>
        <List>재생</List>
        <List>
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
