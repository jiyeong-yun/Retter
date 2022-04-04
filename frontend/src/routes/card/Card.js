import MenuBar from "../../components/card/MenuBar";
import Card from "../../components/card/Card";
import Options from "../../components/card/Options";
import { useEffect } from "react";
import { connect } from "react-redux";
import { resetCard } from "../../store/actions/cardActions";

function mapDispatchToProps(dispatch) {
  return {
    resetCard: () => dispatch(resetCard()),
  };
}

export default connect(null, mapDispatchToProps)(CardPage);

function CardPage({ resetCard }) {
  useEffect(() => {
    // 1. 카드 데이터가 남아있으면 데이터 초기화
    resetCard();

    // 2. document에 onclick 이벤트 리스너 추가.
  }, [resetCard]);

  return (
    <div>
      <MenuBar />
      카드 페이지
      <Card />
      <Options />
    </div>
  );
}
