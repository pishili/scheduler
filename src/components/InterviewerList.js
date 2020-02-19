import React from "react";
import "styles/InterviewerList.scss";

import InterviewerListItem from "components/InterviewerListItem";

var classNames = require('classnames');


export default function InterviewListItem(props) {
    return (
        <section className={"interviewers"}>
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list"></ul>
        </section>
    );
}
