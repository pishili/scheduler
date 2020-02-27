import React, { setState } from "react";
import "./styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";
import Error from "components/Appointment/Error"

import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CONFIRM = "CONFIRM"
const CREATE = "CREATE"
const EDIT = "EDIT"
const DELETING = "DELETING"
const SAVING = "SAVING"
const ERROR_DELETE = "ERROR_DELETE"


export default function Appointment(props) {
  const { id, time, interview, interviewers } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  const cancelInterview = () => {
    transition(DELETING);
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(error => {
        transition(ERROR_DELETE)
      })
  };

  // we pass this function to the Form component. 
  // The Form 
  const save = (name, interviewer) => { 
    const interview = {
      student: name,
      interviewer
    };
    console.log(interview);
    transition(SAVING);
    props.bookInterview(id, interview)
      .then(() => transition(SHOW))
    ;
  }

  const modeRenderer = (thisMode) => {
    switch (thisMode) {
      case EMPTY:
        return <Empty
        onAdd={() => transition(CREATE)}
        />
      case SHOW:
        return <Show
          student={interview.student}
          interviewer={interviewers[interview.interviewer]}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      case CONFIRM:
        return <Confirm
          message="Are you sure you want to delete this appointment?"
          onConfirm={cancelInterview}
          onCancel={() => transition(SHOW)} />
      case CREATE:
        return <Form
          name=""
          interviewers={interviewers}
          interviewer={null}
          onCancel={() => transition(EMPTY)}
          onSave={save}
        />
      case EDIT:
        return <Form
          name={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer}
          onCancel={() => transition(SHOW)}
          onSave={save}
        />
        case SAVING:
          return <Status
            message="SAVING"
          />
        case DELETING:
          return <Status
            message="DELETING"
          />
        case ERROR_DELETE:
          return <Error
            message="Could not delete"
            onClose={() => transition(SHOW)}
          />
      default:
        return <Empty />
    }
  }


  return (
    <article className="appointment">
      <Header time={time} />

      { modeRenderer(mode) }

    </article>
  );
}


