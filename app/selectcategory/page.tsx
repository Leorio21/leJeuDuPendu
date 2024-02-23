import React from "react";
import { promises as fs } from "fs";
import Link from "next/link";
import styles from "./page.module.css";
import CategoryCard from "../Components/CategoryCard/CategoryCard";
import Title from "../Components/Title/Title";
import { IoArrowUndoSharp } from "react-icons/io5";
import Button from "../Components/Button/Button";

interface Result {
  [key: string]: string[];
}

export const getData = async (): Promise<Result> => {
  let fileContent: string = "";
  let result: Result = {};
  try {
    fileContent = await fs.readFile(
      process.cwd() + "/public/data.json", "utf-8"
    );
    result = JSON.parse(fileContent);
  } catch {
    result = {Error: ["Une erreur est survenue"]};
  }
  return result;
};

export default async function page() {
  const categoriesFetched: Result = await getData();
  const categories:string[] = [];

  for (const categorie in categoriesFetched) {
    categories.push(categorie);
  }

  return (
    <div className={styles.container}>
      <p>
        <Link href="/"><Button width={30}><IoArrowUndoSharp style={{width: "1.2rem", height: "1.2rem"}} /></Button></Link>
      </p>
      <section className={styles.gameApp}>
        <Title name="Choisissez une catégorie" />
        <div className={styles.categoriesContainer}>
          {categories.map((categorie) => (
            <CategoryCard
              key={categorie}
              item={categorie}
              content={categoriesFetched[categorie]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
