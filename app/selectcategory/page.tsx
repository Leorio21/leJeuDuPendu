import React from "react";
import { promises as fs } from "fs";
import Link from "next/link";
import styles from "./page.module.css";
import CategoryCard from "../Components/CategoryCard/CategoryCard";

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
        <Link href="/">Back</Link>
      </p>
      <section className={styles.gameApp}>
        <h1 className={styles.title}>Selectionnez une categorie</h1>
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
