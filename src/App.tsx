
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store/store';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setUsers, setCurrentUser } from './store/slices/userSlice';
import { setPins } from './store/slices/pinSlice';
import Login from './pages/Login';
import HomeFeed from './pages/HomeFeed';
import PinDetail from './pages/PinDetail';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Layout from './components/Layout';
import initialData from './data/initialData.json';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

function AppContent() {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.user.currentUser);

  useEffect(() => {
    // Initialize data
    const storedUsers = localStorage.getItem('users');
    const storedPins = localStorage.getItem('pins');
    const storedCurrentUser = localStorage.getItem('currentUser');

    if (storedUsers) {
      dispatch(setUsers(JSON.parse(storedUsers)));
    } else {
      dispatch(setUsers(initialData.users as any));
      localStorage.setItem('users', JSON.stringify(initialData.users));
    }

    if (storedPins) {
      dispatch(setPins(JSON.parse(storedPins)));
    } else {
      dispatch(setPins(initialData.pins));
      localStorage.setItem('pins', JSON.stringify(initialData.pins));
    }

    if (storedCurrentUser) {
      dispatch(setCurrentUser(JSON.parse(storedCurrentUser)));
    }
  }, [dispatch]);

  if (!currentUser) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomeFeed />} />
        <Route path="/pin/:pinId" element={<PinDetail />} />
        <Route path="/profile/:userId" element={<Profile />} />
        {currentUser.role === 'admin' && (
          <Route path="/admin" element={<AdminPanel />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Toaster />
      <Sonner />
      <AppContent />
    </BrowserRouter>
  </Provider>
);

export default App;
