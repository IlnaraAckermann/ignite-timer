import { HandPalm, Play } from "phosphor-react";

import {
	HomeContainer,
	StartCountdownButton,
	StopCountdownButton,
} from "./styles";
import { FormProvider, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Cycle, NewCycleFormData } from "./types";
import { Countdown } from "./components/Countdown";

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

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

	const createNewCycle = (data: NewCycleFormData) => {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};
		setCycles((prev) => [...prev, newCycle]);
		setActiveCycleId(id);
		reset();
	};

	const onSubmit = (data: NewCycleFormData) => {
		createNewCycle(data);
	};

	const interruptCycle = () => {
		setCycles((prev) =>
			prev.map((cycle) => {
				if (cycle.id === activeCycleId) {
					return { ...cycle, interruptedDate: new Date() };
				}
				return cycle;
			})
		);
		setActiveCycleId(null);
	};

	return (
		<HomeContainer>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormProvider {...CycleForm}>
					<NewCycleForm />
				</FormProvider>
				<Countdown
					activeCycle={activeCycle}
					stopCycle={stopCycle}
				/>
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
