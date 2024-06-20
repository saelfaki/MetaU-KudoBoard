import React from "react";
import "./Board.css";


function Board(props) {


    return(
        <div className="board">
            <img  className="board-pic" src={props.image_url} />
            <h3>{props.title}</h3>
            <p>{props.category}</p>
            <div className="delete-and-view">
                <button onClick={()=>props.handleDeletedBoard(props.id)} className="delete-btn">Delete</button>
                <button onClick={props.displayBoard} className="view-btn">View</button>
            </div>
        </div>

    )
}

export default Board;
