# Ignite Timer

Este projeto foi desenvolvido durante o curso Ignite da RocketSeat, focado em React e TypeScript. O Ignite Timer é uma aplicação de gerenciamento de tempo baseada na técnica Pomodoro, que permite aos usuários criar ciclos de trabalho e acompanhar seu histórico.

## 📋 Funcionalidades

- ⏱️ **Criação de ciclos de trabalho**: Defina uma tarefa e o tempo dedicado a ela
- ⏸️ **Interrupção de ciclos**: Pause ciclos em andamento quando necessário
- ✅ **Finalização automática**: Os ciclos são automaticamente finalizados ao término do tempo
- 📊 **Histórico de ciclos**: Visualize todos os ciclos criados, interrompidos e concluídos
- 🕒 **Contagem regressiva visual**: Acompanhe o tempo restante do ciclo atual
- 🔔 **Notificação no título**: O tempo restante é exibido no título da página

## 🧠 Conceitos Aprendidos

### Context API

O projeto utiliza a Context API do React para gerenciar o estado global da aplicação, permitindo que os dados dos ciclos sejam acessíveis em diferentes componentes sem a necessidade de prop drilling.

```tsx
// Criação do contexto para gerenciar os ciclos
export const CycleContext = createContext<CycleContextInterface>({
	cycles: [],
	markCurrentCycleAsFinish() {},
	interruptCurrentCycle() {},
	addNewCycle() {},
	activeCycle: undefined,
});
```

### Reducers

Implementação de reducers para gerenciar estados complexos, seguindo o padrão de ações e dispatch para modificar o estado de forma previsível.

```tsx
// Reducer para gerenciar o estado dos ciclos
export function cycleReducer(state: CycleState, action: ReducerAction) {
  switch (action.type) {
    case CycleActionTypes.ADD_NEW_CYCLE:
      // Lógica para adicionar um novo ciclo
      return {...};
    case CycleActionTypes.MARK_CURRENT_CYCLE_AS_FINISH:
      // Lógica para finalizar um ciclo
      return {...};
    // ...
  }
}
```

### Custom Hooks

Criação de hooks personalizados para encapsular lógicas específicas e promover reusabilidade:

```tsx
// Hook personalizado para acessar o contexto dos ciclos
export function useCycleContext() {
	return useContext(CycleContext);
}
```

### Formulários com React Hook Form

Gerenciamento avançado de formulários utilizando React Hook Form, com validações e integração com o TypeScript.

```tsx
const CycleForm = useForm<NewCycleFormData>({
	mode: "onSubmit",
	defaultValues: {
		task: "",
		minutesAmount: 0,
	},
});
```

### Styled Components

Estilização de componentes com CSS-in-JS utilizando a biblioteca Styled Components, permitindo uma melhor organização do código e reutilização de estilos.

```tsx
export const CountdownContainer = styled.div`
	font-family: "Roboto Mono", monospace;
	font-size: 10rem;
	line-height: 8rem;
	color: ${(props) => props.theme["gray-100"]};
	// ...
`;
```

### Roteamento com React Router

Implementação de múltiplas páginas e navegação utilizando React Router Dom v7.

```tsx
<Routes>
	<Route
		path="/"
		element={<DefaultLayout />}
	>
		<Route
			path="/"
			element={<Home />}
		/>
		<Route
			path="/history"
			element={<History />}
		/>
	</Route>
</Routes>
```

### TypeScript Avançado

Uso de TypeScript para aumentar a segurança e previsibilidade do código, incluindo interfaces, tipos avançados e type guards.

```typescript
export interface Cycle extends NewCycleFormData {
	id: string;
	startDate: Date;
	finishDate?: Date;
	interruptedDate?: Date;
}
```

### Manipulação de Datas

Utilização da biblioteca date-fns para manipular e formatar datas de forma eficiente.

```tsx
formatDistanceToNow(cycle.startDate, {
	addSuffix: true,
	locale: ptBR,
});
```

## 🛠️ Tecnologias Utilizadas

- React 19
- TypeScript
- Vite
- Styled Components
- React Router Dom 7
- React Hook Form
- date-fns
- phosphor-react (ícones)

## 🚀 Como Executar

1. Clone o repositório
2. Instale as dependências com `npm install`
3. Execute o projeto com `npm run dev`
4. Acesse `http://localhost:5173` no navegador

---

Projeto desenvolvido como parte do curso Ignite da RocketSeat. Este projeto foca em conceitos avançados de React e é uma ótima oportunidade para aprender sobre gerenciamento de estado, hooks, context API e TypeScript.
