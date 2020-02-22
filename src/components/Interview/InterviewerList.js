import React from "react";
import "styles/InterviewerList.scss";

import InterviewerListItem from "components/Interview/InterviewerListItem";

var classNames = require('classnames');

export default function InterviewerList(props) {

    const { interviewers, interviewer, setInterviewer } = props;

    const interviewersElements = interviewers.map(thisInterviewer => {
        return (
          <InterviewerListItem
            key={thisInterviewer.id}
            name={thisInterviewer.name}
            avatar={thisInterviewer.avatar}
            selected={thisInterviewer.id === interviewer}
            setInterviewer={event => setInterviewer(thisInterviewer.id)}
          />
        );
      });

    return (
        <section className="interviewers">
            <h4 className="interviewers__header text--light">Interviewer</h4>
            <ul className="interviewers__list">
               {interviewersElements}
            </ul>
        </section>
    );
}
  



