import {useState, useRef, useContext} from "react";
import NotificationContext from "../../store/notification-context";
import classes from "./newsletter-registration.module.css";

function NewsletterRegistration() {
  const emailData = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const userEmail = emailData.current.value;
    notificationCtx.showNotification({
      title: "signing up ...",
      status: "pending",
      message: "Registering newsletter",
    });
    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({email: userEmail}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then(data => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(data => {
        notificationCtx.showNotification({
          title: "signed up ...",
          status: "success",
          message: "Register newsletter",
        });
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: "Error",
          status: "error",
          message: error.message || "failed to register",
        });
      });
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
