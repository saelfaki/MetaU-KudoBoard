import "./CreateKudoForm.css";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

function CreateCardForm(props) {
    const [cards, setCards] = useState([]);

    async function addCard(inputMessage, inputAuthor) {

      const response = await fetch(`http://localhost:3000/boards/${props.id}/${props.category}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: inputMessage,  author: inputAuthor, boardId: props.id, category: props.category, likeCount: props.likeCount})

      })
      console.log(response);
      const data = await response.json();
      console.log(data);
      setCards([...cards, data]);
      props.refreshCards();
  }


  return (
    <div id="create-form" className="modal-overlay">
        <div className="modal-content">
            <span className="close" onClick={props.showCardForm}>&times;</span>
            <h1>Create a new Card</h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              const message = e.target.elements[0].value;
              const author = e.target.elements[1].value;
              addCard(message, author);
            }}>
                <input type="text" placeholder="message" />


                <input type="text" placeholder="Author" />
                <button className="create-button">Create Card</button>
            </form>
        </div>

    </div>

  )
}

export default CreateCardForm;
