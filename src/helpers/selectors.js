
export function getAppointmentsForDay(state, day) {
    const days = state.days;
    const appointments = state.appointments;
    let appointmentObjects = [];

    if (day !== undefined && days !== undefined && days.length > 0) {
        const appointmentIDs = days.filter((d) => d.name === day)[0].appointments
        appointmentObjects = appointmentIDs.map((id) => appointments[id])
    }
    
    return appointmentObjects;
}
