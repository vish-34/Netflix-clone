import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom'



const TitleCard = ({title, category}) => {

const [apiData, setapidata] = useState([]);
const cardsRef = useRef();

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGRjNjZiY2I4NjM3ZTQ0NjdiY2M0MzJkYjM3MjU5OSIsIm5iZiI6MTczMDA1Mzc5MS43NDc5ODEsInN1YiI6IjY3MWU4NWY2NzY5MTA3ZDc3YjQ4MjhjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MPJUNfWNzj27tc20dH9H0mTKi7llzTKxfT5jFBtARXc'
  }
};



const handelWheel = (event)=>{
event.preventDefault();
cardsRef.current.scrollLeft += event.deltaY;
}


useEffect(()=>{


  fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setapidata(res.results))
  .catch(err => console.error(err));
  

  cardsRef.current.addEventListener('wheel', handelWheel)
},[])


  return (
    <div className='titlecards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCard