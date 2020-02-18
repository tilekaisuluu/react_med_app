import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const drugsData = {
    "medications": [
        {
            "medication_name": "abc",
            "manufacturer": "some company",
            "date_on_market": "01/10/1990",
            "side_effects": [
                {
                    "side_effect_name":"headache",
                    "date_discovered": "01/01/2000"
                },
                {
                    "side_effect_name": "dierrhea",
                    "date_discovered": "01/01/2001"
                },
                {
                    "side_effect_name": "high blood pressure",
                    "date_discovered": "03/02/2002"
                }
            ]
        },
        {
            "medication_name": "xyz",
            "manufacturer": "another company",
            "date_on_market":  "02/10/2005",
            "side_effects": [
                {
                    "side_effect_name": "headache",
                    "date_discovered": "01/01/2003"
                },
                {
                    "side_effect_name": "bleeding",
                    "date_discovered": "01/01/2004"
                }
            ]
        }
    ]
 }
 

const names = drugsData.medications.map(({medication_name}) => medication_name);

 console.log(names);



function App() {
  // searchTerm save the input in every onChange event 
  const [searchTerm, setSearchTerm] = React.useState("");
  // state searchResults used to set the search result
  const [searchResults, setSearchResults] = React.useState(names);
  // handleChange method takes event as argument and sets the value to the searchTerm state using SetSearchTerm, provided in React.useState method 
  const handleChange = e => {
    setSearchTerm(e.target.value);
  };

const ToggleContent = ({ toggle, content }) => {
    const [isShown, setIsShown] = React.useState(false);
    const hide = () => setIsShown(false);
    const show = () => setIsShown(true)
    return (
        <React.Fragment>
          {toggle(show)}
          {isShown && content(hide)}
        </React.Fragment>
      );
    }    
const Modal = ({ children }) => (
    ReactDOM.createPortal(
    <div className="modal">
        {children}
        </div>,
        document.getElementById('modal-root')
        )
        );


 

  // 
  const onButtonClick = React.useCallback((e) => {
    // by default onsubmit is request thats why we need event prevent Default
    e.preventDefault();
    // results element filter drugs and converts string  to lowercase with method toLowerCase 
    const results = names.filter(name => name.toLowerCase().includes(searchTerm)); 
    // filtered list is set on the searchResults using setSearchResults
    setSearchResults(results);
    // whenever in searchTerm array something changed the first argument of React.useCallback hook is executes
}, [searchTerm]);






  return (
      // onSubmit attribute call onButtonClick when the form is submitted
    <form onSubmit = {onButtonClick} className="App">
        {/* input field where onChange attribute call handleChange method  */}
      <input onChange={handleChange} type="text" placeholder="Search"/>
      <button type="submit">Submit</button>
      {/* searchResults.map function iterates through all searchResults and render it inside ul element, toString converts elements to string, return a li element for each item*/}
      <ul 
      
       
      className="list-group">
          <ToggleContent
          toggle={show => <button onClick={show}>Open</button>}
          content={hide => (
            <Modal>
              There is no spoon.<br/>
              <button onClick={hide}>Close</button>
            </Modal>
          )}
        />
           {searchResults.map(item => (
          
      <li key={item.toString()} className ="list-group-item disabled">{item}</li>)
   
      )}
      </ul>
    </form>

  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

