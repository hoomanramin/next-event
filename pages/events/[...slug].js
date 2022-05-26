import EventList from "../../components/events/eventList";
import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import ResultsTitle from "../../components/events/resultsTitle";
import Buttons from "../../components/ui/buttons";
import ErrorAlert from "../../components/ui/errorAlert";

const EventsFilter = () => {
  const router = useRouter();

  const searchItem = router.query?.slug;

  if (!searchItem) {
    return <h1 className="center">...Loading</h1>;
  }
  const filteredYear = +searchItem[0];
  const filteredMonth = +searchItem[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth > 12 ||
    filteredMonth < 1
  ) {
    return (
      <>
        <ErrorAlert>
          <p className="center">Invalid Filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Buttons url={"/events"}>Show All Events</Buttons>
        </div>
      </>
    );
  }

  const data = getFilteredEvents({year: filteredYear, month: filteredMonth});
  const date = new Date(filteredYear, filteredMonth - 1);

  if (!data || data.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p className="center">There Is No Event For This Date</p>
        </ErrorAlert>
        <div className="center">
          <Buttons url={"/events"}>Show All Events</Buttons>
        </div>
      </>
    );
  }
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={data} />
    </>
  );
};

export default EventsFilter;
