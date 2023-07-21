import React, { useState } from "react";
import IconChevronBackCircleOutline from "../../Ui/PrevIcon";
import { useNavigate } from "react-router-dom";
import classes from "./Tools.module.css";

function ToolHeader({ title }) {
  const navigate = useNavigate();

  const prevPage = function () {
    navigate(-1);
  };
  return (
    <div className={classes["tool-header"]}>
      <span onClick={prevPage} className={classes["prevPage"]}>
        <IconChevronBackCircleOutline />
      </span>

      <p className={classes["logo"]}>{title}</p>
    </div>
  );
}

export default ToolHeader;
