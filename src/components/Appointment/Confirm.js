import React from "react";
import Button from "components/Button/Button";

export default function Confirm(props) {

    const { message, onCancel, onConfirm } = props;

    return (
        <main className="appointment__card appointment__card--confirm">
            <h1 className="text--semi-bold">{message}</h1>
            <section className="appointment__actions">
                <Button onClick={onCancel} danger={true}>Cancel</Button>
                <Button onClick={onConfirm} danger={true}>Confirm</Button>
            </section>
        </main>

    );
}
