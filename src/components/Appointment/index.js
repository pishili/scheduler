import React from "react";
import "./styles.scss";


import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Confirm from "components/Appointment/Confirm";
import Form from "components/Appointment/Form";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY"
const SHOW = "SHOW"
const CONFIRM = "CONFIRM"
const CREATE = "CREATE"
const EDIT = "EDIT"

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Appointment(props) {
  const { time, interview } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  const modeRenderer = (thisMode) => {
    switch (thisMode) {
      case EMPTY:
        return <Empty
        onAdd={() => transition(CREATE)}
        />
      case SHOW:
        return <Show
          student={interview.student}
          interviewer={interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      case CONFIRM:
        return <Confirm
          onConfirm={() => transition(EMPTY)}
          onCancel={() => transition(SHOW)} />
      case CREATE:
        return <Form
          name=""
          interviewers={interviewers}
          interviewer={null}
          onCancel={() => transition(EMPTY)}
          onSave={null}
        />
      case EDIT:
        return <Form
          name={interview.student}
          interviewers={interviewers}
          // interviewer={interview.interviewer}
          onCancel={() => transition(SHOW)}
          onSave={null}
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


