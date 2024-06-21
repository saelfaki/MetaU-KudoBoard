import Card from "./Card/Card";

function CardList(props){

    async function deleteCard(boardId, cardId){
        try{
          const response = await fetch(`http://localhost:3000/boards/${boardId}/${category}/cards/${cardId}`,{
            method: 'DELETE',
            headers:{
              'Content-Type': 'application/json'
            },
          });
          if(response.ok){
            fetchDisplayCards()

          }
        } catch(err){

        }
      }

      const handleLikeClick = (props) => {
        setLikeCount(props.likeCount + 1);
      };


    function createCard(card){
        return(
            <Card key={card.id} id={card.id} boardId={props.boardId} category={props.category} deleteCard={()=> deleteCard(props.boardId, card.id)} image_url={card.image_url} message={card.message} author={card.author} handleLikeClick={handleLikeClick} likeCount={card.likeCount}/>
        );
    }



    return(
        <div className="card-list">
            {props.setCards.map(createCard)}
        </div>
    )
}

export default CardList;
