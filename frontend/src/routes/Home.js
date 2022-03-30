import { useEffect, useState, useRef } from 'react';
import Button from '../components/button';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init();

function Home() {
  // 클릭하면 페이지이동
  const handleClick = () => {
    window.location.href = "/select"
  }

  // 스크롤 생성, 버튼변화는 css적용해야
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  // 100 초과하면 버튼에 스크롤 따라오게
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if(ScrollY > 100) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  }
  // 맨위 0으로 올라오게
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    setScrollY(0);
    setBtnStatus(false);
  }

  useEffect(() => {
    const watch = () => {
      window.addEventListener('scroll', handleFollow)
    }
    watch();
    return () => {
      window.removeEventListener('scroll', handleFollow)
    }
  })

  // 로고 효과
  const useFadeIn = (duration = 1, delay = 0) => {
    const element = useRef();
    useEffect(() => {
      if (typeof duration !== "number" || typeof delay !== "number") {
        return;
      }
      if (element.current) {
        const { current } = element;
        current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
        current.style.opacity = 1;
      }
    }, []);
    return { ref: element, style: { opacity: 0 } };
  };
  const fadeInH1 = useFadeIn(3, 1);

  // 서비스 설명 박스로 할 경우
  let boxStyle = {
    width: '40%',
    height: '200px',
    fontSize: '20px',
    lineHeight: '200px',
    background: 'darkblue',
    color: 'white',
    textAlign: 'center'
  }

  useEffect(() => {
      AOS.init({
          duration : 1000
      });
  });

  
  return (
    <>
    <div className='wrap'>
      <h1 {...fadeInH1}>Re:tter</h1>
      <div
        data-aos="fade-right"
        data-aos-offset="600"
        data-aos-easing="ease-in-sine"
      >
        <br />
        <div>소중한 사람들에게 마음을 전해요.</div>
        <br />
      </div>

      <Button primary onClick={handleClick}>Let's Continue</Button>
      
      <div>
        <div style={{height: '500px'}}></div>
        <div>
          <p data-aos="fade-right">코로나 19로 사회적 거리두기가 강화되면서</p>
          <br />
          <p data-aos="fade-right">마음의 거리두기도 진행되고 있는 지금...</p>
          <br />
          <p data-aos="fade-right">글로만 전하기에는 딱딱하기만 한 마음을</p>
          <br />
          <p data-aos="fade-right">여러가지 목소리와 함께 전해보세요</p>
          <br />
          <p data-aos="fade-right">편지의 감성과 최신 기술을 이용해</p>
          <br />
          <p data-aos="fade-right">나만의 카드를 만들어 보세요!</p>
        </div>

        <div style={boxStyle} data-aos="fade-up">
          <p>간지나는 푸터?</p>
        </div>

      </div>
        <button background="black" size="small" className={BtnStatus ? "topBtn active" : "topBtn"} onClick={handleTop}>TOP</button>
      </div>
    </>
  );
}

export default Home;