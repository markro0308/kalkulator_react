import React from 'react';
import { CalculatorButton } from '../../components/CalculatorButton/CalculatorButton';
import { useDispatch } from 'react-redux';
import {
  add_digit,
  invert,
  choose_operation,
  clear,
  cancel,
  delete_digit,
  estimate,
} from '../../reducers/calculatorSlice';
import { AppDispatch } from '../../store/store';
import { default as bemCssModules } from 'bem-css-modules';
import { default as ButtonsContainerStyles } from './ButtonsContainer.module.scss';

const style = bemCssModules(ButtonsContainerStyles);

export const ButtonsContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className={style()}>
      <CalculatorButton
        click={() => dispatch(choose_operation('%'))}
        content="%"
      />
      <CalculatorButton
        click={() => dispatch(cancel({ payload: undefined }))}
        content="CE"
      />
      <CalculatorButton
        click={() => dispatch(clear({ payload: undefined }))}
        content="C"
      />
      <CalculatorButton
        click={() => dispatch(delete_digit({ payload: undefined }))}
        content="←"
      />
      <CalculatorButton
        click={() => dispatch(choose_operation('1/x'))}
        content="¹⁄ₓ"
      />
      <CalculatorButton
        click={() => dispatch(choose_operation('x(2)'))}
        content="x²"
      />
      <CalculatorButton
        click={() => dispatch(choose_operation('sqrt'))}
        content="√x"
      />
      <CalculatorButton
        click={() => dispatch(choose_operation('÷'))}
        content="÷"
      />
      <CalculatorButton
        click={() => dispatch(add_digit('7'))}
        content="7"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(add_digit('8'))}
        content="8"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(add_digit('9'))}
        content="9"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(choose_operation('x'))}
        content="x"
      />
      <CalculatorButton
        click={() => dispatch(add_digit('4'))}
        content="4"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(add_digit('5'))}
        content="5"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(add_digit('6'))}
        content="6"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(choose_operation('-'))}
        content="-"
      />
      <CalculatorButton
        click={() => dispatch(add_digit('1'))}
        content="1"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(add_digit('2'))}
        content="2"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(add_digit('3'))}
        content="3"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(choose_operation('+'))}
        content="+"
      />
      <CalculatorButton
        click={() => dispatch(invert({ payload: undefined }))}
        content="+/-"
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(add_digit('0'))}
        content="0"
        isNumber
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(add_digit('.'))}
        content=","
        isWhite
      />
      <CalculatorButton
        click={() => dispatch(estimate({ payload: undefined }))}
        content="="
        isEqual
      />
    </div>
  );
};
