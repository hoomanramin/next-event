import {useState, useContext, useEffect} from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const {eventId} = props;
  const [commentsData, setCommentsData] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [isFetchingComments, setIsFetchingComments] = useState(false);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comments/${eventId}`)
        .then(res => res.json())
        .then(data => {
          setCommentsData(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "signing up ...",
      status: "pending",
      message: "Registering Comment",
    });

    fetch(`/api/comments/${eventId}`, {
      method: "POST",
      body: JSON.stringify(commentData),
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
        // setData(data);
        notificationCtx.showNotification({
          title: "signed up ...",
          status: "success",
          message: "Register comment",
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
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {!isFetchingComments && showComments && (
        <CommentList commentsData={commentsData} />
      )}
      {isFetchingComments && showComments && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
