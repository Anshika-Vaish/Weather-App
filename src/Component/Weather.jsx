import React from 'react';

export const Weather = (props) => {
    return (
            <div className="container text-light">
            <div className="Card">
                <h1 className="text-white py-3">{props.cityname}</h1>
                <h5 className="py-4">
                    <i className={`wi  ${props.weatherIcon} display-1`} />
                </h5>
                {props.celsius ? (<h2 className="py-2">{props.celsius}&deg;</h2>) : null}
                {/* {show max min temp} */}
                {minmax(props.tempmin, props.tempmax)}
                <h4 className="py-3">{props.des}</h4>
            </div>
        </div>
    )
}
function minmax(min, max) {
    if (min && max) {
        return (

            <h3><span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span></h3>
        )
    }

}
export default Weather;
