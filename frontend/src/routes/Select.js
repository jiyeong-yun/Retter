import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
// import Button from '../components/button';
import { useCookies } from "react-cookie";
import styled from "styled-components";
import '../index.css';
import { AlignVerticalCenter } from '@mui/icons-material';

function Select() {

    // 모달생성 처음에 바로 뜨려면 true, 체크하면 오늘 하루 보지 않기
    const [cookies, setCookie] = useCookies(["noneModal"]);
    const [isRemember, setRemember] = useState(true);
    const handleClickModal = () => setRemember(true);
    const handleModalCancel = () => setRemember(false);
    
    useEffect(() => {
      if (cookies.noneModal !== undefined){
        setRemember(false);
      }
    },[]);
  
  // 녹음과 텍스트 선택해 클릭하면 페이지이동
  const handleClickRecord = () => {
    window.location.href = "/record"
  }
  const handleClickCard = () => {
    window.location.href = "/card"
  }

  return (
    <div style={{height:'100vh',width:'100vw'}}>
      <div className='Modal'>
        <button onClick={handleClickModal}>튜토리얼</button>
        <Modal setCookie={setCookie}
          isOpen={isRemember}
          // onSubmit={handleModalSubmit} 
          onCancel={handleModalCancel}
        />
      </div>
      <br />

      <CONTENT>
        <div>카드에 넣을 목소리를 <br/> 골라주세요!</div>
      </CONTENT>

      <div>
        <BUTTONS>
          <Button1 color="#64B998" onClick={handleClickRecord}>내 목소리로 카드 만들기</Button1>
          <br />
          <Button1 color="#FB6B4C" onClick={handleClickCard}>다른 목소리로 카드 만들기</Button1>
        </BUTTONS>
      </div>

    </div>
  )
}
export default Select;

// background-color: ${props => props.color}

const Button1 = styled.button `
  border: none;
  width: 240px;
  height: 100px;
  padding : 1rem 1.5rem;
  margin : 1.5rem ;
  border-radius: 10px;
  background-color: ${props => props.color};
  box-shadow: 5px 5px #EDB949;
  font-family:"gowun";
  font-size:13pt;
`;

const Button2 = styled.button `
  border: none;
  width: 240px;
  height: 100px;
  padding : 1rem 1.5rem;
  margin : 1rem;
  border-radius: 10px;
  background-color: ${props => props.color};
`;

const CONTENT = styled.div `
  padding: 3em;
  font-size: 19pt;
  font-family:"gowun";
  text-align:center;
  min-width: 230px;
`

const BUTTONS = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
`