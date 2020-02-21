import React from "react";
import "styles/InterviewerListItem.scss";
import { storiesOf } from "@storybook/react";

var classNames = require('classnames');

export default function InterviewListItem(props) {

    const { name, selected, avatar, setInterviewer } = props;

    let className = classNames(
        ["interviewers__item",
            {
                "interviewers__item--selected": selected
            }
        ]
    );

    let imgClass = classNames(
        ["interviewers__item-image",
            {
                "interviewers__item--selected-image": selected
            }
        ]
    );

    let shownName = "";
    if (selected) {
        shownName = name
    }

    return (
        <li className={className} onClick={() => setInterviewer(name)}> 
            <img
                className={imgClass}
                src={avatar}
                alt={name}
            />
            {shownName}
        </li>
    )
}









