import EventItem from "./eventItem";
import classes from "./eventList.module.css";

const EventList = ({items}) => {
  return (
    <ul className={classes.list}>
      {items.map(item => (
        <EventItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default EventList;
