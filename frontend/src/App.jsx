import './App.css'
import React from 'react'
import Header from './Header'
import SearchBar from './SearchBar'
import Button from './Button'

function App() {


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
        <Button name ="Create"/>
      </div>

    </>
  )
}

export default App
