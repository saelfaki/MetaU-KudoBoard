import { useParams } from 'react-router-dom';
import CardList from './CardList';
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import CreateCardForm from './CreateCardForm';

function PageTwo() {
  const [cards, setCards] = useState([])
  const [showCardForm, setShowCardForm] = useState(false);

  const { id, category } = useParams();

  async function fetchDisplayCards(id, category){
    const response = await fetch(`http://localhost:3000/boards/${id}/${category}/cards`,{
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
  }, [id]);


  function handleDisplayCardForm(){
    setShowCardForm(!showCardForm);
  }





  return (

    <div>
       {showCardForm ? <CreateCardForm id={id} category={category} refreshCards={fetchDisplayCards} showCardForm={handleDisplayCardForm}/> : null }
      <Link to={`/`}>
      <button  className="home-btn">Home</button>
      </Link>
      <button className="Create A New Card"
       showCardForm={handleDisplayCardForm}
       onClick={() => handleDisplayCardForm()}>Create A New Card</button>
        <CardList setCards={cards}/>
    </div>
  )
}

// showCardForm={handleDisplayCardForm}

export default PageTwo
