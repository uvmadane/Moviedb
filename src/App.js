import logo from './logo.svg';
import './App.css';
import Index from './Components/home';
import Header from './Components/Header';
import TopRatedPage from './pages/TopRatedPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import UpcomingPage from './pages/UpcomingPage';
import MovieDetailPage from './pages/MovieDetailPage';
import HomePage from './pages/HomePage';


function App() {
  return (
   <>
   
{/* <Index/> */}
{/* <Header/> */}

<BrowserRouter>
    {/* <Navbar/> */}
    {/* <Header/> */}
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/toprated' element={<TopRatedPage/>}/>
      <Route path='/upcoming' element={<UpcomingPage/>}/>
      {/* <Route path='/upcoming' element={<MovieDetailPage/>}/> */}
      <Route path='/movieDetails/:id' element={<MovieDetailPage/>}/>

    </Routes>
    {/* <Footer/> */}
    </BrowserRouter>

   </>
  );
}

export default App;
