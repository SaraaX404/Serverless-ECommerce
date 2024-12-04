import { useForm } from 'react-hook-form';
import { 
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import { 
  Person, 
  Email, 
  Lock,
  Visibility,
  VisibilityOff 
} from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '../../Context/Auth/Auth.context';
import { toast } from 'react-hot-toast';

interface SignupFormInputs {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerForm, handleSubmit, formState: { errors } } = useForm<SignupFormInputs>();
  const { register, isLoading } = useAuth();

  const onSubmit = async (data: SignupFormInputs) => {
    try {
      console.log('Starting signup with data:', data);
      
      await register(data.email, data.password);
      console.log('Registration successful');
      
      toast.success('Successfully signed up!');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to sign up');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '16px',
          padding: '20px'
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            width: '100%'
          }}
        >
          <Typography 
            component="h1" 
            variant="h4" 
            sx={{ 
              mb: 3,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
            }}
          >
            Sign Up
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: '#FE6B8B' }}/>
                  </InputAdornment>
                ),
              }}
              {...registerForm('name', { 
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name should be at least 2 characters'
                }
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#FE6B8B',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: '#FE6B8B' }}/>
                  </InputAdornment>
                ),
              }}
              {...registerForm('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#FE6B8B',
                  },
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: '#FE6B8B' }}/>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              {...registerForm('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                  message: 'Password must contain at least one letter and one number'
                }
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: '#FE6B8B',
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{
                mt: 3,
                mb: 2,
                height: '48px',
                background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FE6B8B 10%, #FF8E53 70%)',
                  transform: 'scale(1.02)',
                  transition: 'all 0.2s ease-in-out'
                }
              }}
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;
