import Card from "./Card";
import { useEffect } from "react";
import { useState } from "react";

function CardList(props){

    async function deleteCard(boardId, cardId){
        try{
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/boards/${boardId}/cards/${cardId}`,{
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            },
          });
          if(response.ok){
            props.fetchDisplayCards()
            props.refreshCards();

          }
        } catch(err){

        }
    }



    useEffect(() => {
        props.fetchDisplayCards();
    }, []);



    const handleLikeClick = (props) => {
        setLikeCount(props.likeCount + 1);
    };


    function createCard(card){
        return(
            <Card
            fetchDisplayCards={props.fetchDisplayCards}
            key={card.id}
            id={card.id}
            boardId={props.boardId}
            deleteCard={()=> deleteCard(props.boardId, card.id)}
            image_url={card.image_url}
            message={card.message}
            author={card.author}
            handleLikeClick={handleLikeClick}
            likeCount={card.likeCount}/>
        );
    }



    return(
        <div className="card-list">
            {props.setCards.map(createCard)}
        </div>
    )
}

export default CardList;
