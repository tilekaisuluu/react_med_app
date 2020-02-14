import React from 'react';
import ReactDOM from 'react-dom';
import Info from './components/info';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

    /* create a list of drugs  */
const drugs = [
  "Ibuprofen",
  "Aspirin",
  "Bad drug",
  "Abc",
  "Xyz",
];
function App() {


  /*  searchTerm is value of input which save the data using function setSearchTerm */

  const [searchTerm, setSearchTerm] = React.useState("");

  /*  searchResults is results */

  const [searchResults, setSearchResults] = React.useState([]);
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };
 


  /* effect hook is used to executes when method gets changed */


  React.useEffect(() => {
      
    /* filter method returns a new array of list according to the searchTerm */
    const results = drugs.filter(drug =>
      drug.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);



  return (
    <div className="App">
        <Info>
            <button>x</button>
            Hello
        </Info>
      <input
        type="text"
        placeholder="Search"
      />
      <button onClick = {handleChange}>Submit</button>

      <ul className="list-group">
        {searchResults.map(item => (
          <li key={item.toString()} className ="list-group-item disabled">{item}</li>
        ))}
        <button>More Info</button>

      </ul>
      
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

