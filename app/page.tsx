import Link from "next/link";
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
        <Link href="/play">
          <Button width={50}>
            <IoCaretForward style={{ width: "2rem", height: "2rem" }} />
          </Button>
        </Link>
        <Link href="/howtoplay" className={classNames(styles.howToPlay)}>Comment jouer</Link>
      </div>
    </main>
  );
}
