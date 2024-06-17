import React from "react";




const Button = (props) => {

  return (
    <button onClick={props.onClick}>{props.name}</button>

    // <button onClick={() =>
    //   {props.name.includes("Create A New Board")? props.displayForm():null}
    //         }>{props.name}</button>

  );
};

export default Button;
