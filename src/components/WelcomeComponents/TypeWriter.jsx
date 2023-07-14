import React, { useEffect, useRef } from "react";
import classes from "./TypeWriter.module.css";
const Typewriter = ({ texts }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    let typewriter = null;

    const TxtType = function (el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = "";
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

      const that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) {
        delta /= 2;
      }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.loopNum++;
        delta = 300;
      }

      typewriter = setTimeout(function () {
        that.tick();
      }, delta);
    };

    const initTypewriter = () => {
      const toRotate = texts;
      const period = element.getAttribute("data-period");
      if (toRotate) {
        new TxtType(element, toRotate, period);
      }
    };

    initTypewriter();

    return () => {
      clearTimeout(typewriter);
    };
  }, [texts]);

  return (
    <div
      className={classes["typewriter-container"]}
      data-period="2000"
      ref={textRef}
    >
      <span className="wrap"></span>
    </div>
  );
};

export default Typewriter;
