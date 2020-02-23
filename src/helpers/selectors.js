
export function getAppointmentsForDay(state, day) {
    const days = state.days;
    const appointments = state.appointments;
    const appointmentObjects = [];

    for (let thisday of days) {
        
        if (thisday.name === day) {
            const appointmentsIDs = thisday["appointments"]
            for (let appointmentID of appointmentsIDs) {

                for (let appointmentKey in appointments) {
                    if (appointmentID === Number(appointmentKey)){
                        appointmentObjects.push(appointments[appointmentKey]);
                    }  
                }

            }  
        }
    }

    return appointmentObjects;
}

