/**
 * @since 2019-07-19 19:14
 * @author vivaxy
 */
import { useEffect, useRef } from 'react';

interface OnAppear {
  (...args: any[]): any;
}

interface OnDisappear {
  (...args: any[]): any;
}

type HTMLElementWithAppear = HTMLElement & {
  isAppear?: boolean;
  onAppear?: OnAppear;
  onDisappear?: OnDisappear;
};

let intersectionObserverMap = new Map();

// window.intersectionObserverMap = intersectionObserverMap;

function intersectionObserverHandler(entries: IntersectionObserverEntry[]) {
  entries.forEach(function(entry) {
    const el = entry.target as HTMLElementWithAppear;
    if (entry.isIntersecting) {
      el.isAppear = true;
      if (el.onAppear) {
        el.onDisappear = el.onAppear(entry);
      }
    } else {
      el.isAppear = false;
      if (el.onDisappear) {
        el.onDisappear(entry);
      }
    }
  });
}

function getIntersectionObserver(options: any) {
  if (intersectionObserverMap.has(options)) {
    return intersectionObserverMap.get(options);
  }
  const intersectionObserver = new IntersectionObserver(
    intersectionObserverHandler,
  );
  intersectionObserverMap.set(options, intersectionObserver);
  return intersectionObserver;
}

function tryDeleteIntersectionObserver(options: any) {
  if (intersectionObserverMap.has(options)) {
    const intersectionObserver = intersectionObserverMap.get(options);
    if (intersectionObserver.observingElements.length === 0) {
      delete intersectionObserver.observingElements;
      intersectionObserver.disconnect();
      intersectionObserverMap.delete(options);
    }
  }
}

function observe(el: HTMLElementWithAppear, onAppear: OnAppear, options: any) {
  el.onAppear = onAppear;
  const intersectionObserver = getIntersectionObserver(options);
  intersectionObserver.observe(el);
  intersectionObserver.observingElements =
    intersectionObserver.observingElements || [];
  intersectionObserver.observingElements.push(el);
}

function unobserve(el: HTMLElementWithAppear, options: any) {
  const intersectionObserver = getIntersectionObserver(options);
  if (el.isAppear && el.onDisappear) {
    el.isAppear = false;
    el.onDisappear({ target: el, isIntersecting: false });
  }
  intersectionObserver.unobserve(el);
  const { observingElements = [] } = intersectionObserver;
  observingElements.splice(observingElements.indexOf(el), 1);
  tryDeleteIntersectionObserver(options);
  delete el.onAppear;
  delete el.onDisappear;
}

export default function useAppear(onAppear: OnAppear, options?: any) {
  const ref = useRef(null);

  useEffect(function() {
    const el = ref.current as (HTMLElementWithAppear | null);
    if (el) {
      observe(el, onAppear, options);
      return function() {
        unobserve(el, options);
      };
    }
  }, []);

  return [ref];
}
