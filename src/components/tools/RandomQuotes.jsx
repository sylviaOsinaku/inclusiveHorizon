import React, { useState } from "react";
import ToolHeader from "./ToolHeader";
import classes from "./Tools.module.css";
import { ClipLoader } from "react-spinners";
function RandomQuotes() {
  const [error, setError] = useState(false);
  const [quotes, setQuotes] = useState([
    {
      quote:
        "Click the button to generate a quote!, Injustice anywhere is a threat to justice everywhere.",
      author: "Martin Luther King Jr.",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "nVYfugntzD0rPuEFClAOx8LogBHonsarTuNDQ9nq";
  const category = "equality";
  const options = {
    method: "GET",
    headers: {
      "X-Api-Key": apiKey,
      "Content-Type": "application/json",
    },
  };

  const fetchQuotes = async function () {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://api.api-ninjas.com/v1/quotes?category=" + category,
        options
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setIsLoading(false);
      console.log(data);
      setQuotes(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes["tool-container"]}>
      <ToolHeader title={"Random Quotes Generator"} />
      <p className={classes["text-intro"]}>
        🌟 Random Equality Quotes: Receive a dose of inspiration with our vast
        collection of thought-provoking quotes from influential leaders,
        activists, and visionaries. Let their words ignite your passion for
        change.
      </p>

      {quotes.map((quote, index) => (
        <div className={classes["quotes-container"]} key={index}>
          <blockquote>{quote.quote}</blockquote>
          <div className={classes["quotes-display-wrapper"]}>
            <p>
              Author : <span>{quote.author}</span>{" "}
            </p>

            <div>{isLoading && <ClipLoader color="#fff" />}</div>
          </div>
        </div>
      ))}

      <div className={classes["quotes-btn-wrapper"]}>
        <button className={classes["make-pledge-btn"]} onClick={fetchQuotes}>
          Generate Quotes
        </button>
      </div>
    </div>
  );
}

export default RandomQuotes;
