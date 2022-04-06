# 카드 에디터 구현

> div냐 canvas냐 그것이 문제로다!

- Re:tter의 핵심 기능인 카드 에디터를 구현하기 위해 여러 방법들을 찾아보았다.

## 1. DOM에 직접 구현하기 (div)

```html
<div id="card">
  <div id="text">text</div>
  <img src="" />
  ...
</div>
```

- 가장 먼저 떠오른 방법은 div로 직접 구현하는 방법이었다.
- `eventListener`랑 `CSS` 속성으로 구현할 수 있을 것 같았다!
- 어라.. 근데 **이미지 추출은 어떻게 하지...**

## 2. div를 이미지로: `html2canvas`

- 구글링을 해 보니 `html2canvas`라는 라이브러리를 사용하면 div를 image로 캡쳐할 수 있다고 한다.
- 예제들이 201X년이라 패키지 설치가 아니라 스크립트를 다운받아 불러오는 방법이었다.
  - 이건 좀 아닌 것 같은데... 너무 옛날 거 같은데...
  - 음.. 라이브러리 안 쓰고도 할 수 있는 방법이 있을 것 같은데...
  - 좀 더 나은 방법이 있지 않을까 싶어서 추가로 알아보기로 함.

## 3. HTML5 Canvas API

- `HTML5 Canvas API`를 사용하면 캔버스 안의 상태를 저장하거나, `base64`, `blob` 형태로 이미지를 저장할 수 있다는 얘기를 보고 공부함.
- [MDN Canvas 튜토리얼](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API/Tutorial)을 쭉 읽었다.
- 카드 에디터에서는 각 elements들의 빈번한 조작(이동, 회전, 추가, 삭제 등)이 일어나는데, canvas로는 적합하지 않다고 함
  - 웹 그림판, 복잡한 애니메이션으로는 적합한 모양
- 또, 이렇게 잦은 캔버스 갱신이 일어나면 성능 저하 문제도 있다.
  - 성능 문제를 해결하기 위해 canvas를 여러 개로 쪼개거나 `OffscreenCanvas`를 사용해야 한다는데, 이렇게 되면 `결국 div를 이미지로 추출해야 해!`
- 이미지들은 깨지지 않게 `svg`로 조작하되, 다시 div 조작(원점)으로 돌아왔다.
- 내.. 캔버스 API 공부는 어디로..?
  - 그래도 공부한 만큼 보여서 최선이라고 생각하는 방법을 선택했으니까 괜찮아! 아마.. 도

![I'm fine:)](https://i.pinimg.com/originals/df/60/05/df6005d1c39a1e69f274b5de4e38c449.png)

## 4. 결론

- div 안에서 DOM을 조작(CSS, Javascript)하여 구현할 예정
- 이미지는 해상도를 고려하여 svg로 넣자
- `html2canvas`는 `npm`에도 있었다!
  - [html2canvas](https://www.npmjs.com/package/html2canvas) : div를 정적 image로 캡쳐
  - [html-to-image](https://www.npmjs.com/package/html-to-image) : div를 png, base64, blob, canvas 등 여러 형식으로 변환
  - 가장 많이 사용되는 `html2canvas`를 우선으로 사용하되, 중간에 문제가 생기면 `html-to-image`도 사용해 볼 생각!
