import { createContext, useContext } from "react";
import { Cycle, NewCycleFormData } from "../reducers/cycles/cycles";

interface CycleContextInterface {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	markCurrentCycleAsFinish(): void;
	interruptCurrentCycle(): void;
	addNewCycle(data: NewCycleFormData): void;
}

export const CycleContext = createContext<CycleContextInterface>({
	cycles: [],
	markCurrentCycleAsFinish() {},
	interruptCurrentCycle() {},
	addNewCycle() {},
	activeCycle: undefined,
});

export function useCycleContext() {
	return useContext(CycleContext);
}
