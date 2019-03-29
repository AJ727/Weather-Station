import React from 'react';
import {Link} from 'react-router-dom';

// SPEC: Renders a 404 if a page isn't found 

const NotFoundPage = () => (
    <div>
        404 - <Link to="/">Go Home</Link>
    </div>
);

export default NotFoundPage;