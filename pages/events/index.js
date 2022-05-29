import EventList from "../../components/events/eventList";
import EventsSearch from "../../components/events/EventsSearch";
import {useRouter} from "next/router";
import {getAllEvents} from "../../helper/api-utils";
import Head from "next/head";
const Events = ({allEvents}) => {
  const router = useRouter();
  const searcheHandler = (year, month) => {
    const path = `/events/${year}/${month}`;
    router.push(path);
  };
  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="description" content="Find all events in here" />
      </Head>
      <EventsSearch onSearch={searcheHandler} />
      <EventList items={allEvents} />
    </>
  );
};

export default Events;

export const getStaticProps = async () => {
  const allEvents = await getAllEvents();

  return {
    props: {
      allEvents: allEvents,
    },
    revalidate: 60,
  };
};
