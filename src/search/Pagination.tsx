import * as React from 'react';
import { Component, MouseEvent } from 'react';

export interface PaginationProps {
  hidePrevious?: boolean;
  hideNext?: boolean;

  onPrevious?: (event: MouseEvent<HTMLButtonElement>) => void;
  onNext?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function Pagination(props: PaginationProps) {
  return (
    <div className='pagination'>
      <button
        onClick={props.onPrevious}
        className='pagination__btn pagination__btn--previous'
        disabled={props.hidePrevious}
      >
        Previous
      </button>
      <button
        onClick={props.onNext}
        className='pagination__btn pagination__btn--next'
        disabled={props.hideNext}
      >
        Next
      </button>
    </div>
  );
}
