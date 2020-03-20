import React from "react"

import "styles/Application.scss"

import DayList from "components/Day/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors"
import { getInterviewersForDay } from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData"

export default function Application() {

  const {
    state,
    setDay,
    incrSpots,
    decrSpots,
    bookInterview,
    cancelInterview
  } = useApplicationData()

  const appointmentsForDay = getAppointmentsForDay(
    state,
    state.day
  )

  const interviewersForDay = getInterviewersForDay(
    state,
    state.day
  )

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {appointmentsForDay.map((a) => {
          return (
            <Appointment
              key={a.id}
              interviewers={interviewersForDay}
              bookInterview={bookInterview}
              cancelInterview={cancelInterview}
              incrSpots={incrSpots}
              decrSpots={decrSpots}
              {...a}
            />
          )
        })
        }
        <Appointment key="last" time="5pm" interview={null} />
      </section>

    </main>
  );
}


