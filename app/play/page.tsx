"use client";
import React, { useEffect } from "react";
import Selectcategory from "../Components/Selectcategory/Selectcategory";
import useGame from "../Hooks/useGame";
import Play from "../Components/Play/Play";

export default function Pages() {
  const game = useGame();

  useEffect(() => {
    if (game.dictionary.length > 0) {
      game.secretWordPick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.isCategorieSelected]);

  if (game.secretWord === "") {
    return <Selectcategory changeDictionary={game.newDictionary} />;
  }

  return <Play game={game} />;
}
