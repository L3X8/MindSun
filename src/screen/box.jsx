import { useState } from "react";

export default function CommentBox() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const handleSend = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="comment-container">
      <div className="comment-list">
        {comments.map((c, index) => (
          <div key={index} className="comment">
            {c}
          </div>
        ))}
      </div>
      <div className="comment-box">
        <input
          type="text"
          className="comment-input"
          placeholder="Añadir un comentario..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="send-button" onClick={handleSend}>
          <img src="send.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
