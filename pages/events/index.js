import {getAllEvents} from "../../dummy-data";
import EventList from "../../components/events/eventList";
import EventsSearch from "../../components/events/EventsSearch";
import {useRouter} from "next/router";

const Events = () => {
  const allEvents = getAllEvents();
  const router = useRouter();
  const searcheHandler = (year, month) => {
    const path = `/events/${year}/${month}`;
    router.push(path);
  };
  return (
    <>
      <EventsSearch onSearch={searcheHandler} />
      <EventList items={allEvents} />
    </>
  );
};

export default Events;
