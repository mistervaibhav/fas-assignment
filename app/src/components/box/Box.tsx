import { forwardRef } from 'react';

import { ReactComponent as Next } from '../../assets/next.svg';
import { ReactComponent as Prev } from '../../assets/prev.svg';

import './Box.scss';

const Box = ({
  children,
  onPrevClick,
  onNextClick,
  containerRef,
  contentRef,
  isPrevVisible,
  isNextVisible,
}: any) => {
  return (
    <div className='box' ref={containerRef}>
      {isPrevVisible && (
        <button id='prev' className='box-button' onClick={onPrevClick}>
          <Prev />
        </button>
      )}
      <div className='box-content' ref={contentRef}>
        {children}
        {/* <p>Loading</p> */}
      </div>
      {isNextVisible && (
        <button id='next' className='box-button' onClick={onNextClick}>
          <Next />
        </button>
      )}
    </div>
  );
};

export default Box;
