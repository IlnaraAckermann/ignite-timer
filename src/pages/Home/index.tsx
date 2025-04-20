import { HandPalm, Play } from "phosphor-react";

import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { NewCycleFormData, useCycleContext } from "../../contexts/CycleContext";

export function Home() {
	const { createNewCycle, activeCycle, interruptCycle } = useCycleContext();

	const CycleForm = useForm<NewCycleFormData>({
		mode: "onSubmit",
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

	const {
		handleSubmit,
		reset,
		formState: { isValid },
	} = CycleForm;

	const onSubmit = (data: NewCycleFormData) => {
		createNewCycle(data);
		reset();
	};

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormProvider {...CycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown />
				{activeCycle ? (
					<StopCountdownButton
						type="button"
						onClick={interruptCycle}
					>
						<HandPalm size={24} />
						Interromper
					</StopCountdownButton>
				) : (
					<StartCountdownButton
						type="submit"
						disabled={!isValid}
					>
						<Play size={24} /> Começar
					</StartCountdownButton>
				)}
			</form>
		</HomeContainer>
	);
}
