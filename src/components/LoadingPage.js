import React from 'react';

// SPEC: Renders load images while the page awaits the query results

const LoadingPage = () => (
    <div className="loader">
        <img className="loader__image" src="/images/sun.gif" style={{width: 200, height: 200}} />
        <img className="loader__image" src="/images/flake.gif" style={{width: 200, height: 200}} />
    </div>
);

export default LoadingPage;