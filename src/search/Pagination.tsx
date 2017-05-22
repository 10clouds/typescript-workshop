import * as React from 'react';
import { Component } from 'react';

interface PaginationProps {
  onNext: () => void;
  onPrevious: () => void;
  hideNext: boolean;
  hidePrevious: boolean;
}

export class Pagination extends Component<PaginationProps, undefined> {
  render() {
    return (
      <div className='pagination'>
        <button 
          onClick={this.props.onPrevious}
          className='pagination__btn pagination__btn--previous'
          hidden={this.props.hidePrevious}
        >
          Previous
        </button>
        <button 
          onClick={this.props.onNext}
          className='pagination__btn pagination__btn--next'
          hidden={this.props.hideNext}
        >
          Next
        </button>
      </div>
    );
  }
}