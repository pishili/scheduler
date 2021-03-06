import React from "react";
import DayListItem from "components/Day/DayListItem";

export default function DayList(props) {

	const { days, day, setDay } = props;

	return (
		<ul>
			{	days
				.map((thisDay) =>
					<DayListItem key= {thisDay.id}
								 name={thisDay.name}
								 spots={thisDay.spots}
								 selected={thisDay.name === day}
								 setDay={setDay}  />
				)
			}
		</ul>
	);
}
