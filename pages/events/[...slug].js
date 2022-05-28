import {useEffect, useState} from "react";
import EventList from "../../components/events/eventList";
import {useRouter} from "next/router";
import ResultsTitle from "../../components/events/resultsTitle";
import Buttons from "../../components/ui/buttons";
import ErrorAlert from "../../components/ui/errorAlert";
import useSWR from "swr";
import Head from "next/head";

const EventsFilter = () => {
  const [loadedEvents, setLoadedEvents] = useState();
  const fetcher = (...args) => fetch(...args).then(res => res.json());
  const router = useRouter();
  const searchItem = router.query?.slug;
  const {data, error} = useSWR(
    "https://nextjs-course-f2bbf-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return (
      <>
        <h1 className="center">...Loading</h1>
      </>
    );
  }

  const filteredYear = +searchItem[0];
  const filteredMonth = +searchItem[1];
  const filteredEvents = loadedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  const eventDate = new Date(filteredYear, filteredMonth - 1);
  const PageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta
        name="description"
        content={`All events for ${filteredMonth}/${filteredYear}.`}
      />
    </Head>
  );
  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth > 12 ||
    filteredMonth < 1 ||
    error
  ) {
    return (
      <>
        {PageHeadData}
        <ErrorAlert>
          <p className="center">Invalid Filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Buttons url={"/events"}>Show All Events</Buttons>
        </div>
      </>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {PageHeadData}
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
      {PageHeadData}
      <ResultsTitle date={eventDate} />
      <EventList items={filteredEvents} />
    </>
  );
};

export default EventsFilter;

// export const getServerSideProps = async ({params}) => {
//   const searchItem = params.slug;
//   const filteredYear = +searchItem[0];
//   const filteredMonth = +searchItem[1];

//   if (
//     isNaN(filteredYear) ||
//     isNaN(filteredMonth) ||
//     filteredYear > 2030 ||
//     filteredYear < 2021 ||
//     filteredMonth > 12 ||
//     filteredMonth < 1
//   ) {
//     return {
//       props: {
//         hasError: true,
//         // notFound: true,
//         //  redirect: {destination: "/events"}
//       },
//     };
//   }

//   const filteredData = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth,
//   });

//   return {
//     props: {
//       filteredData: filteredData,
//       date: {
//         year: filteredYear,
//         month: filteredMonth,
//       },
//     },
//   };
// };
