import ReactModal from "react-modal";
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Button from '../components/button';


function Modal({ isOpen, onSubmit, onCancel, className, visible, children }){
  const content = [
    {
      tab: "텍스트",
      content: "텍스트입력"
    },
    {
      tab: "스티커",
      content: "스티커꾸미기"
    },
    {
      tab: "배경",
      content: "배경색고르기"
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

  const [selCheck, setSelCheck] = useState(false);
  const onCheck = () => {
    setSelCheck(!selCheck);
  };

  const handleClickSubmit = () => {
    onSubmit();
  };
  const handleClickCancel = () => {
    onCancel();
  };

  // 우선은 esc나 빈칸눌러도 닫히게 함. key는 여기가 맞나..?
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onCancel}>
      <ModalOverlay visible={visible} />
      <div className="Home">
        {content.map((section, index) => (
          <Button onClick={() => changeItem(index)} key={index}>{section.tab}</Button>
        ))}
        <div>{currentItem.content}</div>
        <button onClick={onCheck}>{selCheck ? 'Checked' : '오늘 하루 열지 않기'}</button>
        <Button primary onClick={handleClickSubmit}>확인</Button>
        <Button color="white" background="blue" onClick={handleClickCancel}>닫기</Button>
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