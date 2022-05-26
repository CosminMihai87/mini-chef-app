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
import CloseLogo from '../../../assets/images/close-logo.svg';

export interface IFwModalProps {
  children: ReactNode,
  isOpen: boolean,
  handleClose: () => void,
  disableCloseBtn?: boolean,
  disablePrimaryButton?: boolean,
  disableSecondaryButton?: boolean,
  handleBtnPrimary?: () => void,
  handleBtnSecondary?: () => void,
  closeOnPrimaryButtonClick?: boolean,
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
    handleBtnPrimary = () => {
      return undefined; 
    },
    handleBtnSecondary = () => {
      return undefined; 
    },
    closeOnPrimaryButtonClick = true,
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
    closeOnPrimaryButtonClick && handleClose();
  },[handleBtnPrimary, handleClose]);

  const handleBtnSecondaryClick = useCallback(() => {
    handleBtnSecondary();
    handleClose();
  },[handleBtnSecondary, handleClose]);

  const handleBtnClose = useCallback(() => {
    handleClose();
  },[handleClose]);

  return (
    <UsePortal wrapperId='react-portal-modal-container'>
      <CSSTransition
        classNames={{
          enterActive: styles['enter-active'],
          enterDone: styles['enter-done'],
          exitActive: styles['exit-active'],
          exitDone: styles['exit-done']
        }} 
        in={isOpen} 
        nodeRef={modalRef}
        timeout={100}
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
                    <CloseLogo 
                      height='30px'
                      width='30px'
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