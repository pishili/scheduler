import React from "react";
import "./DayListItem.scss";

var classNames = require('classnames');

export default function DayListItem(props) {
	let dayClass = classNames(["day-list__item", { "day-list__item--selected": props.selected, "day-list__item--full": props.spots === 0 }]);
	return (
	<li onClick={() => props.setDay(props.name)}>
	   <h2 className={dayClass}>{props.name}</h2>
	   <h3 className={dayClass}>{props.spots}</h3>
    </li>
  );
}

