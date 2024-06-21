import "./CreateKudoForm.css";
import React from "react";
import { useState } from "react";

function CreateKudoForm(props) {
  const [board, setBoard] = useState([]);
  async function addKudoBoard(inputTitle, inputCategory, inputAuthor) {
      console.log(inputTitle, inputCategory);
      const response = await fetch('${import.meta.VITE_BACKEND_URL}/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: inputTitle, category: inputCategory, author: inputAuthor})

      })
      console.log(response);
      const data = await response.json();
      console.log(data);
      setBoard([...board, data]);
      props.refreshBoards();
  }


  return (
    <div id="create-form" className="modal-overlay">
        <div className="modal-content">
            <span className="close" onClick={props.showForm}>&times;</span>
            <h1>Create a new board</h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              const title = e.target.elements[0].value;
              const category = e.target.elements[1].value;
              const author = e.target.elements[2].value;
              addKudoBoard(title, category, author);
            }}>
                <input type="text" placeholder="Title" />
                <select>
                    <option value="public">Select a category</option>
                    <option value="celebration">Celebration</option>
                    <option value="thank you">Thank You</option>
                    <option value="inspiration">Inspiration</option>
                </select>




                <input type="text" placeholder="Author" />
                <button className="create-button">Create Board</button>
            </form>
        </div>

    </div>

  )
}

export default CreateKudoForm;
