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

  const { id, category } = useParams();

  async function fetchDisplayCards(boardId, category){
    console.log("id", id);
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
    fetchDisplayCards();
  }, []);


  function handleDisplayCardForm(){
    setShowCardForm(!showCardForm);
  }





  return (

    <div>
       {showCardForm ? <CreateCardForm refreshCards={fetchDisplayCards} id={id} category={category}  showCardForm={handleDisplayCardForm}/> : null }
      <Link to={`/`}>
      <button  className="home-btn">Home</button>
      </Link>
      <button className="Create A New Card"
       onClick={() => handleDisplayCardForm()}>Create A New Card</button>
        <CardList  refreshCards={fetchDisplayCards} fetchDisplayCards={fetchDisplayCards} likeCount={likeCount} setLikeCount={setLikeCount} setCards={cards} boardId={id} category={category}/>
    </div>
  )
}


export default PageTwo
