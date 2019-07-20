import React, { useState } from 'react';
import Component from './Component';

export default function App() {
  const [mount, setMount] = useState(true);
  const [count, setCount] = useState(0);

  function handleMountClick() {
    setMount(!mount);
  }

  return (
    <>
      <button onClick={handleMountClick}>{mount ? 'unmount' : 'mount'}</button>
      <button onClick={() => setCount((v) => v + 1)}>add {count}</button>
      {mount && <Component />}
      <button onClick={handleMountClick}>{mount ? 'unmount' : 'mount'}</button>
    </>
  );
}
