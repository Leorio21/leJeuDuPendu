"use client";
import React, { useEffect } from "react";
import Selectcategory from "../Components/Selectcategory/Selectcategory";
import Play from "../Components/Play/Play";
import { useGameStore, secretWordPick } from "../Stores/GameStore";
import { CgLayoutGridSmall } from "react-icons/cg";

export default function Pages() {

  const secretWord = useGameStore((state) => state.secretWord);
  const dictionary = useGameStore((state) => state.dictionary);
  const isCategorySelected = useGameStore((state) => state.isCategorySelected);

  useEffect(() => {
    if (dictionary.length > 0) {
      secretWordPick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCategorySelected]);

  if (secretWord === "") {
    return <Selectcategory />;
  }

  return <Play />;
}
