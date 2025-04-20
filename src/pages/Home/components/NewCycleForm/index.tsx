import { useFormContext } from "react-hook-form";
import { FormContainer, TaskInput, MinutesAmountInput } from "../../styles";

export const NewCycleForm = () => {
	const { register } = useFormContext();
	return (
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
	);
};
