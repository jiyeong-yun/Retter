import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import "../index.css";
import { Link } from "react-router-dom";
import { setTitle } from "../components/Title";

function Select() {
  useEffect(() => setTitle("목소리 선택"), []);
  // 모달생성 처음에 바로 뜨려면 true, 체크하면 오늘 하루 보지 않기
  const [cookies, setCookie] = useCookies(["noneModal"]);
  const [isRemember, setRemember] = useState(true);
  const handleClickModal = () => setRemember(true);
  const handleModalCancel = () => setRemember(false);

  useEffect(() => {
    if (cookies.noneModal !== undefined) {
      setRemember(false);
    }
  }, [cookies.noneModal]);

  return (
    <Container>
      <div className="Modal">
        {/* <button onClick={handleClickModal}>튜토리얼</button> */}
        <Modal
          setCookie={setCookie}
          isOpen={isRemember}
          // onSubmit={handleModalSubmit}
          onCancel={handleModalCancel}
        />
      </div>
      <br />

      <CONTENT>
        <div>
          카드에 넣을 목소리를 <br /> 골라주세요!
        </div>
      </CONTENT>

      <div>
        <BUTTONS>
          <Link to="/record">
            <Button1 color="#64B998">내 목소리로 카드 만들기</Button1>
          </Link>
          <br />
          <Link to="/card">
            <Button1 color="#FB6B4C">다른 목소리로 카드 만들기</Button1>
          </Link>
        </BUTTONS>
      </div>
    </Container>
  );
}
export default Select;

// background-color: ${props => props.color}

const Container = styled.main`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button1 = styled.button`
  border: none;
  width: 240px;
  height: 100px;
  padding: 1rem 1.5rem;
  margin: 1.5rem;
  border-radius: 10px;
  background-color: ${(props) => props.color};
  box-shadow: 5px 5px #edb949;
  font-family: "gowun";
  font-size: 13pt;
  color: #8b4513;
`;

const CONTENT = styled.div`
  padding-bottom: 2rem;
  font-size: 19pt;
  font-family: "gowun";
  text-align: center;
  min-width: 230px;
  line-height: 2rem;
`;

const BUTTONS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
