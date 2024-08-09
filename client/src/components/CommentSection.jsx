import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Textarea, Button, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);

  const [uniqueUserCount, setUniqueUserCount] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 280) {
      return;
    }

    try {
      const res = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ccontent: comment,
          postId,
          userId: currentUser._id,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);

        const uniqueUsers = new Set([
          ...comments.map((c) => c.userId),
          data.userId,
        ]);
        setUniqueUserCount(uniqueUsers.size);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setComments(data.comments);
          setUniqueUserCount(data.uniqueUserCount);

          console.log(uniqueUserCount);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);

  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.likes.length,
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as: </p>
          <img
            className="h-5 w-5 object-cover rounded-full"
            src={currentUser.profilePicture}
          />
          <Link to={"/dashboard?tab=profile"}>@{currentUser.username}</Link>
        </div>
      ) : (
        <div>
          You must be{" "}
          <Link
            to={"/sign-in"}
            className="bg-purple-700 text-white hover:underline hover:bg-purple-500"
          >
            signed in
          </Link>{" "}
          to comment.
        </div>
      )}

      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-purple-700 rounded-md p-3"
        >
          <Textarea
            placeholder="What is your comment? ..."
            rows="3"
            maxLength="280"
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-black-700 text-sm">
              {280 - comment.length} Characters remaining
            </p>
            <Button
              outline
              type="submit"
              className="bg-gradient-to-r from-blue-400 to-red-400"
              value={comment}
            >
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color="failure" className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}

      {comments.length === 0 ? (
        <p className="text-sm my-5">No comment yet...</p>
      ) : (
        <>
          <div className="text-sm my-5 flex items-center gap-1">
            <div className="">
              <p>
                <span className="border border-black-500 py-1 px-2 rounded-sm">
                  {comments.length}
                </span>{" "}
                comments by{" "}
                <span className="border border-black-500 py-1 px-2 rounded-sm">
                  {uniqueUserCount}
                </span>{" "}
                unique users
              </p>
            </div>
          </div>

          {comments.map((comment) => (
            <Comment key={comment._id} comment={comment} onLike={handleLike} />
          ))}
        </>
      )}
    </div>
  );
}
