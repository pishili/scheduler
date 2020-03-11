import { useState } from "react";

export default function useVisualMode(initial) {
    const [mode, setMode] = useState(initial);
    const [history, setHistory] = useState([initial]);

    function transition(newMode, replace = false) {
        const newHist = (replace) ? history.slice(0, -1) : history;
        setHistory([...newHist, newMode]);
        setMode(newMode);
    }

    function back() {
        if (history.length > 1) {
            const newHist = history.slice(0, -1);
            setMode(newHist[newHist.length - 1]);
            setHistory(newHist);
        }
    };

    return { mode, transition, back };
};




