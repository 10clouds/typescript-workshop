import * as React from 'react';
import { Component } from 'react';

export namespace Pagination {
  export interface Props {
    hidePrevious?: boolean;
    hideNext?: boolean;

    onPrevious?: () => void;
    onNext?: () => void;
  }
}

export function Pagination(props: Pagination.Props) {
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
