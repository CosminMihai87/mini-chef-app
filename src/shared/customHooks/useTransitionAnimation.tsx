/*
    Custom Hook that levereges other Custom React Hooks to give us animation status in real-type 
  and apply the desired transition css style based on these statuses 
*/

import React, {
  useState,
  useEffect,
  CSSProperties
} from 'react';

type AnimationStatus = 'ENTERING' | 'ENTERED' | 'EXITING' | 'EXITED';

interface PropsFromState {
  delay: number;
  defaultStyle: CSSProperties;
  transitionStyle: any;
  show: boolean;
  children: React.ReactNode
  className: string
}

const UseTransitionAnimation: React.FC<PropsFromState> = props => {
  const { 
    delay, 
    defaultStyle, 
    transitionStyle, 
    show,
    children,
    className
  } = { ...props};

  const status: {
    [key in AnimationStatus] : string
  } = {
    ENTERING: 'entering',
    ENTERED: 'entered',
    EXITING: 'exiting',
    EXITED: 'exited'
  };

  //another custom Hook that based on delay, returns both state of type key of AnimationStatus( for example entering, entered, etc.) and it's setState
  const useTransitionState = (delay: number) => {
    const [state, setState] = useState(status.EXITED);

    useEffect(() => {
      let timerId: ReturnType<typeof setTimeout>;
      if (state === status.ENTERING) {
        timerId = setTimeout(()=> setState(status.ENTERED), delay);
      } else if ( state === status.EXITING) {
        timerId = setTimeout(()=> setState(status.EXITED), delay);
      }

      return () => {
        timerId && clearTimeout(timerId);
      };
    });

    return [state,  setState] as const;
  };

  // and another custom Hook that uses the delay and the previous useTransitionState custom hook to output a state of type key of AnimationStatus
  const useTransitionControl = (delay: number) => {
    const [state, setState] = useTransitionState(delay);
    const enter = () => {
      if (state !==  status.EXITING) {
        setState(status.ENTERING);
      }
    };
    const exit = () => {
      if (state !==  status.ENTERING) {
        setState(status.EXITING);
      }
    };
    return [ state, enter, exit] as const;
  };

  const [ state, enter, exit ] = useTransitionControl(delay);

  const style = {
    ...defaultStyle,
    ...transitionStyle[state] ?? {}
  };

  useEffect(() => {
    show ? enter() : exit();
  },[show]);

  return (
    <div
      className={className}
      style={style}
    >
      { children }
    </div>
  );
};

export default UseTransitionAnimation;
