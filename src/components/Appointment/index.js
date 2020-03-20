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
const ERROR_EDIT = "ERROR_EDIT"
const ERROR_CREATE = "ERROR_CREATE"

export default function Appointment(props) {
  const { id, time, interview, interviewers, incrSpots, decrSpots } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  const cancelInterview = () => {
    transition(DELETING);
    props.cancelInterview(id)
      .then(() => transition(EMPTY))
      .then(() => incrSpots())
      .catch(error => {
        transition(ERROR_DELETE)
      })
  };

  const saveEdit = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    if (name === "" || interviewer.name === null || interviewer.avatar === null) {
      transition(ERROR_EDIT);
    } else {
      transition(SAVING);
      props.bookInterview(id, interview)
        .then(() => transition(SHOW))
        .catch(error => {
          transition(ERROR_EDIT)
        })
    }
  }

  const saveCreate = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    console.log(name,interviewer)
    if (name === "" || interviewer === null) {
      transition(ERROR_CREATE);
    } else {
      transition(SAVING);
      props.bookInterview(id, interview)
        .then(() => transition(SHOW))
        .then(decrSpots)
        .catch(error => {
          transition(ERROR_CREATE)
        })
    }
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
          onSave={saveCreate}
        />
      case EDIT:
        return <Form
          name={interview.student}
          interviewers={interviewers}
          interviewer={interview.interviewer}
          onCancel={() => transition(SHOW)}
          onSave={saveEdit}
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
      case ERROR_EDIT:
        return <Error
          message="Could not save"
          onClose={() => transition(SHOW)}
        />
      case ERROR_CREATE:
        return <Error
          message="Could not save"
          onClose={() => transition(EMPTY)}
        />
      default:
        return <Empty />
    }
  }

  return (
    <article className="appointment">
      <Header time={time} />

      {modeRenderer(mode)}

    </article>
  );
}


