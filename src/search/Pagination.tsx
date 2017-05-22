import * as React from 'react';
import { Component } from 'react';

interface PaginationProps {
  onNext: () => void;
  onPrevious: () => void;
  hideNext: boolean;
  hidePrevious: boolean;
}

export function Pagination(props: PaginationProps) {
  return (
    <div className='pagination'>
      <button
        onClick={props.onPrevious}
        className='pagination__btn pagination__btn--previous'
        hidden={props.hidePrevious}
      >
        Previous
      </button>
      <button
        onClick={props.onNext}
        className='pagination__btn pagination__btn--next'
        hidden={props.hideNext}
      >
        Next
      </button>
    </div>
  );
}