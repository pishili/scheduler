import React from "react";
import "./styles.scss";


import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  const { time, interview } = props;

  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  )

  const modeRenderer = (thisMode) => {
    switch (thisMode) {
      case EMPTY:
        return <Empty />
      case SHOW:
        return <Show
          student={interview.student}
          interviewer={interview.interviewer} />
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


