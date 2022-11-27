import React from 'react';
import { useDispatch } from 'react-redux';
import { CalculatorButton } from '../../components/CalculatorButton/CalculatorButton';
import { choose_memory_operation } from '../../reducers/calculatorSlice';
import { AppDispatch } from '../../store/store';
import { default as bemCssModules } from 'bem-css-modules';
import { default as MemoryContainerStyles } from './MemoryContainer.module.scss';

const style = bemCssModules(MemoryContainerStyles);

export const MemoryContainer: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className={style()}>
      <CalculatorButton
        click={() => dispatch(choose_memory_operation('MC'))}
        content="MC"
        isMemory
      />
      <CalculatorButton
        click={() => dispatch(choose_memory_operation('MR'))}
        content="MR"
        isMemory
      />
      <CalculatorButton
        click={() => dispatch(choose_memory_operation('M+'))}
        content="M+"
        isMemory
      />
      <CalculatorButton
        click={() => dispatch(choose_memory_operation('M-'))}
        content="M-"
        isMemory
      />
      <CalculatorButton
        click={() => dispatch(choose_memory_operation('MS'))}
        content="MS"
        isMemory
      />
    </div>
  );
};
