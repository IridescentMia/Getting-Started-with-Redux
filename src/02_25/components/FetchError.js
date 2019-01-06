import React from 'react';

const FetchError = ({ message, onRetry }) => (
    <div>
        <p>Could not fetch data: {message}</p>
        <button onClick={onRetry}>RETRY</button>
    </div>
);

export default FetchError;