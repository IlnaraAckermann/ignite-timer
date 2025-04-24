import { ReactNode, useCallback, useEffect, useMemo, useReducer } from "react";
import { CycleContext } from "../contexts/CycleContext";
import {
	Cycle,
	cycleReducer,
	CycleState,
	NewCycleFormData,
	ReducerAction,
} from "../reducers/cycles/cycles";
import {
	addNewCycleAction,
	interruptCurrentCycleAction,
	markCurrentCycleAsFinishAction,
} from "../reducers/cycles/actions";

interface CycleProviderProps {
	children: ReactNode;
}

export const CycleProvider = ({ children }: CycleProviderProps) => {
	const [cycleState, dispatch] = useReducer(
		(state: CycleState, action: ReducerAction) => cycleReducer(state, action),
		{ cycles: [], activeCycleId: null },
		(initialState) => {
			const storedStateAsJSON = localStorage.getItem(
				"@ignite-timer:cycle-state-1.0.0"
			);
			if (storedStateAsJSON) {
				return JSON.parse(storedStateAsJSON);
			}
			return initialState;
		}
	);

	useEffect(() => {
		const stateJson = JSON.stringify(cycleState);
		localStorage.setItem("@ignite-timer:cycle-state-1.0.0", stateJson);
	}, [cycleState]);

	const { activeCycleId, cycles } = cycleState;
	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const markCurrentCycleAsFinish = useCallback(() => {
		dispatch(markCurrentCycleAsFinishAction());
	}, []);

	const interruptCurrentCycle = useCallback(() => {
		dispatch(interruptCurrentCycleAction());
	}, []);

	const addNewCycle = useCallback((data: NewCycleFormData) => {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};
		dispatch(addNewCycleAction(newCycle));
	}, []);

	const value = useMemo(
		() => ({
			cycles,
			activeCycle,
			markCurrentCycleAsFinish,
			interruptCurrentCycle,
			addNewCycle,
		}),
		[
			cycles,
			activeCycle,
			markCurrentCycleAsFinish,
			interruptCurrentCycle,
			addNewCycle,
		]
	);
	return (
		<CycleContext.Provider value={value}>{children}</CycleContext.Provider>
	);
};
