import Card from "./Card/Card";

function CardList(props){
    function createCard(card){
        return(
            <Card key={card.id} image_url={card.image_url} message={card.message} author={card.author}/>
        );
    }



    return(
        <div className="card-list">
            {props.setCards.map(createCard)}
        </div>
    )
}

export default CardList;
