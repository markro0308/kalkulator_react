import { createSlice, Slice, PayloadAction } from '@reduxjs/toolkit';

interface CalculatorState {
  operation: string | null;
  previousOperand: string | null;
  currentOperand: string | null;
  memoryValue: number;
  wasOperationButtonClicked: boolean;
  wasEqualClicked: boolean;
  equalBufor: number;
}

const initialState: CalculatorState = {
  operation: null,
  previousOperand: null,
  currentOperand: '0',
  memoryValue: 0,
  wasOperationButtonClicked: true,
  wasEqualClicked: false,
  equalBufor: 0,
};

export const calculatorSlice: Slice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    add_digit: (state, action: PayloadAction<string>) => {
      if (state.wasOperationButtonClicked === true && action.payload === '.') {
        return {
          ...state,
          currentOperand: `0${action.payload}`,
          wasOperationButtonClicked: false,
          wasEqualClicked: false,
        };
      }
      if (state.wasOperationButtonClicked === true && action.payload !== '.') {
        return {
          ...state,
          currentOperand: action.payload,
          wasOperationButtonClicked: false,
          wasEqualClicked: false,
        };
      }
      if (action.payload === '0' && state.currentOperand === '0') {
        return state;
      }
      if (action.payload === '.' && state.currentOperand.includes('.')) {
        return state;
      }
      if (
        state.currentOperand === '0' &&
        action.payload !== '0' &&
        action.payload !== '.'
      ) {
        return {
          ...state,
          currentOperand: action.payload,
          wasEqualClicked: false,
        };
      }

      if (state.currentOperand.length >= 15) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand}${action.payload}`,
        wasEqualClicked: false,
      };
    },
    invert: (state) => {
      const current: number = parseFloat(state.currentOperand);
      if (current === 0) {
        return state;
      }
      if (current > 0) {
        return {
          ...state,
          currentOperand: (-Math.abs(current)).toString(),
          wasOperationButtonClicked: false,
          wasEqualClicked: false,
        };
      }
      if (current < 0) {
        return {
          ...state,
          currentOperand: Math.abs(current).toString(),
          wasOperationButtonClicked: false,
          wasEqualClicked: false,
        };
      }
    },
    choose_operation: (state, action: PayloadAction<string>) => {
      if (
        state.operation === null &&
        (action.payload === '%' ||
          action.payload === 'x(2)' ||
          action.payload === '1/x' ||
          action.payload === 'sqrt')
      ) {
        const prev: null | string =
          state.previousOperand === null ? null : state.currentOperand;
        return {
          ...state,
          currentOperand: calculate(state, action),
          previousOperand: prev,
          wasOperationButtonClicked: true,
          wasEqualClicked: false,
        };
      }
      if (
        state.wasOperationButtonClicked === true &&
        state.previousOperand === null
      ) {
        return {
          ...state,
          operation: action.payload,
          previousOperand: state.currentOperand,
          wasEqualClicked: false,
        };
      }
      if (
        state.operation === null &&
        state.previousOperand !== null &&
        state.wasOperationButtonClicked === true
      ) {
        return {
          ...state,
          operation: action.payload,
          previousOperand: state.currentOperand,
          wasEqualClicked: false,
        };
      }
      if (
        state.wasOperationButtonClicked === true &&
        action.payload !== '%' &&
        action.payload !== 'x(2)' &&
        action.payload !== '1/x' &&
        action.payload !== 'sqrt'
      ) {
        return {
          ...state,
          operation: action.payload,
          wasEqualClicked: false,
        };
      }
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }
      if (state.previousOperand === null) {
        return {
          ...state,
          operation: action.payload,
          previousOperand: state.currentOperand,
          wasOperationButtonClicked: true,
          wasEqualClicked: false,
        };
      }
      if (
        (action.payload === '%' ||
          action.payload === 'x(2)' ||
          action.payload === '1/x' ||
          action.payload === 'sqrt') &&
        state.previousOperand !== null
      ) {
        return {
          ...state,
          currentOperand: calculate(state, action),
          previousOperand: `${state.previousOperand} ${
            state.operation
          } ${calculateCurrent(
            state.currentOperand,
            state.previousOperand,
            action.payload
          )}`,
          wasOperationButtonClicked: true,
          wasEqualClicked: false,
          operation: null,
        };
      }
      return {
        ...state,
        wasOperationButtonClicked: true,
        wasEqualClicked: false,
        operation: action.payload,
        previousOperand: calculate(state, action),
        currentOperand: calculate(state, action),
      };
    },
    choose_memory_operation: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'MC':
          state.memoryValue = 0;
          state.wasOperationButtonClicked = true;
          break;
        case 'MR':
          state.currentOperand = state.memoryValue.toString();
          state.wasOperationButtonClicked = true;
          break;
        case 'M+':
          state.memoryValue =
            state.memoryValue + parseFloat(state.currentOperand);
          state.wasOperationButtonClicked = true;
          break;
        case 'M-':
          state.memoryValue =
            state.memoryValue - parseFloat(state.currentOperand);
          state.wasOperationButtonClicked = true;
          break;
        case 'MS':
          state.memoryValue = parseFloat(state.currentOperand);
          state.wasOperationButtonClicked = true;
          break;
      }
    },
    cancel: (state) => {
      state.currentOperand = '0';
    },
    clear: (state) => {
      state.operation = null;
      state.previousOperand = null;
      state.currentOperand = '0';
      state.memoryValue = 0;
    },
    delete_digit: (state) => {
      if (state.currentOperand === '0' || state.wasEqualClicked === true) {
        return state;
      }
      state.currentOperand =
        state.currentOperand.length === 1
          ? '0'
          : state.currentOperand.slice(0, -1);
    },
    estimate: (state, action) => {
      if (
        state.wasEqualClicked === false &&
        (state.operation === null ||
          state.currentOperand === null ||
          state.previousOperand === null)
      ) {
        return state;
      }
      if (state.wasEqualClicked === true) {
        const current: number =
          parseFloat(state.currentOperand) + state.equalBufor;
        return {
          ...state,
          currentOperand: current.toString(),
        };
      }

      return {
        ...state,
        wasOperationButtonClicked: true,
        operation: null,
        previousOperand: null,
        currentOperand: calculate(state, action),
        wasEqualClicked: true,
        equalBufor: parseFloat(state.currentOperand),
      };
    },
  },
});

export const {
  add_digit,
  invert,
  choose_operation,
  choose_memory_operation,
  cancel,
  clear,
  delete_digit,
  estimate,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;

function calculate(
  {
    operation,
    previousOperand,
    currentOperand,
  }: {
    operation: string | null;
    previousOperand: string | null;
    currentOperand: string;
  },
  { payload }: { payload: string }
) {
  const prev: number | null =
    previousOperand !== null
      ? !previousOperand.includes(' ')
        ? parseFloat(previousOperand)
        : null
      : null;

  let current: number = parseFloat(currentOperand);
  let calculation = 0;

  if (prev === null) {
    calculation = parseFloat(
      calculateCurrent(currentOperand, previousOperand, payload)
    );
  } else {
    current = parseFloat(
      calculateCurrent(currentOperand, previousOperand, payload)
    );
    switch (operation) {
      case '+':
        calculation = prev + current;
        break;
      case '-':
        calculation = prev - current;
        break;
      case 'x':
        calculation = prev * current;
        break;
      case '÷':
        if (current === 0) {
          alert('Nie można dzielić przez zero!');
          break;
        }
        calculation = prev / current;
        break;
    }
    if (calculation.toString().length > 15) {
      if (
        (calculation.toString().charAt(0) !== '-' &&
          calculation.toString().charAt(1) === '.') ||
        (calculation.toString().charAt(0) === '-' &&
          calculation.toString().charAt(2) === '.')
      )
        return calculation.toString().slice(0, 16);
      return calculation.toExponential(14).toString();
    }
  }
  return calculation.toString();
}

function calculateCurrent(
  currentOperand: string,
  previousOperand: string | null,
  payload: string
) {
  let current: number = parseFloat(currentOperand);
  const prev: number | null =
    previousOperand !== null ? parseFloat(previousOperand) : null;
  switch (payload) {
    case '%':
      if (prev === null) {
        current = current / 100;
        break;
      }
      current = (prev * current) / 100;
      break;
    case '1/x':
      current = 1 / current;
      break;
    case 'x(2)':
      current = current ** 2;
      break;
    case 'sqrt':
      if (current < 0) {
        alert('Nieprawidłowe dane wejściowe');
        current = 0;
        break;
      }
      current = Math.sqrt(current);
      break;
  }
  if (current.toString().length > 15) {
    if (
      (current.toString().charAt(0) !== '-' &&
        current.toString().charAt(1) === '.') ||
      (current.toString().charAt(0) === '-' &&
        current.toString().charAt(2) === '.')
    )
      return current.toString().slice(0, 16);
    return current.toExponential(14).toString();
  }
  return current.toString();
}
