import React from 'react';
import Loader from 'react-loader-spinner';

const LoadingSpinner = () => {
    return (
        <div
            style={{
                position: "absolute",
                top: "50%",
                margin: "auto",
                width: "100%",
                height: "100",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <Loader type="ThreeDots" color="#2BAD60" height="100" width="100" />
        </div>
        // <div class="overlay">
        //         <div  class="spinner">
        //     </div>
        // </div>

    )
}

export default LoadingSpinner
