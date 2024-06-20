import './Card.css'


function Card() {


  return (
    <div className="card">
        <p>Text Message</p>
        <img src="" alt=''/>
        <p>Card Author</p>
        <div className='card-buttons'>
            <button>Like</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default Card;
