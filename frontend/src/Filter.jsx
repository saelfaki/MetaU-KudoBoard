import React from "react";

function Filter (props) {
    return (
        <button className="filter"
            onClick={() => props.handleFilterBoards()
        }>{props.name}</button>
    )
}

export default Filter;
