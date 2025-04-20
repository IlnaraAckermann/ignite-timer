import { CountdownContainer, Separator } from "../../styles";

import { useCycleContext } from "../../../../contexts/CycleContext";

export const Countdown = () => {
	const { minutes, seconds } = useCycleContext();


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
