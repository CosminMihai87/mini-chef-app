/*
    Custom Hook that levereges other Custom React Hooks to give us animation status in real-type 
  and apply the desired transition css style based on these statuses 
*/

import React, {
  useState,
  useEffect
} from 'react';

type AnimationStatus = 'ENTERING' | 'ENTERED' | 'EXITING' | 'EXITED';

interface PropsFromState {
  duration: number;
  defaultStyle: React.CSSProperties;
  transitionStyle: any;
  show: boolean;
  children: React.ReactNode
}

const UseTransitionAnimation: React.FC<PropsFromState> = props => {
  const { 
    duration, 
    defaultStyle, 
    transitionStyle, 
    show,
    children 
  } = { ...props};

  const status: {
    [key in AnimationStatus] : string
  } = {
    ENTERING: 'entering',
    ENTERED: 'entered',
    EXITING: 'exiting',
    EXITED: 'exited'
  };

  //another custom Hook that based on duration, returns both state of type key of AnimationStatus( for example entering, entered, etc.) and it's setState
  const useTransitionState = (duration: number) => {
    const [state, setState] = useState(status.EXITED);

    useEffect(() => {
      let timerId: ReturnType<typeof setTimeout>;
      if (state === status.ENTERING) {
        timerId = setTimeout(()=> setState(status.ENTERED), duration);
      } else if ( state === status.EXITING) {
        timerId = setTimeout(()=> setState(status.EXITED), duration);
      }

      return () => {
        timerId && clearTimeout(timerId);
      };
    });

    return [state,  setState] as const;
  };

  // and another custom Hook that uses the duration and the previous useTransitionState custom hook to output a state of type key of AnimationStatus
  const useTransitionControl = (duration: number) => {
    const [state, setState] = useTransitionState(duration);
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

  const [ state, enter, exit ] = useTransitionControl(duration);

  const style = {
    ...defaultStyle,
    ...transitionStyle[state] ?? {}
  };

  useEffect(() => {
    show ? enter() : exit();
  },[show]);

  return (
    <div
      style={style}
    >
      { children }
    </div>
  );
};

export default UseTransitionAnimation;
