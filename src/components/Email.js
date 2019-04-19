import React from 'react';

class Email extends React.Component{
    state = {}
    render(){
        return(
            <div className="pane-dash">
                <div className="footer">
                    <p>For any questions, suggestions, or issues e-mail us at:<br></br>
                    <a href="mailto:weatherornot.kaar@gmail.com">weatherornot.kaar@gmail.com</a>
                    </p>
                </div>
            </div>            
        );
    }
}

export default Email;