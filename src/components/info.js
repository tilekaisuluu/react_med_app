import React from 'react';



let infoStyles = {
    width: '500px',
    maxWidth: '100%',
    margin: '0 auto',
    position: 'fixed',
    left: 'top',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '999',
    backgroundColor: '#eee',
    padding: '10px 20px 40px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column'

};

let infoCloseButtonStyles = {
    marginBottom: '15px',
    padding: '3px 8px',
    cursor: 'pointer',
    borderRadius: '50%',
    border: 'none',
    width: '30px',
    height: '30px',
    fontWeight: 'bold',
    alignSelf: 'flex-end'
};

class Info extends React.Component {
    render() {
        return (
            <div style={infoStyles}>
                <button style={infoCloseButtonStyles}>x</button>
                <div>{this.props.children}</div>
            </div>


        )
    }
}

export default Info;