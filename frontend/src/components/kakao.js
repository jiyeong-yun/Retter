import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const KakaoShare= () => {
  // const url = window.location.href; //현재 url가져오기
  const { card_id } = useParams();
  const url = `http://localhost:3000/card/${card_id}`; //현재 url가져오기
  useEffect(() => {
    initKakao(); //
  }, []);

  //자바스크립트키로 카카오 init
  const initKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(process.env.REACT_APP_KAKAO_KEY);
      }
    }
  };

  //버튼을 누르면 실행되는 함수
  const shareKakao = () => {
    //sendDefault 살펴보기
    window.Kakao.Link.sendDefault({ 
      objectType: 'feed',
      content: {
        title: 're:tter',
        description: '#retter #편지 #목소리',
        imageUrl: 'http://mud-kage.kakao.co.kr/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      social: {
        likeCount: 286,
        commentCount: 45,
        sharedCount: 845,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
        {
          title: '앱으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
   
        <div className="share-node" onClick={shareKakao}>
            <img src="이미지" alt="카카오공유" />
            <p>카톡</p>
        </div>
  );
};

export default KakaoShare;