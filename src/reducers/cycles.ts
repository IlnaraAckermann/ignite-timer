export interface NewCycleFormData {
	task: string;
	minutesAmount: number;
}

export interface Cycle extends NewCycleFormData {
	id: string;
	startDate: Date;
	finishDate?: Date;
	interruptedDate?: Date;
}

export interface CycleState {
	cycles: Cycle[];
	activeCycleId: string | null;
}
export type ReducerAction = {
	type: CycleActionTypes;
	payload?: Cycle;
};

export enum CycleActionTypes {
	ADD_NEW_CYCLE = "ADD_NEW_CYCLE",
	MARK_CURRENT_CYCLE_AS_FINISH = "MARK_CURRENT_CYCLE_AS_FINISH",
	INTERUPT_CURRENT_CYCLE = "INTERUPT_CURRENT_CYCLE",
}

export function cycleReducer(state: CycleState, action: ReducerAction) {
	const { cycles, activeCycleId } = state;
	const { type, payload } = action;
	switch (type) {
		case CycleActionTypes.ADD_NEW_CYCLE:
			return {
				...state,
				cycles: [...cycles, ...(payload ? [payload] : [])],
				activeCycleId: payload ? payload.id : null,
			};
		case "MARK_CURRENT_CYCLE_AS_FINISH":
			return {
				...state,
				cycles: cycles.map((cycle) =>
					cycle.id === activeCycleId
						? { ...cycle, finishDate: new Date() }
						: cycle
				),
				activeCycleId: null,
			};
		case "INTERUPT_CURRENT_CYCLE":
			return {
				...state,
				cycles: cycles.map((cycle) =>
					cycle.id === activeCycleId
						? { ...cycle, interruptedDate: new Date() }
						: cycle
				),
				activeCycleId: null,
			};
		default:
			return state;
	}
}
