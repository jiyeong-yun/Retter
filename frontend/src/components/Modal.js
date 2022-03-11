import ReactModal from "react-modal";
import React, { useState } from 'react';

const Modal = ({ isOpen, onSubmit, onCancel }) => {
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

  // 우선은 esc나 빈칸눌러도 닫히게 함
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onCancel}>
      <div className="Home">
        {content.map((section, index) => (
          <button onClick={() => changeItem(index)}>{section.tab}</button>
        ))}
        <div>{currentItem.content}</div>
      </div>
      <div>
        <button onClick={onCheck}>{selCheck ? 'Checked' : '오늘 하루 열지 않기'}</button>
        <button onClick={handleClickSubmit}>확인</button>
        <button onClick={handleClickCancel}>닫기</button>
      </div>
    </ReactModal>
  );
};

export default Modal;