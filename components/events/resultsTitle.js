import Buttons from "../ui/buttons";
import classes from "./resultsTitle.module.css";

function ResultsTitle({date}) {
  const humanReadableDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <section className={classes.title}>
      <h1>Events in {humanReadableDate}</h1>
      <Buttons url="/events">Show all events</Buttons>
    </section>
  );
}

export default ResultsTitle;
