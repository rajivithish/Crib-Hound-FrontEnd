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
                opacity: '0.8'
            }}>
            <Loader type="ThreeDots" color="#2BAD60" height={80} width={80} />
        </div>
    )
}

export default LoadingSpinner
