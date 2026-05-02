import { Outlet } from 'react-router-dom';
import Container from '@mui/material/Container';
import AppToolbar from '../AppToolbar/AppToolbar.tsx';

const Layout = () => {
  return (
    <>
      <AppToolbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;
