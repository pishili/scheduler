
export function getAppointmentsForDay(state, day) {
    const days = state.days;
    const appointments = state.appointments;
    let appointmentObjects = [];

    if (day
        && days
        && days.length > 0) {
        const daysObjects = days.filter((d) => d.name === day)
        if (daysObjects.length === 1) {
            const appointmentIDs = daysObjects[0].appointments
            appointmentObjects = appointmentIDs.map((id) => appointments[id])
        }
    }

    return appointmentObjects;
}


export function getInterviewersForDay(state, day) {
    const interviewersObjects = {};

    // days can be an empty list
    if (day
        && state.days
        && state.days.length > 0) {

        let filteredDays = state.days.filter((d) => d.name === day)
        if (filteredDays.length > 0) {
            const interviewerIDs = filteredDays[0]["interviewers"]
            for (let interviewID of interviewerIDs) {
                interviewersObjects[interviewID] = state.interviewers[interviewID]
            }
        }

    }

    return interviewersObjects;
}