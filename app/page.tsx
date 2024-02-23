import Link from "next/link";
import styles from "./page.module.css";
import Title from "./Components/Title/Title";
import Button from "./Components/Button/Button";
import { IoCaretForward } from "react-icons/io5";

export default function Home() {
  return (
    <main className={ styles.container }>
      <div className={ styles.card }>
        <Title name="Le jeu du Pendu" />
        <Link href="/selectcategory">
          <Button width={50}>
            <IoCaretForward style={{ width: "2rem", height: "2rem" }} />
          </Button>
        </Link>
        <Link href="/howtoplay" className={ styles.howToPlay }>Comment jouer</Link>
      </div>
    </main>
  );
}
