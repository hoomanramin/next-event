import EventSummary from "../../components/eventDetails/eventSummary";
import EventLogistics from "../../components/eventDetails/eventLogistics";
import EventContent from "../../components/eventDetails/eventContent";
import {getEventById, getFeaturedEvents} from "../../helper/api-utils";
import Comments from "../../components/input/comments";
import Head from "next/head";

const EventsDetails = props => {
  const event = props.event;
  if (!event) {
    return (
      <div className="center">
        <p>Loading....</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        eventAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id} />
    </>
  );
};

export default EventsDetails;

export const getStaticProps = async ctx => {
  const eventId = ctx.params.eventid;
  const eventsDetail = await getEventById(eventId);
  if (!eventsDetail) {
    return {
      props: {
        event: null,
      },
    };
  }
  return {
    props: {
      event: eventsDetail,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({params: {eventid: event.id}}));
  return {
    paths: paths,
    fallback: "blocking",
  };
};
