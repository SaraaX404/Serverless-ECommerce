import { FC } from 'react';
import { LoginComponent } from '../../Components';
import Layout from '../../Components/Layout/Layout.component';

const Login: FC = () => {
  return (
    <Layout
      title="Login | Your App Name"
      description="Login to access your account"
      keywords="login, signin, authentication"
    >
      <LoginComponent />
    </Layout>
  );
};

export default Login;
