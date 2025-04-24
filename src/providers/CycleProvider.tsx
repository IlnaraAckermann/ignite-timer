import { ReactNode, useCallback, useMemo, useReducer } from "react";
import { CycleContext } from "../contexts/CycleContext";
import {
	Cycle,
	CycleActionTypes,
	cycleReducer,
	CycleState,
	NewCycleFormData,
	ReducerAction,
} from "../reducers/cycles";

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

	const stopCycle = useCallback(() => {
		dispatch({
			type: CycleActionTypes.MARK_CURRENT_CYCLE_AS_FINISH,
		});
	}, []);

	const interruptCycle = useCallback(() => {
		dispatch({
			type: CycleActionTypes.INTERUPT_CURRENT_CYCLE,
		});
	}, []);

	const createNewCycle = useCallback((data: NewCycleFormData) => {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};
		dispatch({
			type: CycleActionTypes.ADD_NEW_CYCLE,
			payload: newCycle,
		});
	}, []);

	const value = useMemo(
		() => ({
			cycles: cycleState.cycles,
			activeCycle,
			stopCycle,
			interruptCycle,
			createNewCycle,
		}),
		[cycleState.cycles, activeCycle, stopCycle, interruptCycle, createNewCycle]
	);
	return (
		<CycleContext.Provider value={value}>{children}</CycleContext.Provider>
	);
};
