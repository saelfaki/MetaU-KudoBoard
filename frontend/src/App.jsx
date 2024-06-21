import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PageOne from './PageOne'
import PageTwo from './PageTwo'


function App() {


  return (
      <Router>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/boards/:id/cards" element={<PageTwo />} />
      </Routes>
    </Router>
    )}





export default App
