import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function ListChartLibrary(props){

    const { listOfChartLibrary, handleOnClickLink } = props;

    return (
        <div>
            { listOfChartLibrary.map(item =>
                <span key={item.id}>[<a href={item.link} onClick={(e)=> handleOnClickLink(e, item.id)}>{item.text}</a>] </span>
            )}
        </div>
    )
}

ListChartLibrary.propTypes = {
    listOfChartLibrary: PropTypes.array.isRequired,
    handleOnClickLink: PropTypes.func.isRequired
};