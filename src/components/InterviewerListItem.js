import React from "react";
import "styles/InterviewerListItem.scss";

var classNames = require('classnames');

export default function InterviewListItem(props) {
    return (
    <li className="interviewers__item">
        <img
            className="interviewers__item-image"
            src="https://i.imgur.com/LpaY82x.png"
            alt="Sylvia Palmer"
        />
        Sylvia Palmer
    </li>
    )
}
