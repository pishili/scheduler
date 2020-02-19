import React from "react";
import "styles/DayListItem.scss";

var classNames = require('classnames');

const formatSpots = (spots) => {
	if (spots === 0) {
		return "no spots remaining";
	} else if (spots === 1) {
		return "1 spot remaining";
	} else if (spots === 2) {
		return "2 spots remaining";
	} else {
		return spots;
	}
};

export default function DayListItem(props) {
	let dayClass = classNames(["day-list__item",
							  { "day-list__item--selected": props.selected,
							    "day-list__item--full": props.spots === 0 }]);
			
	return (
	<li className={dayClass} onClick={() => props.setDay(props.name)}>
	   <h2 >{props.name}</h2>
	   <h3 className={dayClass}>{formatSpots(props.spots)}</h3>
    </li>
  );
}








