import Buttons from "../ui/buttons";

const EventsSearch = props => {
  return (
    <form>
      <div>
        <div>
          <lable htmlfor="year">Year</lable>
          <select name="year" id="year">
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div>
          <lable htmlfor="month">Month</lable>
          <select name="month" id="month">
            <option value="January">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Buttons>Find Events</Buttons>
    </form>
  );
};

export default EventsSearch;
