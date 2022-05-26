import {getAllEvents} from "../../dummy-data";
import EventList from "../../components/events/eventList";

const Events = () => {
  const allEvents = getAllEvents();
  return (
    <div>
      <EventList items={allEvents} />
    </div>
  );
};

export default Events;
