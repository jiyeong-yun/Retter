import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';

const KakaoShare= () => {
  // const url = window.location.href; //현재 url가져오기
  const { card_id } = useParams();
  const url = `https://j6c202.q.ssafy.io/card/${card_id}`;
  console.log(url);
  useEffect(() => {
    initKakao(); //
  }, []);

  //자바스크립트 키로 카카오 init
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
        likeCount: 202,
        commentCount: 48,
        sharedCount: 7942,
      },
      buttons: [
        {
          title: '받은 메시지 확인하기',
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
      <img src="/images/kakao.png" alt="카톡공유" />
    </div>
  );
};

export default KakaoShare;