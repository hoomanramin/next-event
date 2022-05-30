import {useState, useRef} from "react";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const [data, setData] = useState();
  const emailData = useRef();
  function registrationHandler(event) {
    event.preventDefault();
    const userEmail = emailData.current.value;

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({email: userEmail}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(res => res.json().then(data => setData(data)));
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailData}
            required
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
