import React from "react";
import styles from "./page.module.css";
import classNames from "classnames";
import { IoArrowUndoSharp } from "react-icons/io5";
import Button from "../Components/Button/Button";
import Image from "next/image";
import Title from "../Components/Title/Title";

export default function page() {
  return (
    <article className={classNames(styles.container)}>
      <div className={classNames(styles.headContainer)}>
        <Button href="/" color="gradient">
          <IoArrowUndoSharp style={{ width: "2rem", height: "2rem" }} />
        </Button>
      </div>
      <Title name="Comment jouer" />
      <p>
        Le but du jeu est simple : deviner toute les lettres qui doivent
        composer le(s) mot(s), avec un nombre limité de tentatives et des thèmes
        fixés à l’avance.
      </p>
      <p>
        {" "}
        A chaque fois que le joueur devine une lettre, celle-ci est affichée.
        Dans le cas contraire, le nombre de tentatives restantes diminue…
      </p>
      <Image
        src="/playScreen.webp"
        width={620}
        height={379}
        style={{
          margin: "20px 0",
          height: "100%",
          width: "100%",
          maxWidth: "620px",
        }}
        alt="capture décran de l'interface de jeu"
      />
      <ol className={classNames(styles.screenPlayLegend)}>
        <li>mot(s) secret</li>
        <li>lettre non proposée</li>
        <li>lettre déjà proposée</li>
        <li>Nombre de tentatives restantes</li>
        <li>Menu option</li>
      </ol>
    </article>
  );
}
