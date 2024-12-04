import { SignupComponent } from '../../Components/Signup';
import { LayoutComponent } from '../../Components/Layout';

const SignupPage = () => {
  return (
    <LayoutComponent
      title="Sign Up | Your App Name"
      description="Create a new account"
      keywords="signup, register, create account"
    >
      <SignupComponent />
    </LayoutComponent>
  );
};

export default SignupPage;
