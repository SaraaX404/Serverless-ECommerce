import { FC, ReactNode, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Box, Container } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/Auth';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout: FC<LayoutProps> = ({
  children,
  title = 'Your App Name',
  description = 'Default description of your application',
  keywords = 'react, typescript, material-ui'
}) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const publicPaths = ['/login', '/signup'];
    const isPublicPath = publicPaths.includes(pathname);

    if (isAuthenticated && isPublicPath) {
      navigate('/');
    }

    if (!isAuthenticated && !isPublicPath) {
      navigate('/login');
    }
  }, [isAuthenticated, pathname, navigate]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
        }}
      >
        <Container 
          maxWidth="lg"
          sx={{
            flex: 1,
            py: 4,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </Container>
      </Box>
    </HelmetProvider>
  );
};

export default Layout;
