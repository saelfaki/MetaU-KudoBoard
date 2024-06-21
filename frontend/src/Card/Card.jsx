import './Card.css'


function Card(props) {


  return (
    <div className="card">
        <p>{props.message}</p>
        <img src={props.image_url}alt=''/>
        <p>{props.author}</p>
        <div className='card-buttons'>
            <button>Like</button>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default Card;
