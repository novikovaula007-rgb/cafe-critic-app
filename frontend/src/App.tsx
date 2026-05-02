import { Route, Routes } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import PlacesPage from './pages/PlacesPage/PlacesPage';
import PlaceDetailsPage from './pages/PlaceDetailsPage/PlaceDetailsPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import ProtectedRoute from './containers/ProtectedRoute/ProtectedRoute';
import AddPlacePage from './pages/AddPlagePage/AddPlacePage.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PlacesPage />} />
          <Route path="places/:id" element={<PlaceDetailsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="places/new" element={<AddPlacePage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
