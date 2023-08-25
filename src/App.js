import './App.css';

import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App =()=> {
  const apiKey = process.env.REACT_APP_NEWS_API
 const [progress,setprogress] = useState(0);

//  setProgress for class based 
  // const setProgress =(progress)=>{
  //   setprogress(progress)
  // }
  
  
    return (
      <div>
        <Router>

        <Navbar/>
        <LoadingBar
        height  = {3}
        color='#f11946'
        progress={progress}
       
      />
        <Routes>
        <Route exact path="/" element = {<News setProgress={setprogress}  apiKey = { apiKey}  key="general" pageSize = {5} category="general" country="in"/>}></Route> 
        <Route exact path="/business" element = {<News setProgress={setprogress}  apiKey = { apiKey}  key="business" pageSize = {5} category="business" country="in"/>}></Route> 
        <Route exact path="/science" element = {<News setProgress={setprogress}  apiKey = { apiKey}  key="science" pageSize = {5} category="science" country="in"/>}> </Route> 
        <Route exact path="/technology" element = {<News setProgress={setprogress}  apiKey = { apiKey}  key="technology" pageSize = {5} category="technology" country="in"/>}></Route> 
        <Route exact path="/health" element = {<News setProgress={setprogress}  apiKey = { apiKey}  key="health" pageSize = {5} category="health" country="in"/>}></Route> 
        <Route exact path="/sports" element = {<News setProgress={setprogress}  apiKey = { apiKey}  key="sports" pageSize = {5} category="sports" country="in"/>}></Route> 
        <Route exact path="/entertainment" element = {<News setProgress={setprogress}  apiKey = { apiKey}  key="entertainment" pageSize = {5} category="entertainment" country="in"/>}></Route> 
        </Routes>
        </Router>
        
      </div>
    )
  }

  export default App;
