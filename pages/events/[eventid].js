import {useRouter} from "next/router";
import EventSummary from "../../components/eventDetails/eventSummary";
import EventLogistics from "../../components/eventDetails/eventLogistics";
import EventContent from "../../components/eventDetails/eventContent";
import {getEventById} from "../../dummy-data";

const EventsDetails = () => {
  const router = useRouter();
  const eventid = router.query.eventid;
  const event = getEventById(eventid);
  if (!event) {
    return <p>There Is No Event</p>;
  }
  return (
    <>
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
