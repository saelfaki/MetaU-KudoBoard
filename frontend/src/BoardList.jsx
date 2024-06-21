import React, { useState, useEffect } from "react";
import './BoardList.css';
import Board from "./Board";

function BoardList(props) {

  function createBoard(board) {
      return (
        <Board key={board.id} id={board.id} createBoard={props.handleDisplayBoard} image_url={board.image_url} title={board.title} category={board.category} handleDeletedBoard={props.handleDeletedBoard}/>
      );
  }

  return (
    <div className="board-list">
      {props.setBoards.map(createBoard)}
    </div>
  );
}

export default BoardList;
