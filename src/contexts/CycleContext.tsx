import { createContext, useContext } from "react";
import { Cycle, NewCycleFormData } from "../reducers/cycles";

interface CycleContextInterface {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	stopCycle(): void;
	interruptCycle(): void;
	createNewCycle(data: NewCycleFormData): void;
}

export const CycleContext = createContext<CycleContextInterface>({
	cycles: [],
	stopCycle() {},
	interruptCycle() {},
	createNewCycle() {},
	activeCycle: undefined,
});

export function useCycleContext() {
	return useContext(CycleContext);
}
