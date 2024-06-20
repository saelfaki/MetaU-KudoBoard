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


function App() {
  const [showForm, setShowForm] = useState(false);
  const [displayBoard, setDisplayBoard] = useState(false);
  const [boards, setBoards] = useState([])
  const [query, setQuery] = useState('');



  useEffect(() => {
    fetchDisplayBoard();
  }, []);


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

  function emptySearchBar(){
    setQuery('');
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
          <SearchBar  search={handleSearchDisplay} handleSearchDisplay={handleSearchDisplay}  emptySearchBar={emptySearchBar}/>
          <div className="buttons">
            <Button name ="All"/>
            <Button name ="Recent"/>
            <Button name ="Celebration"/>
            <Button name ="Thank You"/>
            <Button name ="Inspiration"/>
            <Button name="Create A New Board" showForm={handleDisplayForm} />

          </div>
          <BoardList setBoards={boards}/>
          {/* <BoardList handleDisplayBoard={handleDisplayBoard}/> */}

          <Footer />

        </>
      ) : (
        <CardList handleDisplayBoard={handleDisplayBoard} showForm={handleDisplayForm}/>
      )}
    </div>
  )}





export default App
