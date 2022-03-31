import styled from "styled-components";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
export default function Menu() {
  return (
    <nav>
      <ul>
        <List>저장</List>
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
