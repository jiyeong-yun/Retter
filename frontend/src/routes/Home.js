import { useEffect, useState, useRef } from 'react';
import Result from '../components/Result';
import Modal from '../components/Modal';
import { useCookies } from "react-cookie";
import Button from '../components/button';

function Home() {
  
  // 처음에 모달 바로 뜨고, 체크하고 닫으면 안 뜨게
  const [isRemember, setRemember] = useState(true);
  const [cookies, setCookie] = useCookies(["noneModal"]);

  useEffect(() => {
    if (cookies.noneModal !== undefined){
      setRemember(false);
    }
  },[]);
  
  const handleClickModal = () => setRemember(true);
  // const handleModalSubmit = () => setRemember(false);
  const handleModalCancel = () => setRemember(false);

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

    <div className='wrap'>
      <h1 {...fadeInH1}>Re:tter</h1>
      <Button primary onClick={handleClick}>시작하기</Button>
      <div className="inner">
      ## TACOTRON2

Attention 기반 Seq-to-Seq  TTS 모델 구조 제시

End-to-End 모델 : (문장, 음성) 쌍으로 이루어진 데이터만으로 별도의 작업없이 학습 가능

음성 합성 품질 테스트(MOS)에서 높은 점수 획득



TTS를 두단계로 나누어 처리

- Task1 : 텍스트로부터 Mel-spectrogram을 생성하는 단계
  - Sequence to Sequence 딥러닝 구조의 타코트론2 모델이 담당
- Task2 : Mel-spectrogram으로부터 음성을 합성하는 단계
  - Vocoder로 불리며 WaveNet 모델을 변형하여 사용



### **1 타코트론2 (Seq2Seq)**

input은 character, output은 mel-Spectrogram

모델

Encoder : character를 일련 길이의 hidden벡터(feature)로 변환

Attention : Encoder에서 생성된 일정길이의 hidden벡터로부터 시간순서에 맞게 정보를 추출해 Decoder에 전달

Decoder : Attention에서 얻은 정보를 이용해 mel-spectrogram을 생성



#### **1.1 전처리**

모델을 학습하기 위해 input과 output(label)이 한쌍으로 묶인 데이터 필요

영어라면 띄어쓰기 포함해 알파벳으로 나누는 작업, 한글이라면 자소(자음, 모음) 단위로 초성(19개), 중성(21개), 종성(27개)을 다르게 처리해 텍스트를 character로 변경할 수 있음

이후 one-hot encodding을 적용하여 character sequence를 정수열로 변경한 뒤 모델의 input으로 활용

3가지 전처리 작업 필요 (음성데이터로부터 mel-spectrogram을 추출하여 output으로 활용하기 위해)

1. Short-time Fourier Transform(STFT)
   - 오디오데이터에는 여러개의 오디오(frequency)가 섞여 있으므로 여러개의 오디오를 분리하여 표시하기 위해 Fourier transform을 활용
   - 모든 데이터에 Fourier transform을 적용하면 시간에 따른 오디오의 변화를 반영할 수 없으므로 sliding window를 이용하여 오디오를 특정길이로 잘라 Fourier Transform을 적용
   - 이 결과물을 spectrogram이라고 하며 오디오로부터 spectrogram을 만드는 과정을 short-time Fourier Transform이라고 지칭
2. 80개의 mel filterbank를 이용하여 Mel scaling
   - spectrogram에 mel-filter bank라는 비선형 함수를 적용하여 저주파(low frequency)영역을 확대
   - 사람의 귀에 맞게 저주파의 영역을 확대하고 고주파의 영역을 축소하여 feature로 사용
   - 더 명료한 음성을 생성하기 위하여 feature를 사람이 쉽게 인지 가능한 scale로 변환하는 작업
3. Log trnasform
   - log를 취해 amplitude 영역에서의 log scaling을 진행하면 mel-spectrogram이 생성되며 모델의 output(label)으로 활용



#### **1.2 Encoder**

Encoder는 character 단위의 one-hot verctor를 encoded feature로 변환하는 역할

Character Embedding, 3 Convolution Layer, Bidirectional LSTM으로 구성

input으로 one-hot vector로 변환된 정수열이 들어오면 Embedding matrix를 통해 512차원의 embedding vector로 변환

embedding vecotor는 3개의 conv-layer(1d convolution layer + batch norm)를 지나 bi-LSTM layer로 들어가서 encoded feature로 변환



####  **1.3 Attention**

Attention은 매 시점 Deocder에서 사용할 정보를 Encoder에서 추출하여 가져오는 역할

Attention Mechanism은 Encoder의 LSTM에서 생성된 feature와 Decoder의 LSTM에서 전 시점에서 생성된 feature를 이용하여 Encoder로부터 어떤 정보를 가져올지 alignment하는 과정

타코트론2 모델은 Additive attention mechanism([Bandau Attention](https://joungheekim.github.io/2020/10/08/paper-review/(https://hcnoh.github.io/2018-12-11-bahdanau-attention)))에 attention alignment 정보를 추가한 형태인 [Location Sensitive Attention](https://paperswithcode.com/method/location-sensitive-attention#)을 사용



#### **1.4 Decoder**

Decoder는 Attention을 통해 얻은 alignment feature와 이전 시점에서 생성된 mel-spectrogram 정보를 이용하여 다음 시점 mel-spectrogram을 생성하는 역할

Pre-Net, Decoder LSTM, Projection Layer, Post-Net으로 구성

- Pre-Net은 2개의 Fully Connected Layer(256 dim) + ReLU으로 구성
  - 이전 시점에서 생성된 mel-spectrogram이 decoder의 input으로 들어오면 가장 먼저 Pre-Net을 통과
  - Pre-Net은 bottle-neck 구간으로써 중요 정보를 거르는 역할

- Decoder LSTM은 2개의 uni-directional LSTM Layer(1024 dim) 으로 구성
  - Pre-Net을 통해 생성된 vector와 이전 시점(t−1)에서 생성된 context vector(ct−1)를 합친 후 Decoder LSTM을 통과

  - Decoder LSTM은 Attention Layer의 정보와 Pre-Net으로부터 생성된 정보를 이용하여 특정 시점(t)에 해당하는 정보를 생성

  - Decoder LSTM에서 생성된 매 시점(t) vector는 두개로 분기되어 처리

    1. 종료 조건의 확률을 계산하는 경로
       1. 종료 조건의 확률을 계산하는 경로는 Decoder LSTM으로부터 매 시점 생성된 vector를 Fully Connected layer를 통과시킨 후 sigmoid 함수를 취하여 0에서 1사이의 확률로 변환 (Stop 조건에 해당)
       2. 사용자가 설정한 threshold를 넘을 시 inference 단계에서 mel-spectrogram 생성을 멈추는 역할

    2. mel-spectrogram을 생성하는 경로
       1. mel-spectrogram을 생성하는 경로는 Decoder LSTM으로부터 매 시점 생성된 vector와 Attention에서 생성된 context vector를 합친 후 Fully Connected Layer를 통과
       2. 이렇게 생성된 mel-vector는 inference 단계에서 Decoder의 다음 시점의 input이 됨

- Post-Net은 5개의 1D Convolution Layer로 구성
  - Convolution Layer는 512개의 filter와 5×1 kernel size를 가지고 있음
  - 이전 단계에서 생성된 mel-vector는 Post-Net을 통과한 뒤 다시 mel-vector와 구조(Residual Connection)
  - Post-Net은 mel-vector를 보정하는 역할을 하며 타코트론2 Task1의 최종 결과물인 mel-spectrogram의 품질을 높이는 역할



#### **1.5 타코트론2 Loss**

타코트론2로부터 생성된 mel-spectrogram과 실제 mel-spectrogram의 MSE(mean squared error)를 이용하여 모델을 학습



### **2 WaveNet Vocoder**

Vocoder는 mel-spectrogram으로부터 waveform(음성)을 생성하는 모듈을 의미

타코트론2 논문에서는 WaveNet의 구조를 조금 변경한 모델을 Vocoder로 사용

[WaveNet 논문](https://arxiv.org/abs/1609.03499)에서 제시한 모델은 Softmax 함수를 이용하여 매 시점 −215 ~ 215+1 사이의 숫자가 나올 확률을 추출하고 waveform 생성

이를 수정하여 PixelCNN++ 처럼 [mixture of logistic distribution(MoL)](https://medium.com/@smallfishbigsea/an-explanation-of-discretized-logistic-mixture-likelihood-bdfe531751f0)을 이용하여 매 시점 −215 ~ 215+1 사이의 숫자가 나올 확률을 생성

mel-spectrogram을 이용하여 WaveNet은 MOL에 사용할 paramter를 생성

생성된 paramter를 이용하여 −215 ~ 215+1 사이의 숫자가 나올 확률인 mixture of logistic distribution를 생성하고 가장 큰 확률을 갖고 있는 값을 이용하여 waveform을 생성



#### **2.1 WaveNet Loss**

WaveNet으로부터 생성된 waveform과 실제 waveform의 시점 별 Negative log-likelihood Loss를 이용하여 모델을 학습



#### **학습설정**

타코트론2, WaveNet(MoL)을 학습할 때 teacher-forcing을 사용

타코트론2은 이전 시점에 생성된 mel-spectrogram과 encoder featrure를 이용하여 다음 시점 mel-spectrogram을 생성

training 단계에는 input을 이전 시점 타코트론2로부터 생성된 mel-spectrogram을 사용하지 않고 ground-truth mel-spectrogram을 사용하여 학습 효율을 증가

WaveNet을 학습할 때에도 input으로 WaveNet의 이전단계에서 생성된 waveform을 사용하는 것이 아닌 ground-truth waveform을 이용





_참고_

타코트론2 논문 https://arxiv.org/abs/1712.05884v2

논문리뷰 https://joungheekim.github.io/2020/10/08/paper-review/

한국어TTS시스템 https://sooftware.io/korean_tacotron2/

파이토치 https://pytorch.org/hub/nvidia_deeplearningexamples_tacotron2/

        <button className={BtnStatus ? "topBtn active" : "topBtn"} onClick={handleTop}>TOP</button>
      </div>
    </div>
    </div>
  );
}

export default Home;