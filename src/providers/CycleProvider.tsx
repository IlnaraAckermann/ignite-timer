import { ReactNode, useCallback, useMemo, useReducer, useState } from "react";
import {
	Cycle,
	CycleContext,
	NewCycleFormData,
} from "../contexts/CycleContext";

interface CycleProviderProps {
	children: ReactNode;
}

type ReducerAction = {
	type: "ADD_CYCLE" | "STOP_CYCLE" | "INTERUPT_CYCLE";
	payload?: Cycle;
};

const reducer = (cycles: Cycle[], action: { type: string; payload: Cycle }) => {
	switch (action.type) {
		case "ADD_CYCLE":
			return [...cycles, action.payload];
		case "STOP_CYCLE":
			return cycles.map((cycle) =>
				cycle.id === action.payload?.id
					? { ...cycle, finishDate: new Date() }
					: cycle
			);
		case "INTERUPT_CYCLE":
			return cycles.map((cycle) =>
				cycle.id === action.payload?.id
					? { ...cycle, interruptedDate: new Date() }
					: cycle
			);
		default:
			return cycles;
	}
};
export const CycleProvider = ({ children }: CycleProviderProps) => {
	const [cycles, dispatch] = useReducer(
		(state: Cycle[], action: ReducerAction) => reducer(state, action),
		[]
	);

	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const stopCycle = useCallback(() => {
		dispatch({
			type: "STOP_CYCLE",
			payload: activeCycle!,
		});
		setActiveCycleId(null);
	}, [activeCycle]);

	const interruptCycle = useCallback(() => {
		dispatch({
			type: "INTERUPT_CYCLE",
			payload: activeCycle!,
		});
		setActiveCycleId(null);
	}, [activeCycle]);

	const createNewCycle = useCallback((data: NewCycleFormData) => {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};
		dispatch({
			type: "ADD_CYCLE",
			payload: newCycle,
		});
		setActiveCycleId(id);
	}, []);

	const value = useMemo(
		() => ({
			cycles,
			activeCycle,
			stopCycle,
			interruptCycle,
			createNewCycle,
		}),
		[cycles, activeCycle, stopCycle, interruptCycle, createNewCycle]
	);
	return (
		<CycleContext.Provider value={value}>{children}</CycleContext.Provider>
	);
};
