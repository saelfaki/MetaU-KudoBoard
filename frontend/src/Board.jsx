import React from "react";
import "./Board.css";

function Board(props) {
    return(
        <div className="board">
            <img  className="board-pic" src="../public/G5398.png" />
            <h3>Title</h3>
            <p>Category</p>
        <div className="delete-and-view">
            <button className="delete-btn">Delete</button>
            <button onClick={props.displayBoard} className="view-btn">View</button>
            </div>
        </div>

    )
}

export default Board;
