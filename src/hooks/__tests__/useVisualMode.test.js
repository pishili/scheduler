import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition forward correctly", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));
  
    expect(result.current.mode).toBe(FIRST);
  
    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);
  
    act(() => result.current.transition(THIRD));
    expect(result.current.mode).toBe(THIRD);
  });

  test("useVisualMode should transition back correctly", () => {
    const { result } = renderHook(() => useVisualMode(FIRST));
  
    expect(result.current.mode).toBe(FIRST);
  
    act(() => result.current.transition(SECOND));
    expect(result.current.mode).toBe(SECOND);
  
    act(() => result.current.transition(THIRD));
    expect(result.current.mode).toBe(THIRD);
  
    act(() => result.current.back());
    expect(result.current.mode).toBe(SECOND);
  
    act(() => result.current.back());
    expect(result.current.mode).toBe(FIRST);
  });