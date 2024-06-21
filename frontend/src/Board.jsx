import React from "react";
import "./Board.css";
import { Link } from "react-router-dom";


function Board(props) {


    return(
        <div className="board">
            <img  className="board-pic" src={props.image_url} />
            <h3>{props.title}</h3>
            <p>{props.category}</p>
            <div className="delete-and-view">
                <button onClick={()=>props.handleDeletedBoard(props.id)} className="delete-btn">Delete</button>
                <Link to={`/boards/${props.id}/${props.category}/cards`}>
                <button onClick={()=>props.displayBoard} className="view-btn">View</button>
                </Link>
            </div>
        </div>

    )
}

export default Board;
