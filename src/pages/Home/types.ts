export type NewCycleFormData = {
  task: string;
  minutesAmount: number;
};

export type Cycle = NewCycleFormData & {
  id: string;
  startDate: Date;
  finishDate?: Date;
  interruptedDate?: Date;
};
