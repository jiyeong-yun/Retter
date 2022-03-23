import { useState, useEffect } from 'react';
import Modal from '../components/Modal';
import Button from '../components/button';
import { useCookies } from "react-cookie";

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
    <div>
      <div className='Modal'>
        <button onClick={handleClickModal}>튜토리얼</button>
        <Modal setCookie={setCookie}
          isOpen={isRemember}
          // onSubmit={handleModalSubmit} 
          onCancel={handleModalCancel}
        />
      </div>
      <br />
      
      <div>
      <Button onClick={handleClickRecord}>내 목소리로 카드 만들기</Button>
      <br />
      <Button onClick={handleClickCard}>다른 목소리로 카드 만들기</Button>
      </div>
    </div>
  )
}
export default Select;