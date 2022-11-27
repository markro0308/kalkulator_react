import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { default as bemCssModules } from 'bem-css-modules';
import { default as DisplayStyles } from './Display.module.scss';

const style = bemCssModules(DisplayStyles);

const prevNumberFormatter = (prevOperand: string | null): string | null => {
  if (prevOperand === null) return null;
  return prevOperand.replaceAll('.', ',');
};

const numberFormatter = (operand: string | null): string | null => {
  if (operand === null) return null;
  if (operand.endsWith('.')) {
    return `${parseFloat(operand).toLocaleString('pl-PL', {
      useGrouping: true,
      maximumFractionDigits: 16,
    })},`;
  }
  if (operand.charAt(1) === '.' || operand.charAt(2) === '.')
    return operand.replaceAll('.', ',');
  const value: number = parseFloat(operand);
  const result: string = value.toLocaleString('pl-PL', {
    useGrouping: true,
    maximumFractionDigits: 16,
  });
  return result;
};

export const Display: React.FC = () => {
  const calculator = useSelector((store: RootState) => store.calculator);
  const { previousOperand, operation, currentOperand } = calculator;
  return (
    <div className={style()}>
      <div className="previous-operand">
        {prevNumberFormatter(previousOperand)} {operation}
      </div>
      <div className="current-operand">{numberFormatter(currentOperand)}</div>
    </div>
  );
};
