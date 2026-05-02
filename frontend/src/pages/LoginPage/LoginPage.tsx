import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { schemaLogin, type LoginFormData } from './lib/validation';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { login } from '../../features/users/usersThunks.ts';

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.users.loginLoading);
  const loginError = useAppSelector((state) => state.users.loginError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schemaLogin),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            p: { xs: 4, md: 5 },
            borderRadius: '30px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
          }}
        >
          <Stack sx={{ gap: 1, mb: 4, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#2D3436' }}>
              Login
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Enter your details to continue
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            {loginError && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: '12px' }}>
                {loginError.error}
              </Alert>
            )}

            <Stack sx={{ gap: 2.5 }}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                  },
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register('password')}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '15px',
                    backgroundColor: '#fff',
                  },
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  py: 1.8,
                  borderRadius: '15px',
                  fontWeight: 700,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)',
                }}
              >
                {loading ? 'Loading...' : 'Login'}
              </Button>
            </Stack>
          </Box>

          <Typography sx={{ mt: 4, textAlign: 'center', fontWeight: 500 }}>
            Don’t have an account?{' '}
            <Link
              component={RouterLink}
              to="/register"
              sx={{ fontWeight: 700, textDecoration: 'none', ml: 0.5 }}
            >
              Register
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
