import './App.css'
import React from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import Button from './Button'
import CreateKudoForm from './CreateKudoForm'
import Footer from './Footer'
import { useState } from 'react'
import CardList from './CardList'


function App() {
  const [showForm, setShowForm] = useState(false);


  return (
    <>
      <Header />
      <SearchBar />
      <div className="buttons">
        <Button name ="All"/>
        <Button name ="Recent"/>
        <Button name ="Celebration"/>
        <Button name ="Thank You"/>
        <Button name ="Inspiration"/>
        <Button name="Create A New Board" onClick={() => setShowForm(!showForm)} />
        {showForm && <CreateKudoForm />}
      </div>

      <Footer />

    </>
  )
}

export default App
