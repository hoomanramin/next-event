import EventList from "../components/events/eventList";
import {getFeaturedEvents} from "../helper/api-utils";
const HomePage = ({featuredEvents}) => {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
};
