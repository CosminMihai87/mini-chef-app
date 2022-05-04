/*
    Custom Hook that returns details about scrolling and the scroll position details
*/

import {
  useState,
  useEffect,
  useRef,
  RefObject
} from 'react'; 
  
function useScrollPosition<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
): {
    hitBottomOfPage: boolean,
    percentageScrolled: number
  } {
    
  const  [state, setState] = useState({
    hitBottomOfPage: true,
    percentageScrolled: 0
  }); 

  function useEventListener<
    KW extends keyof WindowEventMap,
    KH extends keyof HTMLElementEventMap,
    T extends HTMLElement | void = void,
  >(
    eventName: KW | KH,
    handler: (
      event: WindowEventMap[KW] | HTMLElementEventMap[KH] | Event,
    ) => void,
    element?: RefObject<T>,
  ) { 
    const savedHandler = useRef(handler);

    useEffect(() => {
      if (null !== savedHandler.current)
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
      // Check if Element Exists, and if it supports the event
      // const targetElement: T | Window = element?.current || window
      const targetElement: Window = window;
      if (!(targetElement && targetElement.addEventListener)) {
        return;
      }

      // Create event listener that calls handler function stored in ref
      const eventListener:  typeof handler = event => savedHandler.current(event);

      // Add event listener
      targetElement.addEventListener(eventName, eventListener);

      // Remove event listener on cleanup
      return () => {
        targetElement.removeEventListener(eventName, eventListener);
      };
    }, [eventName]);
  }

  const handler = (event: Event) => {
    setState({
      hitBottomOfPage: elementRef.current ? (elementRef.current.scrollHeight - window.scrollY !== window.innerHeight? false : true ) : false,
      percentageScrolled: elementRef.current ? Math.round((window.scrollY * 100) / (elementRef.current.scrollHeight - window.innerHeight)) : 0,
    });
  };

  // Add event listener using our hook
  useEventListener('scroll', handler, elementRef); 

  return state;
}

export default useScrollPosition;
