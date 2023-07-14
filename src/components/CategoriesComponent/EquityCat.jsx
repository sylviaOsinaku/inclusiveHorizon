import React from "react";
import classes from "./EquityCat.module.css";
import IconTrophy from "../../Ui/uizIcon";
import { Link } from "react-router-dom";
import { Categories } from "./Category";
function EquityCat() {
  return (
    <div className={classes["equity-category-wrapper"]}>
      <h2>🌟 Embrace Diversity, Ignite Change, Try out one of our <span className={classes['kit']}>Kit</span></h2>

      <div className={classes["category-container"]}>
        {Categories.map((category) => (
          <Link
            className={classes["category-wrapper"]}
            key={category.id}
            to={category.href}
          >
            {category.svg}

            <p>{category.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default EquityCat;
