import React from 'react';
import {Link} from 'react-router-dom';

// Link is used for client-side routing, it doesn't refresh the page, instead it
// just swaps things out on the fly and calls ReactDOM.render again
const NotFoundPage = () => (
    <div>
        404 - <Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;