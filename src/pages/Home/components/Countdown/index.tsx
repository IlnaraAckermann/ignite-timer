import { CountdownContainer, Separator } from "../../styles";

import { useCycleContext } from "../../../../contexts/CycleContext";
import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";

export const Countdown = () => {
	const { activeCycle, stopCycle } = useCycleContext();
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(
		activeCycle
			? differenceInSeconds(new Date(), new Date(activeCycle.startDate))
			: 0
	);

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
	}, [activeCycle, setAmountSecondsPassed, stopCycle]);

	const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;
	const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;
	const minutes = String(Math.floor(currentSeconds / 60)).padStart(2, "0");
	const seconds = String(currentSeconds % 60).padStart(2, "0");

	useEffect(() => {
		if (activeCycle) {
			document.title = `${minutes}:${seconds}`;
		} else {
			document.title = "Ignite Timer";
		}
		return () => {
			if (activeCycle) {
				document.title = "Ignite Timer";
			}
		};
	}, [minutes, seconds, activeCycle]);

	return (
		<CountdownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<Separator>:</Separator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</CountdownContainer>
	);
};
