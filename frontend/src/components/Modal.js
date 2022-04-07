import ReactModal from "react-modal";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/button';
import { useCookies } from "react-cookie";

function Modal({ isOpen, onSubmit, onCancel, visible }){
  const content = [
    {
      tab: "내 목소리로 카드 만들기",
      content: <img src='/images/record.png'/>
    },
    {
      tab: "다른 목소리로 카드 만들기",
      content: <img src='/images/text.png'/>
    },
    {
      tab: "카드 꾸미기",
      content: <img src='/images/preview.png'/>
    },
  ];

  const useTabs = (initialTab, allTabs) => {
    const [currentIndex, setCurrentIndex] = useState(initialTab);
    if (!allTabs || !Array.isArray(allTabs)) {
      return;
    };
    return {
      currentItem: allTabs[currentIndex],
      changeItem: setCurrentIndex
    };
  };

  const { currentItem, changeItem } = useTabs(0, content);

  // const [selCheck, setSelCheck] = useState(false);
  // const onCheck = () => {
  //   setSelCheck(!selCheck);
  // };

  // const handleClickSubmit = () => {
  //   onSubmit();
  // };
  const handleClickCancel = () => {
    onCancel();
  };

  // 체크시 오늘 하루 열지 않기 쿠키적용
  const [isRemember, setRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["noneModal"]);
  let now = new Date;
  let after1m = new Date();

  useEffect(() => {
    if(cookies.noneModal !== undefined){
      setRemember(true);
    }
  }, []);
  // console.log(cookies.noneModal);

  // 1분으로 했는데 이건 적용 안된듯ㅜ
  const handleOnChange = (e) => {
    after1m.setMinutes(now.getMinutes() +1);
    setRemember(e.target.checked);
    if(e.target.checked){
      setCookie('noneModal', {path:'/', expires:after1m});
      console.log(after1m);
    } else {
      removeCookie('noneModal');
      console.log({expires:after1m});
    }
  }


  // 우선은 esc나 빈칸눌러도 닫히게 함. key는 여기가 맞나..?
  return (
    <ReactModal setCookie={setCookie} isOpen={isOpen} onRequestClose={onCancel}>
      <ModalOverlay visible={visible} />
      <div className="Home">
        {content.map((section, index) => (
          <Button onClick={() => changeItem(index)} key={index}>{section.tab}</Button>
        ))}
        <div>{currentItem.content}</div>
        <input type="checkBox" onChange={handleOnChange} checked={isRemember} />오늘 하루 열지 않기
        {/* <button onClick={onCheck}>{selCheck ? 'Checked' : '오늘 하루 열지 않기'}</button> */}
        {/* <Button color="white" background="blue" onClick={handleClickSubmit}>확인</Button> */}
        <button onClick={handleClickCancel}>닫기</button>
      </div>
    </ReactModal>
  );
};

// 모달 스타일 예시
Modal.propTypes = {
  visible: PropTypes.bool,
}

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px 20px;
  background-color: #fff;
  border-radius: 10px;
  width: 360px;
  max-width: 480px;
`

export default Modal;