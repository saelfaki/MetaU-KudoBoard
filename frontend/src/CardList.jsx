import Card from "./Card/Card";
import { useEffect } from "react";
import { useState } from "react";

function CardList(props){
    const [cards, setCards] = useState([])

    async function deleteCard(boardId, cardId){
        try{
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/boards/${boardId}/cards/${cardId}`,{
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            },
          });
          if(response.ok){
            fetchDisplayCards()
            props.refreshCards();

          }
        } catch(err){

        }
      }

      async function fetchDisplayCards(boardId, category){
        console.log("id", boardId);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/boards/${boardId}/${category}/cards`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json();
        console.log(data);
        setCards(data);
      }

      useEffect(() => {
        fetchDisplayCards(props.boardId, props.category);
      }, [props.boardId, props.category]);



      const handleLikeClick = (props) => {
        setLikeCount(props.likeCount + 1);
      };


    function createCard(card){
        return(
            <Card fetchDisplayCards={fetchDisplayCards} key={card.id} id={card.id} boardId={props.boardId} category={props.category} deleteCard={()=> deleteCard(props.boardId, card.id)} image_url={card.image_url} message={card.message} author={card.author} handleLikeClick={handleLikeClick} likeCount={card.likeCount}/>
        );
    }



    return(
        <div className="card-list">
            {props.setCards.map(createCard)}
        </div>
    )
}

export default CardList;
