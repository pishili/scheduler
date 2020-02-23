import React, { useState, useEffect } from "react"


import "styles/Application.scss"

import DayList from "components/Day/DayList"
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors"

const axios = require('axios');

export default function Application(props) {
  const [day, setDay] = useState("Monday")
  // Remove the days array and use useState to add a days state
  // to the our Application component. It can be initialized as an empty array.
  const [days, setDays] = useState([]);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8001/api/days").then((response) => {
      setDays(response.data);
    });
  }, [])


  useEffect(() => {
    axios.get("http://localhost:8001/api/appointments").then((response) => {
      // console.log(Object.values(response.data));
      const appointments = getAppointmentsForDay(
        {
          days: days,
          appointments: response.data
        },
        day);
      setAppointments(appointments);
    });
  }, [day])


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
            days={days}
            day={day}
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
        {appointments.map((a) => {
          return (
            <Appointment
              {...a}
            />
          )
        })
        }
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}


