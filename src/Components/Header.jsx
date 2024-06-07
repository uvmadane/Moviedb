// import React from 'react'

// const Header = () => {
//   return (
//     <div className="bgm">
//     <header>
//       <h1>MovieDb</h1>
//       <nav>
//         <ul>
//           <li className={currentCategory === 'Popular' ? 'active' : ''} onClick={() => handleCategoryChange('Popular')}>Popular</li>
//           <li className={currentCategory === 'Top Rated' ? 'active' : ''} onClick={() => handleCategoryChange('Top Rated')}>Top Rated</li>
//           <li className={currentCategory === 'Upcoming' ? 'active' : ''} onClick={() => handleCategoryChange('Upcoming')}>Upcoming</li>
//           <li className="search-bar">
//             <input
//               type="text"
//               placeholder="Search by Movie Name"
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <button onClick={() => console.log('Search clicked')}>Search</button>
//           </li>
//         </ul>
//       </nav>
//     </header>
//     {/* <div className="movies-container">
//       {renderMovies}
//     </div> */}
//     {/* <div className="pagination">
//       {pageNumbers.map(number => (
//         <button
//           key={number}
//           onClick={() => handleClick(number)}
//           className={number === currentPage ? 'active' : ''}
//         >
//           {number}
//         </button>
//       ))}
//     </div> */}
//   </div>
//   )
// }



// export default Header


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './header.css'; // Create a corresponding CSS file for styling

// const Header = () => {

//   const [movies, setMovies] = useState([]);
//   const [total, setTotal] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [currentPage, setCurrentPage] = useState(1);
//   const [currentCategory, setCurrentCategory] = useState('Popular');
  
//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     setCurrentPage(1); // Reset current page when searching
//   };

//   const handleClick = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   const handleCategoryChange = (category) => {
//     setCurrentCategory(category);
//     // Logic to filter movies based on category
//   };
  
//   return (

//     <div className="bgm">
//     <header>
//       <h2>MovieDb</h2>
//       <nav>
//         <ul>
//           <li className={currentCategory === 'Popular' ? 'active' : ''} onClick={() => handleCategoryChange('Popular')}>
//         <Link to='/'>Popular</Link>
//           </li>
//           <li className={currentCategory === 'Top Rated' ? 'active' : ''} onClick={() => handleCategoryChange('Top Rated')}>
//          <Link to='/toprated'>Top Rated</Link>
//           </li>


//           <li className={currentCategory === 'Upcoming' ? 'active' : ''} onClick={() => handleCategoryChange('Upcoming')}>
//          <Link to='/upcoming'>
//           Upcoming
//          </Link>
//           </li>
//           <li className="search-bar">
//             <input
//               type="text"
//               placeholder="Search by Movie Name"
//               // value={searchTerm}
//               // onChange={handleSearch}
//             />
//             <button onClick={() => console.log('Search clicked')}>Search</button>
//           </li>
//         </ul>
//       </nav>
//     </header>
//     {/* <div className="movies-container">
//       {renderMovies}
//     </div> */}
//     {/* <div className="pagination">
//       {pageNumbers.map(number => (
//         <button
//           key={number}
//           onClick={() => handleClick(number)}
//           className={number === currentPage ? 'active' : ''}
//         >
//           {number}
//         </button>
//       ))}
//     </div> */}
//   </div>
//     // <header className="bgm">
//     //   <nav>
//     //     <ul>
//     //       <li><Link to="/">Home</Link></li>
//     //       <li><Link to="/top-rated">Top Rated</Link></li>
//     //       <li><Link to="/upcoming">Upcoming</Link></li>
//     //       <li>
//     //         <input type="text" placeholder="Search..." />
//     //       </li>
//     //     </ul>
//     //   </nav>
//     // </header>
//   );
// };

// export default Header;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css'; // Ensure you have a corresponding CSS file for styling

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('Popular');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setIsMenuOpen(false); // Close menu on category change
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bgm">
      <header>
        <h2><Link to='/'>MovieDb </Link> </h2>
        <div className="hamburger" onClick={toggleMenu}>
          {isMenuOpen ? <>&times;</> : <>&#9776;</>}
        </div>
        <nav className={isMenuOpen ? 'open' : ''}>
          <ul>
            <li className={currentCategory === 'Popular' ? 'active' : ''} onClick={() => handleCategoryChange('Popular')}>
              <Link to="/">Popular</Link>
            </li>
            <li className={currentCategory === 'Top Rated' ? 'active' : ''} onClick={() => handleCategoryChange('Top Rated')}>
              <Link to="/toprated">Top Rated</Link>
            </li>
            <li className={currentCategory === 'Upcoming' ? 'active' : ''} onClick={() => handleCategoryChange('Upcoming')}>
              <Link to="/upcoming">Upcoming</Link>
            </li>
            <li className="search-bar">
              <input
                type="text"
                placeholder="Search by Movie Name"
                value={searchTerm}
                onChange={handleSearch}
              />
              <button onClick={() => console.log('Search clicked')}>Search</button>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;

