import MenuBar from "../../components/card/MenuBar";
import Card from "../../components/card/Card";
import Options from "../../components/card/Options";
import { setTitle } from "../../components/Title";
import { useEffect } from "react";

export default function CardPage() {
  useEffect(() => setTitle("카드 꾸미기"), []);
  return (
    <div>
      <MenuBar />
      카드 페이지
      <Card />
      <Options />
    </div>
  );
}
