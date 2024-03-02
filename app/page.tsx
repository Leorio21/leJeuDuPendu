import styles from "./page.module.css";
import classNames from "classnames";
import Title from "./Components/Title/Title";
import Button from "./Components/Button/Button";
import { IoCaretForward } from "react-icons/io5";

export default function Home() {

  return (
    <main className={classNames(styles.container)}>
      <div className={classNames(styles.card)}>
        <Title name="Le jeu du Pendu" />
        <Button width={50} height={50} color="gradient" href="/play">
            <IoCaretForward style={{ width: "2rem", height: "2rem" }}  />
          </Button>
        <Button width={200} href="/howtoplay">Comment jouer</Button>
      </div>
    </main>
  );
}
