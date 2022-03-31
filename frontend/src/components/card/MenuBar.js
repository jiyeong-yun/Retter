import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import html2canvas from "html2canvas";
import { useCallback } from "react";

export default function Menu() {
  const saveCard = useCallback(() => {
    const card = document.getElementById("card");
    html2canvas(card).then(function (canvas) {
      const URL = canvas.toDataURL();
      console.log(URL);
      // todo: 서버로 이미지 보내기
    });
  }, []);

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
