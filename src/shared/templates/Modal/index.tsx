import {
  FC,
  ReactNode,
  useEffect, 
  useRef,
  useCallback
} from 'react';
import styles from './Modal.module.scss';
import { CSSTransition } from 'react-transition-group';
import UsePortal from '../../customHooks/usePortal';
import FwButton from '../../templates/Button';
import closeLogo from '../../../assets/images/close-logo.png';

export interface IFwModalProps {
  children: ReactNode,
  isOpen: boolean,
  handleClose: any,
  disableCloseBtn?: boolean,
  disablePrimaryButton?: boolean,
  disableSecondaryButton?: boolean,
  handleBtnPrimary?: any,
  handleBtnSecondary?: any,
  modalBtnPrimaryText?: string,
  modalBtnSecondaryText?: string,
  modalTitleText: string
}

const FwModal: FC<IFwModalProps> = (props) => {
  const {
    children,
    isOpen,
    handleClose,
    disableCloseBtn = false,
    disablePrimaryButton = false,
    disableSecondaryButton = false,
    handleBtnPrimary,
    handleBtnSecondary,
    modalBtnPrimaryText = 'Ok',
    modalBtnSecondaryText = 'Cancel',
    modalTitleText = ''

  } = {...props};
  const modalRef = useRef(null);
  const modalHeaderBtnRef = useRef(null);
  const modalFooterBtnRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e:any) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  const handleBtnPrimaryClick = useCallback(() => {
    handleBtnPrimary();
    handleClose();
  },[handleBtnPrimary, handleClose]);

  const handleBtnSecondaryClick = useCallback(() => {
    handleBtnSecondary();
    handleClose();
  },[handleBtnSecondary, handleClose]);

  const handleBtnClose = useCallback(() => {
    handleClose();
  },[handleClose]);

  // useEffect(()=> {
  //   const buttonRef = !disableCloseBtn ? modalHeaderBtnRef.current && modalHeaderBtnRef?.current?.children[0] :
  //     (!disablePrimaryButton || !disableSecondaryButton) ?
  //       modalFooterBtnRef.current && modalFooterBtnRef?.current?.children[0]:
  //       null
  //   buttonRef && buttonRef?.focus();
  // });

  return (
    <UsePortal wrapperId='react-portal-modal-container'>
      <CSSTransition
        in={isOpen} 
        timeout={100} 
        classNames={{
          enterActive: styles['enter-active'],
          enterDone: styles['enter-done'],
          exitActive: styles['exit-active'],
          exitDone: styles['exit-done']
        }}
				nodeRef={modalRef}
      > 
        <div 
          className={styles['fw-modal']} 
          ref={modalRef}
        >
          <div className={styles['fw-modal-content']}>
            <div className={styles['fw-modal-header']}>
              {modalTitleText &&
                (<div className={styles['fw-modal-header-title']}>
                  <span>{modalTitleText}</span>
                </div>
              )}
              {!disableCloseBtn && (
                <div
                  className={styles['fw-modal-header-button']}
                  ref={modalHeaderBtnRef}
                >
                  <FwButton
                    animation='progress'
                    id='BtnModalHeaderClose'
                    onClick={() => handleBtnClose()} 
                    tooltipText='Close'
                    tooltipTextPlacement='top'
                    variant='secondary'
                  >
                    <img 
                      alt='Close Icon'
                      src={closeLogo}
                    />
                  </FwButton>
                </div>
              )}
            </div>
            <div className={styles['fw-modal-body']}>
              {children}
            </div>
            {(!disableSecondaryButton || !disablePrimaryButton) && (
              <div className={styles['fw-modal-footer']}>
                <div
                  className={styles['fw-modal-footer-buttons']}
                  ref={modalFooterBtnRef}
                >
                  {!disableSecondaryButton && (
                    <FwButton
                      animation='progress'
                      id='BtnModalFooterSecondary'
                      onClick={() => handleBtnSecondaryClick()} 
                      variant='secondary'
                    >
                      <span>{modalBtnSecondaryText}</span>
                    </FwButton>
                  )}
                  {!disablePrimaryButton && (
                    <FwButton
                      animation='progress'
                      id='BtnModalFooterPrimary'
                      onClick={() => handleBtnPrimaryClick()} 
                      variant='primary'
                    >
                      <span>{modalBtnPrimaryText}</span>
                    </FwButton>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </CSSTransition>
    </UsePortal>
  );
};

export default FwModal;