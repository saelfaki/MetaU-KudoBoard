import React from "react";
import { useState } from "react";
import './BoardList.css';
import Board from "./Board";


function BoardList(props){
    return(
        <div className="board-list">
            <Board displayBoard={props.handleDisplayBoard}/>
            <Board displayBoard={props.handleDisplayBoard}/>
            <Board displayBoard={props.handleDisplayBoard}/>
            <Board displayBoard={props.handleDisplayBoard}/>
            <Board displayBoard={props.handleDisplayBoard}/>
            <Board displayBoard={props.handleDisplayBoard}/>
            <Board displayBoard={props.handleDisplayBoard}/>
        </div>
    )
}

export default BoardList;
