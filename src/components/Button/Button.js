import React from "react";

import "./Button.scss";
import classnames from "classnames";


export default function Button(props) {

   const { confirm, danger, onClick, disabled, children } = props

   const buttonClass = classnames("button", {
      "button--confirm": confirm,
      "button--danger": danger
   });

   return (<button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
   >
      {children}
   </button>
   );
}
