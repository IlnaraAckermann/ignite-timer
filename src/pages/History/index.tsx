import { formatDistanceToNow } from "date-fns";
import { useCycleContext } from "../../contexts/CycleContext";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { ptBR } from "date-fns/locale";

export function History() {
	const { cycles } = useCycleContext();
	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>

			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Duração</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{cycles.map((cycle) => (
							<tr key={cycle.id}>
								<td>{cycle.task}</td>
								<td>{cycle.minutesAmount} minutos</td>
								<td>
									{formatDistanceToNow(cycle.startDate, {
										addSuffix: true,
										locale: ptBR,
									})}
								</td>
								<td>
									{cycle.finishDate && (
										<Status statusColor="green">Concluído</Status>
									)}
									{cycle.interruptedDate && (
										<Status statusColor="red">Interrompido</Status>
									)}
									{!cycle.finishDate && !cycle.interruptedDate && (
										<Status statusColor="yellow">Em andamento</Status>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
}
