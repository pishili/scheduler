import { useEffect, useState } from "react";
import axios from "axios";


export default function useApplicationData() {
    
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
      });

      const setDay = (d) => setState({ ...state, day: d });

      const incrSpots = () => setState(prev => {
        const newDays = state.days
        for (let i = 0; i < newDays.length; i++) {
          if (newDays[i]["name"] === state.day) {
            newDays[i]["spots"] = newDays[i]["spots"] + 1;
          }
        }
        return { ...prev,  "days": newDays }
      });
    
      const decrSpots = () => setState(prev => {
        const newDays = state.days
        for (let i = 0; i < newDays.length; i++) {
          if (newDays[i]["name"] === state.day) {
            newDays[i]["spots"] = newDays[i]["spots"] - 1;
          }
        }
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

  return { state, setDay, incrSpots, decrSpots, bookInterview, cancelInterview }
    
}