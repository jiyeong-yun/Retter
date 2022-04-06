export const setTitle = (message) => {
  const title = document.querySelector("title");
  title.innerHTML = `${message} | Re:tter`;
};

export const setMainTitle = () => {
  const title = document.querySelector("title");
  title.innerHTML = `Re:tter | 마음을 전하는 음성 메시지 카드💌`;
};
