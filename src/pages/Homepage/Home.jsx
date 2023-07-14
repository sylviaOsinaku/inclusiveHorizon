import React from "react";
import classes from "./Home.module.css";
import EquityHome from "../../components/HomeComponents/EquityHome";
import EquityCat from "../../components/CategoriesComponent/EquityCat";
function Home() {
  return (
    <div>
      <EquityHome />
      <EquityCat />
    </div>
  );
}

export default Home;
