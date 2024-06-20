import './App.css'
import React, { useEffect } from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import Button from './Button'
import CreateKudoForm from './CreateKudoForm'
import Footer from './Footer'
import { useState } from 'react'
import CardList from './CardList'
import BoardList from './BoardList'
import Filter from './Filter'

function PageOne() {
  const [showForm, setShowForm] = useState(false);
  const [displayBoard, setDisplayBoard] = useState(false);
  const [boards, setBoards] = useState([])
  const [query, setQuery] = useState('');
  const [filterBoards , setFilterBoards] = useState([]);
  const [filter, setFilter] = useState('all');


  async function handleDeletedBoard(id){
    try{
      const response = await fetch(`https://localhost:3000/boards/${id}`,{
        method: "DELETE",
        header:{
          "Content-Type":"application/json",
        },
      });
      if(response.ok){
        handleDisplayBoard();
      }
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchDisplayBoard();
  }, []);



  async function handleFilterBoards(){
    if (filter === 'all'){
      setFilterBoards(boards);
    } else if (filter === 'recent'){
      const sortBoards = boards.sort((a,b) => b - a);
      const lastThreeBoards = sortBoards.slice(0,3);
      setFilterBoards(lastThreeBoards);
    } else{
      const filteredBoards = boards.filter(board => board.category === filter);
      setFilterBoards(filteredBoards);
    }
  }

  useEffect(() => {
    handleFilterBoards();
  }, [filter, boards]);


  async function fetchDisplayBoard(){
    const response = await fetch('http://localhost:3000/boards',{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    console.log(data);
    setBoards(data);
  }


  async function handleSearchDisplay(query){
    const response = await fetch(`http://localhost:3000/boards/search/${query}`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json();
    console.log(data);
    setBoards(data);
  }




  function handleDisplayBoard(){
    setDisplayBoard(!displayBoard);
  }

  function handleDisplayForm(){
    setShowForm(!showForm);
  }



  return (
    <div className='App'>
      {(!displayBoard) ? (
        <>
          {showForm ? <CreateKudoForm refreshBoards={fetchDisplayBoard} showForm={handleDisplayForm}/> : null }
          <Header />
          <SearchBar  search={handleSearchDisplay} handleSearchDisplay={handleSearchDisplay}  fetchDisplayBoard={fetchDisplayBoard}/>
          <div className="buttons">
            <Filter name ="All" handleFilterBoards={() => setFilter('All')}/>
            <Filter name ="Recent" handleFilterBoards={() => setFilter('Recent')}/>
            <Filter name ="Celebration" handleFilterBoards={() => setFilter('Celebration')}/>
            <Filter name ="Thank You" handleFilterBoards={() => setFilter('Thank You')}/>
            <Filter name ="Inspiration" handleFilterBoards={() => setFilter('Inspiration')}/>
            <Button name="Create A New Board" showForm={handleDisplayForm}  />

          </div>
          <BoardList handleDisplayBoard={handleDisplayBoard} setBoards={boards} handleDeletedBoard={handleDeletedBoard}/>

          <Footer />

        </>
      ) : (
        <CardList handleDisplayBoard={handleDisplayBoard} showForm={handleDisplayForm}/>
      )}
    </div>
  )}





export default PageOne
