import React, { useState } from "react";
import Button from "components/Button/Button";
import Confirm from "components/Appointment/Confirm"
import InterviewerList from "components/Interview/InterviewerList";

export default function Form(props) {
    const { interviewers, onCancel, onSave } = props;
    const [name, setName] = useState(props.name || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    // reset Function 
    function reset() {
        setName("");
        setInterviewer(null);
    }


    // cancel Function 
    function cancel() {
        reset();
        onCancel();
    }


    // save Function 
    function save() {
        onSave(name, interviewer);
    }

    
    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off">
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="name"
                        type="text"
                        value={name}
                        placeholder="Enter Student Name"
                        onChange={(event) => setName(event.target.value)}
                        data-testid="student-name-input"
                    />
                </form>
                <InterviewerList
                    interviewers={interviewers}
                    interviewer={interviewer}
                    setInterviewer={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button
                        onClick={cancel}
                        danger={true}>
                            Cancel
                    </Button>
                    <Button
                        onClick={save}
                        confirm={true}>
                            Save
                    </Button>
                </section>
            </section>
        </main>
    );
};
