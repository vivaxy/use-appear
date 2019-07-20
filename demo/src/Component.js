/**
 * @since 2019-07-19 19:13
 * @author vivaxy
 */
import React from 'react';
import useAppear from './lib/index';

export default function Component() {
  const [ref1] = useAppear(function(entry) {
    console.log('appear 1', entry);
    return function(entry) {
      console.log('disappear 1', entry);
    };
  });

  const [ref2] = useAppear(function(entry) {
    console.log('appear 2', entry);
    return function(entry) {
      console.log('disappear 2', entry);
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
