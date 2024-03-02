import React from "react";
import styles from "./Selectcategory.module.css";
import classNames from "classnames";
import CategoryCard from "../CategoryCard/CategoryCard";
import Title from "../Title/Title";
import { IoArrowUndoSharp } from "react-icons/io5";
import Button from "../Button/Button";
import categoriesJson from "../../../public/data.json"
import { useRouter } from "next/navigation";

interface CategoriesData {
  [key: string]: string[];
}

interface SelectcategoryProps{
  changeDictionary: (words: string[]) => void;
}

export default function Selectcategory({changeDictionary}: SelectcategoryProps) {
  const categoriesFetched: CategoriesData = categoriesJson;
  const categories:string[] = [];

  const router = useRouter()

  const onKeyDownHandler = (event: any) => {
    if (event.key === " " || event.key === "enter") {
      router.replace(event.target.href)
    }
  }

  for (const categorie in categoriesFetched) {
    categories.push(categorie);
  }

  return (
    <div className={classNames(styles.container)}>
      <Button href="/" color="gradient" positionAbsolute={true}>
        <IoArrowUndoSharp style={{ width: "2rem", height: "2rem" }} />
      </Button>
      <section className={classNames(styles.gameApp)}>
        <Title name="Choisissez une catégorie" />
        <div className={classNames(styles.categoriesContainer)}>
          {categories.map((categorie) => (
            <CategoryCard
              key={categorie}
              item={categorie}
              content={categoriesFetched[categorie]}
              changeDictionary={changeDictionary}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
