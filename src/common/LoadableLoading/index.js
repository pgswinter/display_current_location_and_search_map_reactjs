import React from 'react';
import loading from '../../images/loading.gif';

export default (props) => {
    if (props.error) {
        // When the loader has errored
        return <div>Error!</div>;
    } else if (props.timedOut) {
        // When the loader has taken longer than the timeout
        return <div>Taking a long time...</div>;
    } else if (props.pastDelay) {
        
        // When the loader has taken longer than the delay
        return <div
            // {...props}
            className="loading-content">
            {loading}
        </div>
    } else {
        // When the loader has just started
        return null;
    }
};