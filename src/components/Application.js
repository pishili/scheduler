import React, { useState, useEffect } from "react"


import "styles/Application.scss"

import DayList from "components/Day/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors"

const axios = require('axios');

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  const setDay = (d) => setState({ ...state, day: d });
  // TODO: why use prev => ...?
  const setDays = (ds) => setState(prev => ({ ...prev, "days": ds }));
  const setAppointments = (thisAppointments) => setState(prev => ({ ...prev, "appointments": thisAppointments }));

  useEffect(() => {

    const daysRequest = axios.get("http://localhost:8001/api/days")
    const appointmentsRequest = axios.get("http://localhost:8001/api/appointments")

    Promise.all([
      Promise.resolve(daysRequest),
      Promise.resolve(appointmentsRequest)
    ]).then((all) => {
      const [daysResponse, appointmentsResponse] = all

      const days = daysResponse.data
      const appointments = appointmentsResponse.data
      setState(prev => ({ ...prev, days, appointments }));
    });

  }, [state.day])

  const appointmentsForDay = getAppointmentsForDay(
    {
      days: state.days,
      appointments: state.appointments
    },
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


