import { ReactNode, useCallback, useMemo, useReducer } from "react";
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
		{ cycles: [], activeCycleId: null }
	);

	const activeCycle = cycleState.cycles.find(
		(cycle) => cycle.id === cycleState.activeCycleId
	);

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
			cycles: cycleState.cycles,
			activeCycle,
			markCurrentCycleAsFinish,
			interruptCurrentCycle,
			addNewCycle,
		}),
		[
			cycleState.cycles,
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
