import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";
import ArrowRightIcon from "../icons/arrow-right-icon";
import Buttons from "../ui/buttons";
import classes from "./eventItem.module.css";
import Image from "next/image";

const EventItem = ({item}) => {
  const readableDate = new Date(item.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formatAddress = item.location.replace(", ", "\n");
  const exploreEvent = `/events/${item.id}`;
  return (
    <li className={classes.item}>
      <Image src={"/" + item.image} alt={item.title} width={250} height={160} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{item.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formatAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Buttons url={exploreEvent}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Buttons>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
