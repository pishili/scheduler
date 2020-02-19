import React, { Component } from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
	return (
		<ul>
			{props
				.days
				.map((day) =>
					<DayListItem name={day.name} spots={day.spots} />
				)
			}
		</ul>
	);
}

