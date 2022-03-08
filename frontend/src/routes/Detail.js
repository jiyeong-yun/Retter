import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  // 클릭하면 페이지이동
  function handleClick(e) {
    window.location.href = "/"
  }
  // id마다 결과페이지(아직 json이 없음)
  const { id } = useParams();
  const getResult = async () => {
    const json = await (
      await fetch(`https://localhost3000/result/*`)
    ).json();
    console.log(json);
  };
  console.log(id);
  useEffect(() => {
    getResult();
  }, []);
  return (
    <div>
      <h2>메세지결과</h2>
      <button onClick={handleClick}>처음으로</button>
    </div>
  );
}

export default Detail;