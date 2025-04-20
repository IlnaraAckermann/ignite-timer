import { ReactNode, useCallback, useMemo, useState } from "react";
import {
	Cycle,
	CycleContext,
	NewCycleFormData,
} from "../contexts/CycleContext";

interface CycleProviderProps {
	children: ReactNode;
}
export const CycleProvider = ({ children }: CycleProviderProps) => {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const stopCycle = useCallback(() => {
		setCycles((prev) =>
			prev.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, finishDate: new Date() };
				}
				return cycle;
			})
		);
		setActiveCycleId(null);
	}, [activeCycleId]);

	const interruptCycle = useCallback(() => {
		setCycles((prev) =>
			prev.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptedDate: new Date() };
				}
				return cycle;
			})
		);
		setActiveCycleId(null);
	}, [activeCycleId]);

	const createNewCycle = useCallback((data: NewCycleFormData) => {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};
		setCycles((prev) => [...prev, newCycle]);
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
