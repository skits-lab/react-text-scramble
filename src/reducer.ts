export const SET_OUTPUT = 'SET_OUTPUT';
export const START_BAFFLE = 'START_BAFFLE';
export const STOP_BAFFLE = 'STOP_BAFFLE';

export interface BaffleState {
  output: string;
  isRunning: boolean;
}

export type SetOutputAction = { type: typeof SET_OUTPUT; payload: string };
export type StartAction = { type: typeof START_BAFFLE };
export type StopAction = { type: typeof STOP_BAFFLE };
export type BaffleActions = SetOutputAction | StartAction | StopAction;

export const initialState: BaffleState = {
  output: '',
  isRunning: false,
};

export const baffleReducer = (state: BaffleState, action: BaffleActions) => {
  switch (action.type) {
    case SET_OUTPUT:
      return { ...state, output: action.payload };

    case START_BAFFLE:
      return { ...state, isRunning: true };

    case STOP_BAFFLE:
      return { ...state, isRunning: false };

    default:
      return state;
  }
};
