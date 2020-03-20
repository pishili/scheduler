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
	} else if (spots === 3) {
		return "3 spots remaining";
	} else if (spots === 4) {
		return "4 spots remaining";
	} else if (spots === 5) {
		return "5 spots remaining";
	} else {
		return spots;
	}
};

export default function DayListItem(props) {

	const { name, selected, spots, setDay } = props;

	let dayClass = classNames(["day-list__item",
		{
			"day-list__item--selected": selected,
			"day-list__item--full": spots === 0
		}]);

	return (
		<li className={dayClass} onClick={() => setDay(name)}>
			<h2 >{name}</h2>
			<h3 className={dayClass}>{formatSpots(spots)}</h3>
		</li>
	);
}






