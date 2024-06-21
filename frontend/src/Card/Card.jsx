import './Card.css'
import { useState } from 'react';


function Card(props) {
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [unLike, setUnLike] = useState("Like");

  const handleLikeClick = () => {
    if(unLike === "Like"){
      setLikeCount(likeCount + 1);
      setUnLike("Unlike")
    } else{
      setLikeCount(likeCount - 1);
      setUnLike("Like")
    }

  };


  const handleCommentSubmit = async () => {
    console.log("newComment", newComment);
    const response = await fetch(`http://localhost:3000/boards/${props.boardId}/${props.category}/cards/${props.id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ comment: newComment }),
    });
    const data = await response.json();
    console.log(data)
    setComments([...comments, data]);
    setNewComment('');
  };

  return (
    <div className="card">
        <p>{props.message}</p>
        <img src={props.image_url}alt=''/>
        <p>{props.author}</p>
        <div className='card-buttons'>
            <button onClick={()=>handleLikeClick()}>{unLike}</button><span id="like-count">{likeCount}💗</span>
            <button className='deleteCardBtn' onClick={()=>props.deleteCard()}>Delete</button>
        </div>
        <div className="comments">
        {comments.map((comment) => (
          <p key={comment.id}>{comment.message}</p>
        ))}
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleCommentSubmit}>Submit Comment</button>
      </div>
    </div>
  )
}

export default Card;
