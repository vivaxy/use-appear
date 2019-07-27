/**
 * @since 2019-07-19 19:14
 * @author vivaxy
 */
import { useEffect, useRef } from 'react';
import { observe } from 'appear-event';

interface OnAppear {
  (...args: any[]): any;
}

type ElementWithAppear = Element & {
  __newOnAppears?: OnAppear[];
};

export default function useAppear(onAppear: OnAppear, options?: any) {
  const ref = useRef(null);
  function wrappedOnAppear(e: Event) {
    const onDisappear = onAppear(e);
    const el = e.target as ElementWithAppear;
    let i;
    if (
      el &&
      onDisappear &&
      el.__newOnAppears &&
      (i = el.__newOnAppears.indexOf(onAppear)) !== -1
    ) {
      el.__newOnAppears.splice(i, 1);
      el.addEventListener('disappear', onDisappear);
    }
  }

  useEffect(function() {
    const el = ref.current as (ElementWithAppear | null);
    if (el) {
      el.__newOnAppears = el.__newOnAppears || [];
      el.__newOnAppears.push(onAppear);
      el.addEventListener('appear', wrappedOnAppear);
      observe(el, options);
      return function() {
        el.removeEventListener('appear', wrappedOnAppear);
      };
    }
  }, []);

  return [ref];
}
