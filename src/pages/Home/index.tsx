import { HandPalm, Play } from "phosphor-react";

import {
	CountdownContainer,
	FormContainer,
	HomeContainer,
	MinutesAmountInput,
	Separator,
	StartCountdownButton,
	StopCountdownButton,
	TaskInput,
} from "./styles";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";

type FormData = {
	task: string;
	minutesAmount: number;
};

type Cycle = FormData & {
	id: string;
	startDate: Date;
	finishDate?: Date;
	interruptedDate?: Date;
};

export function Home() {
	const [cycles, setCycles] = useState<Cycle[]>([]);
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
	const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

	const {
		register,
		handleSubmit,
		reset,
		formState: { isValid },
	} = useForm<FormData>({
		mode: "onSubmit",
		defaultValues: {
			task: "",
			minutesAmount: 0,
		},
	});

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
					clearInterval(interval);
					document.title = "Ignite Timer";
				} else {
					setAmountSecondsPassed(secondsDifference);
				}
			}, 1000);
		}
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

	const createNewCycle = (data: FormData) => {
		const id = String(new Date().getTime());
		const newCycle: Cycle = {
			id,
			task: data.task,
			minutesAmount: data.minutesAmount,
			startDate: new Date(),
		};
		setCycles((prev) => [...prev, newCycle]);
		setActiveCycleId(id);
		setAmountSecondsPassed(0);
		reset();
	};

	const onSubmit = (data: FormData) => {
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
				<FormContainer>
					<label htmlFor="task">Vou trabalhar em</label>
					<TaskInput
						id="task"
						list="task-suggestions"
						placeholder="Dê um nome para o seu projeto"
						type="text"
						{...register("task", {
							required: "Campo obrigatório",
							minLength: {
								value: 3,
								message: "O campo deve ter pelo menos 3 caractere",
							},
						})}
					/>

					<datalist id="task-suggestions">
						<option value="Refatorar código legado" />
						<option value="Resolver bugs misteriosos" />
						<option value="Escrever testes que nunca falham" />
						<option value="Revisar PRs com café na mão" />
						<option value="Renomear variáveis para algo melhor" />
						<option value="Lutar contra o CSS" />
						<option value="Esperar o build terminar" />
					</datalist>

					<label htmlFor="minutesAmount">durante</label>
					<MinutesAmountInput
						type="number"
						id="minutesAmount"
						placeholder="00"
						step={5}
						min={5}
						max={60}
						{...register("minutesAmount", {
							required: "Campo obrigatório",
							min: {
								value: 5,
								message: "O valor mínimo é 5 minutos",
							},
							max: {
								value: 60,
								message: "O valor máximo é 60 minutos",
							},
							valueAsNumber: true,
						})}
					/>

					<span>minutos.</span>
				</FormContainer>

				<CountdownContainer>
					<span>{minutes[0]}</span>
					<span>{minutes[1]}</span>
					<Separator>:</Separator>
					<span>{seconds[0]}</span>
					<span>{seconds[1]}</span>
				</CountdownContainer>

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
