// Import here 
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './static/App.css';
import DiggerModel from "./DiggerModel.js";
import Layout from "./views/layoutView.js";
import Test from "./test/testPresenter.js";
//import Home from "./views/homePresenter.js";
//import Login from "./views/loginPresenter.js";

/**
 *  
 */

function App() {
  const model = new DiggerModel();
  
  // Routes 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" > {/* element={<Layout/>} */}
          {/* Default route for / path 
          <Route index element={<Home/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="*" element={<NoPage/>}/>          
          */
          }
          <Route path="test" element={<Test/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
