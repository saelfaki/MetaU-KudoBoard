import './Card.css'

function Card() {
  return (
    <div className="card">
        <p>Text Meesage</p>
        <img src="..public/G5398.png" alt=''/>
        <p>Card Author</p>
        <div className='card-buttons'>
            <button>Like</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default Card;
