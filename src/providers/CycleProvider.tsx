import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
	Cycle,
	CycleContext,
	NewCycleFormData,
} from "../contexts/CycleContext";
import { differenceInSeconds } from "date-fns";

interface CycleProviderProps {
	children: ReactNode;
}
export const CycleProvider = ({ children }: CycleProviderProps) => {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

	const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

	const [amountSecondsPassed, setAmountSecondsPassed] = useState(
		activeCycle
			? differenceInSeconds(new Date(), new Date(activeCycle.startDate))
			: 0
	);

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

	useEffect(() => {
		let interval: number;

		if (activeCycle) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					new Date(activeCycle.startDate)
				);

				if (secondsDifference >= activeCycle.minutesAmount * 60) {
					stopCycle();
					setAmountSecondsPassed(0);
					clearInterval(interval);
					document.title = "Ignite Timer";
				} else {
					setAmountSecondsPassed(secondsDifference);
				}
			}, 1000);
		} else {
			setAmountSecondsPassed(0);
		}

		return () => {
			clearInterval(interval);
		};
	}, [activeCycle, stopCycle]);

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
	const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, "0");
	const seconds = String(currentSeconds % 60).padStart(2, "0");

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`;
		}
	}, [minutes, seconds, activeCycle]);

	const value = useMemo(
		() => ({
			cycles,
			activeCycle,
			stopCycle,
			interruptCycle,
			createNewCycle,
			minutes,
			seconds,
		}),
		[
			cycles,
			activeCycle,
			stopCycle,
			interruptCycle,
			createNewCycle,
			minutes,
			seconds,
		]
	);
	return (
		<CycleContext.Provider value={value}>{children}</CycleContext.Provider>
	);
};
