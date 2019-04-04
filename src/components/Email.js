import React from 'react';

class Email extends React.Component{
    state = {}
    render(){
        return(
            <div className="footer">
                <div className="pane-dash">
                    <div className="footer">
                        <h2>For any questions, comments, suggestions, or problems
                            e-mail us at 'placeholder for e-mail'
                        </h2>
                    </div>
                </div>    
                <form method="post" action="mailto:andrewerickson.1208@gmail.com">
                    First:<input type="text" name="First" size="12" maxLength="12"/><br></br>
                    Last:<input type="text" name="Last" size="24" maxLength="24"/> <br></br>
                    <input type="submit" value="Send Email"/> 
                </form>
            </div>
        );
    }
}

export default Email;