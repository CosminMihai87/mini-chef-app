import {
  FC,
  useState, 
  useLayoutEffect,
  ReactNode
} from 'react';
import { createPortal } from 'react-dom';


interface IUsePortalProps {
  children: ReactNode,
  wrapperId: string
}

const UsePortal: FC<IUsePortalProps> = (props) => {
  const {
    children,
    wrapperId = 'react-portal-wrapper'
  } = {...props};
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  const createWrapper = (id: string) => {
    const wrapper = document.createElement('div');
    wrapper.setAttribute('id', id);
    return wrapper;
  };

  const addWrapper = (element: Element) => {
    document.body.insertBefore(
      element,
      document.body.lastElementChild?.nextElementSibling as Node,
    );
  };

  useLayoutEffect(() => {
    const existingParent = document.getElementById(wrapperId);
    const parentElem = existingParent || createWrapper(wrapperId);
    let wrapperCreated = false;

    if (!existingParent) {
      wrapperCreated = true;
      addWrapper(parentElem);
    }
 
    setWrapperElement(parentElem);

    return () => {
      if (wrapperCreated && parentElem.parentNode) {
        parentElem.parentNode.removeChild(parentElem);
      }
    };
  },[wrapperId]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement as Element);
};

export default UsePortal;