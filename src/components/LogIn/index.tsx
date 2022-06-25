import {
  FC,
  useRef,
  RefObject
} from 'react';
import { 
  Formik, 
  FormikHelpers
} from 'formik'; 
import FwButton from '../../shared/templates/Button';
import { 
  AnimationType, 
  InputType, 
  ButtonType,
  TemplateVariant 
} from '../../shared/constants';
import * as Yup from 'yup';
import FwInput from '../../shared/templates/Input';
import GoogleLogo from '../../assets/images/social-media/google-logo.svg';
import FacebookLogo from '../../assets/images/social-media/facebook-logo.svg';
import GitLogo from '../../assets/images/social-media/git-logo.svg';
import style from './LogIn.module.scss';

const validationSchema = Yup.object({
  username: Yup.string()
    .max(255,'Must be less or equal than 255 chars!')
    .email('Not a proper email!')
    .required('Field required!'),
  password: Yup.string()
    .required('Field required!'),
});

export interface ILogInProps {}

const LogIn: FC<ILogInProps> = (props) => {
  const btnGoogle = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnFacebook = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnGit = useRef<RefObject<HTMLButtonElement> | null>(null);

  const onSubmit = (_values: any, submitProps: FormikHelpers<any>) => {
    // calling login service here
    submitProps.resetForm();
    console.log('submitting!');
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formik => {
        return (
          <div className={style['log-in']}>
            <div className={style.username}>
              <FwInput
                formikValidFrame={true}
                label='Username:'
                name='username'
                placeholder='Type email address...'
                type={InputType.EMAIL}
              />
            </div>
            <div className={style.password}>
              <FwInput
                formikValidFrame={true}
                label='Password:'
                name='password'
                placeholder='Type password...'
                type={InputType.PASSWORD}
              />
            </div>
            <div className={style.buttons}>
              <div className={style['login-buttons']}>
                <div className={style.login}>
                  <FwButton
                    animation={AnimationType.PROGRESS}
                    onClick={() => onSubmit}
                    type={ButtonType.SUBMIT}
                    variant={TemplateVariant.PRIMARY}
                  >
                    <span>Log In</span>
                  </FwButton>
                </div>
                <div className={style['sign-up']}>
                  <FwButton
                    animation={AnimationType.PROGRESS}
                    onClick={() => console.log('sign up')} 
                    variant={TemplateVariant.SECONDARY}
                  >
                    <span>Sign Up</span>
                  </FwButton>
                </div>
              </div>
              <div className={style['media-buttons']}>
                <div className={style.google}>
                  <FwButton
                    animation={AnimationType.JELLO}
                    id='btnGoogleID'
                    innerRef={btnGoogle}
                    onClick={()=>console.log('Log In with Google!')}
                    tooltipText='Log In with Google'
                    variant={TemplateVariant.SECONDARY}
                  >
                    <GoogleLogo 
                      height='25px'
                      width='25px' 
                    />
                  </FwButton>
                </div> 
                <div className={style.facebook}>
                  <FwButton
                    animation={AnimationType.JELLO}
                    id='btnFacebookID'
                    innerRef={btnFacebook}
                    onClick={()=>console.log('Log In with Facebook!')}
                    tooltipText='Log In with Facebook'
                    variant={TemplateVariant.SECONDARY}
                  >
                    <FacebookLogo 
                      height='25px'
                      width='25px' 
                    />
                  </FwButton>
                </div> 
                <div className={style.git}>
                  <FwButton
                    animation={AnimationType.JELLO}
                    id='btnGitID'
                    innerRef={btnGit}
                    onClick={()=>console.log('Log In with Git!')}
                    tooltipText='Log In with Git'
                    variant={TemplateVariant.SECONDARY}
                  >
                    <GitLogo 
                      height='25px'
                      width='25px' 
                    />
                  </FwButton>
                </div> 
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default LogIn;