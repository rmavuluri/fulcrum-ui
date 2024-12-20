import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoutes } from './routes';
import { PrivateRoute } from './components/auth/PrivateRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { StorageService } from './services/storageService';
import { AuthService } from './services/authService';

// Initialize storage and auth
StorageService.initialize();
AuthService.initialize();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {AppRoutes}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;