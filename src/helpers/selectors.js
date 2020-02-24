
export function getAppointmentsForDay(state, day) {
    const days = state.days;
    const appointments = state.appointments;
    let appointmentObjects = [];

    const appointmentIDs = days.filter((d) => d.name === day)[0].appointments
    appointmentObjects = appointmentIDs.map((id) => appointments[id])
    
    return appointmentObjects;
}
