import { useState } from "react";

function useCustomHook() {
    function action() {}
    
    return { action }; 
}

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    // const [history, setHistory] = useState([initial]);

    function transition(newMode) {
        // add new mode to our history
        // setHistory(mode);
        setMode(newMode)
    }
    function back() {
        // we should set the mode to 
        // the previous item in our hisyory array
        // setMode = 

    }


    return { mode, transition, back };
}