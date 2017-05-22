import * as React from 'react';
import { Component } from 'react';

export function Pagination(props) {
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
