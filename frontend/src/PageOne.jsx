import './PageOne.css'
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
  const [filter, setFilter] = useState('All');


  async function handleDeletedBoard(boardId){
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/boards/${boardId}`,{
        method: "DELETE",
        header:{
          "Content-Type":"application/json",
        },
      body: JSON.stringify({id : boardId})
      });
      if(response.ok){
        fetchDisplayBoard();
      }
    }catch(err){
      console.log(err);
    }
  }



  useEffect(() => {
    fetchDisplayBoard();
  }, []);



  async function handleFilterBoards(){
    console.log('Filter:', filter);
    if (filter === 'All'){
      setFilterBoards(boards);
      console.log(boards);
    } else if (filter === 'Recent'){
      const sortBoards = boards.sort((a,b) => b - a);
      const lastThreeBoards = sortBoards.slice(0,3);
      setFilterBoards(lastThreeBoards);
      console.log(lastThreeBoards)
    } else{
      const filteringBoards = boards.filter(board => board.category.toLowerCase() === filter.toLowerCase());
      setFilterBoards(filteringBoards);
      console.log(filteringBoards);
    }
  }

  useEffect(() => {
    handleFilterBoards();
  }, [filter, boards]);


  async function fetchDisplayBoard(){
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/boards`,{
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
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/boards/search/${query}`,{
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


          </div>
          <Button name="Create A New Board" showForm={handleDisplayForm}  />
          <BoardList handleDeletedBoard={handleDeletedBoard} handleDisplayBoard={handleDisplayBoard} setBoards={filterBoards} />

          <Footer />

        </>
      ) : (
        <CardList handleDisplayBoard={handleDisplayBoard} showForm={handleDisplayForm}/>
      )}
    </div>
  )}





export default PageOne
