import Head from "next/head";
import EventList from "../components/events/eventList";
import {getFeaturedEvents} from "../helper/api-utils";
import NewsLetterRegistration from "../components/input/newsletter-registration";
const HomePage = ({featuredEvents}) => {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events in NY" />
      </Head>
      <NewsLetterRegistration />
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
