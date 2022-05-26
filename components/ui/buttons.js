import Link from "next/dist/client/link";
import classes from "./button.module.css";
const Buttons = props => {
  if (props.url) {
    return (
      <Link href={props.url}>
        <a className={classes.btn}>{props.children}</a>
      </Link>
    );
  } else {
    return (
      <button className={classes.btn} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
};

export default Buttons;
