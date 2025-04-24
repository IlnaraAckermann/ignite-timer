import { Cycle, CycleActionTypes } from "./cycles";

export function addNewCycleAction(newCycle: Cycle) {
	return {
		type: CycleActionTypes.ADD_NEW_CYCLE,
		payload: newCycle,
	};
}
export function markCurrentCycleAsFinishAction() {
	return {
		type: CycleActionTypes.MARK_CURRENT_CYCLE_AS_FINISH,
	};
}
export function interruptCurrentCycleAction() {
	return {
		type: CycleActionTypes.INTERUPT_CURRENT_CYCLE,
	};
}
