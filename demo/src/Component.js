/**
 * @since 2019-07-19 19:13
 * @author vivaxy
 */
import React from 'react';
import useAppear from './lib/index';

export default function Component() {
  const [ref1] = useAppear(function(e) {
    console.log('appear 1', e);
    return function(e) {
      console.log('disappear 1', e);
    };
  });

  const [ref2] = useAppear(function(e) {
    console.log('appear 2', e);
    return function(e) {
      console.log('disappear 2', e);
    };
  });

  return (
    <div>
      <div className="item" ref={ref1} />
      <div className="placeholder" />
      <div className="placeholder" />
      <div className="placeholder" />
      <div className="placeholder" />
      <div className="placeholder" />
      <div className="placeholder" />
      <div className="item" ref={ref2} />
    </div>
  );
}
