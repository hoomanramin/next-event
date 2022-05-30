import classes from "./comment-list.module.css";

function CommentList({commentsData}) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {commentsData.length > 0 &&
        commentsData?.map(comment => (
          <li key={comment._id}>
            <p>{comment.commentText}</p>
            <div>
              By <address>{comment.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;
