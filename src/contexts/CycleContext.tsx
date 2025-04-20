import { createContext, useContext } from "react";

export type NewCycleFormData = {
	task: string;
	minutesAmount: number;
};

export type Cycle = NewCycleFormData & {
	id: string;
	startDate: Date;
	finishDate?: Date;
	interruptedDate?: Date;
};

interface CycleContextInterface {
	cycles: Cycle[];
	activeCycle: Cycle | undefined;
	stopCycle(): void;
	interruptCycle(): void;
	createNewCycle(data: NewCycleFormData): void;
	minutes: string;
	seconds: string;
}

export const CycleContext = createContext<CycleContextInterface>({
	cycles: [],
	stopCycle() {},
	interruptCycle() {},
	createNewCycle() {},
	activeCycle: undefined,
	minutes: "00",
	seconds: "00",
});

export function useCycleContext() {
	return useContext(CycleContext);
}
