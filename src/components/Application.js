import React, { useState, useEffect, Component } from "react"

import "styles/Application.scss"

import DayList from "components/Day/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors"
import { getInterviewersForDay } from "helpers/selectors"

const axios = require('axios');

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });


  const setDay = (d) => setState({ ...state, day: d });
  // TODO: why use prev => ...?
  const incrSpots = () => setState(prev => {
    const newDays = state.days
    for (let i = 0; i < newDays.length; i++) {
      if (newDays[i]["name"] === state.day) {
        newDays[i]["spots"] = newDays[i]["spots"] + 1;
      }
    }
    // newDays[state.day]["spots"] = newDays[state.day]["spots"] + 1
    // updates
    return { ...prev,  "days": newDays }
  });

  const decrSpots = () => setState(prev => {
    const newDays = state.days
    for (let i = 0; i < newDays.length; i++) {
      if (newDays[i]["name"] === state.day) {
        newDays[i]["spots"] = newDays[i]["spots"] - 1;
      }
    }
    // newDays[state.day]["spots"] = newDays[state.day]["spots"] + 1
    // updates
    return { ...prev,  "days": newDays }
  });


  useEffect(() => {
    const daysRequest = axios.get("http://localhost:8001/api/days");
    const appointmentsRequest = axios.get("http://localhost:8001/api/appointments")
    const interviewersRequest = axios.get("http://localhost:8001/api/interviewers")
    
    Promise.all([
      Promise.resolve(daysRequest),
      Promise.resolve(appointmentsRequest),
      Promise.resolve(interviewersRequest)
    ]).then((all) => {
      const [daysResponse, appointmentsResponse, interviewersResponse] = all

      const days = daysResponse.data
      const appointments = appointmentsResponse.data
      const interviewers = interviewersResponse.data
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });

  }, [state.day])

  const appointmentsForDay = getAppointmentsForDay(
    state,
    state.day
  )

  const interviewersForDay = getInterviewersForDay(
    state,
    state.day
  )

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setAppointments(appointments)
    const url = `http://localhost:8001/api/appointments/${id}`;
    return axios.put(url, appointment)
      .then(response => {
        setState({
          ...state,
          appointments
        });
      })
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // setAppointments(appointments)
    const url = `http://localhost:8001/api/appointments/${id}`;
    return axios.delete(url)
      .then(response => {
        setState({
          ...state,
          appointments
        });
      })
  }


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


