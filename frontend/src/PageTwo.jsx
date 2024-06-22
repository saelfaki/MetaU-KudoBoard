import { useParams } from 'react-router-dom';
import CardList from './CardList';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import CreateCardForm from './CreateCardForm';
import './PageTwo.css';

function PageTwo() {
  const [cards, setCards] = useState([])
  const [showCardForm, setShowCardForm] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const {id} = useParams();

  async function fetchDisplayCards(id){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/boards/${id}/cards`,{
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
    fetchDisplayCards(id);
  }, []);


  function handleDisplayCardForm(){
    setShowCardForm(!showCardForm);
  }





  return (

    <div>
       {showCardForm ? <CreateCardForm refreshCards={()=>fetchDisplayCards(id)} id={id}   showCardForm={handleDisplayCardForm}/> : null }
      <Link to={`/`}>
      <button  className="home-btn">Home</button>
      </Link>
      <button className="Create A New Card"
       onClick={() => handleDisplayCardForm()}>Create A New Card</button>
        <CardList  refreshCards={()=>fetchDisplayCards(id)} fetchDisplayCards={()=>fetchDisplayCards(id)} likeCount={likeCount} setLikeCount={setLikeCount} setCards={cards} boardId={id} />
    </div>
  )
}


export default PageTwo
