import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { register as registerUser } from './../../features/users/usersThunks';
import { schemaRegister, type RegisterFormData } from './lib/validation';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loading = useAppSelector((state) => state.users.registerLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schemaRegister),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await dispatch(registerUser(data)).unwrap();
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
          <Stack sx={{ gap: 1, mb: 1, textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: '#2D3436' }}>
              Register
            </Typography>
            <Typography sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Create your account to get started
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack sx={{ gap: 2.5 }}>
              <TextField
                fullWidth
                label="Email"
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
                label="Display name"
                error={!!errors.displayName}
                helperText={errors.displayName?.message}
                {...register('displayName')}
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
                {loading ? 'Loading...' : 'Register'}
              </Button>
            </Stack>
          </Box>

          <Typography sx={{ mt: 4, textAlign: 'center', fontWeight: 500 }}>
            Already have an account?{' '}
            <Link
              component={RouterLink}
              to="/login"
              sx={{ fontWeight: 700, textDecoration: 'none', ml: 0.5 }}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegisterPage;
