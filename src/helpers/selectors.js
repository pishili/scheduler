
export function getAppointmentsForDay(state, day) {
    const days = state.days;
    const appointments = state.appointments;
    let appointmentObjects = [];

    if(day !== undefined && days !== undefined && days.length > 0) {
        const daysObjects = days.filter((d) => d.name === day)
        if (daysObjects.length === 1) {
            const appointmentIDs = daysObjects[0].appointments
            appointmentObjects = appointmentIDs.map((id) => appointments[id])
        }
    }
    
    return appointmentObjects;
}


export function getInterviewersForDay(state, day) {
    // getting all the appointments belong to that specific day
    const appointmentObjects = getAppointmentsForDay(state, day);
    
    const interviewers = Object.values(state.interviewers);
    const interviewersObjects = [];
    const interviewerIDs = [];

    // getting the interviewerIDs of specific day
    for (let appointmentObj of appointmentObjects) {
        if (appointmentObj["interview"] !== null) {
            const interviewerID = appointmentObj["interview"]["interviewer"];
            interviewerIDs.push(interviewerID);
        }
    }

    // getting the interviewers of specific day
    for (let interviewer of interviewers) {
        for (let id of interviewerIDs) {
            if (interviewer["id"] === id) {
                interviewersObjects.push(interviewer);
            }
        }
    }

    console.log(interviewersObjects)
    
    return interviewersObjects;
}