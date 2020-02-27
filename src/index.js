import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactModal from 'react-modal';



const drugsData = {
    "medications": [
        {
            "id": 1,
            "medication_name": "abc",
            "manufacturer": "some company",
            "date_on_market": "01/10/1990",
            "side_effects": [
                {
                    "side_effect_name": "headache",
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
            "id": 2,
            "medication_name": "xyz",
            "manufacturer": "another company",
            "date_on_market": "02/10/2005",
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


function App() {
    // searchTerm save the input in every onChange event 
    const [searchTerm, setSearchTerm] = React.useState("");
    // state searchResults used to set the search result
    const [searchResults, setSearchResults] = React.useState([]);
    // handleChange method takes event as argument and sets the value to the searchTerm state using SetSearchTerm, provided in React.useState method 
    const handleChange = e => {
        setSearchTerm(e.target.value);
        console.log(e.target.value)
    };
    


    // to get active id of medication(when we click to open modal)
    const [activeItemId, setActiveItemId] = React.useState(null);
    // !! converts value to boolean true, when isModalOpen activeItemId is true
    const isModalOpen = !!activeItemId; // assign TRUE if id is set
    // from serachresults find id which is equals to activeitemid 
    const activeItem = searchResults.find(searchResult => searchResult.id == activeItemId);
    let activeItemStr = ""; //JSON.stringify(activeItem)

    const generateSideEffectString = row_id => {
        console.log(row_id);
        console.log(typeof row_id)
        console.log(searchResults)
        // set activeItem to the ID that was clicked
        setActiveItemId(row_id);
        setTimeout(() => { console.log("World!"); }, 2000);
        //
        console.log(activeItem);
        console.log(activeItemId)
        console.log(searchResults.find(searchResult => searchResult.id == activeItemId))

        let sfx_txt = ""; // accumulator string

        // take side_effects list from active time,
        //  for each side_effect element
        //      append side_effect_name to "accumulator string"

        // activeItem.side_effects.forEach()

        activeItem.side_effects.forEach(side_effect => 
        {sfx_txt += ", " + side_effect.side_effect_name},
            console.log(activeItem)
        );

        // assign accumulator to string which will be printed
        activeItemStr = sfx_txt
    };

    const onButtonClick = React.useCallback((e) => {
        // by default onsubmit is request thats why we need event prevent Default
        e.preventDefault();
        // json data
        const drugsDataStr = JSON.stringify(drugsData);
        // parsed Json data 
        const parsedDrugsData = JSON.parse(drugsDataStr)
        // results element filter drugs and converts string  to lowercase with method toLowerCase 
        const results = parsedDrugsData.medications.filter(
            ({ medication_name }) => medication_name.toLowerCase().includes(searchTerm))
        // filtered list is set on the searchResults using setSearchResults
        setSearchResults(results);
        // whenever in searchTerm array something changed the first argument of React.useCallback hook is executes
    }, [searchTerm]);


    return (
        <div>
            <h1 id='title'>Side FX</h1>
            <form onSubmit={onButtonClick} className="App">
                {/* input field where onChange attribute call handleChange method  */}
                <input onChange={handleChange} type="text" placeholder="Search" />
                <button type="submit" id="button">Submit</button>
                {/* searchResults.map function iterates through all searchResults and render it inside ul element, return a li element for each medication name*/}
                <table id="results">

                    <thead>
                        <tr >
                            <th>Medication</th>
                            <th>Manufacturer</th>
                            <th>Date on market</th>
                        </tr>
                    </thead>


                    <tbody>
                        {searchResults.map(row => (
                            <tr key={row.id}>
                                <td>{row.medication_name}

                                    {/* click button to open modal window,  */}

                                    <button onClick={() => generateSideEffectString(row.id)} id="modal_button">More Info</button>

                                    {/* when modal is open  */}
                                    <ReactModal 
                                    isOpen={isModalOpen}
                                    ariaHideApp={false}
                                    >      
                                    {activeItemStr}
                                     {/* button to close modal window  */}                                  
                                     <button onClick={() => setActiveItemId(null)} id="modal_button">Close</button>
                                    </ReactModal>
                                </td>

                                <td>{row.manufacturer}</td>
                                <td>{row.date_on_market}</td>
                            </tr>
                        )

                        )}
                    </tbody>


                </table>
                {/*<pre>{JSON.stringify(searchResults, null, 2)}</pre> */}
            </form>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
