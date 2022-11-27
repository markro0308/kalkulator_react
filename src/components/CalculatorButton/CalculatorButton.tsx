import React from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { default as CalculatorButtonStyles } from './CalculatorButton.module.scss';

interface ButtonProps {
  content: string;
  click: () => void;
  isMemory?: boolean;
  isEqual?: boolean;
  isWhite?: boolean;
  isNumber?: boolean;
}

const style = bemCssModules(CalculatorButtonStyles);

export const CalculatorButton: React.FC<ButtonProps> = (props) => {
  const modifiers = {
    'is-memory': props.isMemory,
    'is-equal': props.isEqual,
    'is-white': props.isWhite,
    'is-number': props.isNumber,
  };
  return (
    <button onClick={props.click} className={style(modifiers)}>
      {props.content}
    </button>
  );
};
