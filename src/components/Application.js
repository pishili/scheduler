import React, { useState } from "react"

import "styles/Application.scss"

import DayList from "components/Day/DayList"
import Appointment from "components/Appointment"

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "6pm",
    interview: {
      student: "Jennifer Aniston",
      interviewer: {
        id: 1,
        name: "Erik Nel",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "11am",
    interview: {
      student: "Lynda Sabori",
      interviewer: {
        id: 1,
        name: "Charles Hughes",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 5,
    time: "3pm",
    interview: {
      student: "Leonardo Ebrol",
      interviewer: {
        id: 1,
        name: "Shams Yaroyi",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];


const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

export default function Application(props) {
  const [day, setDay] = useState("Monday")

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
              time={a.time}
              interview={a.interview}
            />
          )
        })
        }
        <Appointment key="last" time="5pm" />
      </section>

    </main>
  );
}


