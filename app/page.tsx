import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1>Le jeu du Pendu</h1>
        <Link href="/selectcategory">Play</Link>
        <Link href="/howtoplay">Comment jouer</Link>
      </div>
    </main>
  );
}
