import React from "react";
import "styles/InterviewerListItem.scss";
import { storiesOf } from "@storybook/react";

var classNames = require('classnames');

export default function InterviewListItem(props) {
    let className = classNames(
        ["interviewers__item",
            {
                "interviewers__item--selected &-image": props.selected
            }
        ]
    );

    let name = "";
    if (props.selected) {
        name = props.name
    }

    return (
        <li className={className}>
            <img
                className={className}
                src={props.avatar}
                alt={props.name}
            />
            {name}
        </li>
    )
}

