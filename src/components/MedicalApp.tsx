'use client';

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Box, 
  Paper, 
  TextField, 
  Button, 
  Typography,
  Alert
} from '@mui/material';
import { supabase } from '@/lib/supabaseClient';
import DoctorView from './DoctorView';
import ReceptionistView from './ReceptionistView';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

interface User {
  email: string;
  role?: string;
}

const MedicalApp: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser({ email: session.user.email || '', role: 'doctor' });
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleAuth = async () => {
    setError('');
    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          setUser({ email: data.user.email || '', role: 'doctor' });
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        if (data.user) {
          setUser({ email: data.user.email || '', role: 'doctor' });
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box className="min-h-screen flex items-center justify-center">
          <Typography variant="h5">Đang tải...</Typography>
        </Box>
      </ThemeProvider>
    );
  }

  if (user) {
    // Hiển thị giao diện chính dựa trên role
    if (user.role === 'receptionist') {
      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ReceptionistView />
        </ThemeProvider>
      );
    }
    
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DoctorView />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Paper elevation={8} className="w-full max-w-md p-8">
          <Box className="text-center mb-6">
            <Typography variant="h4" className="text-gray-800 mb-2 font-bold">
              Hệ Thống Bệnh Nhi
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              Đăng nhập để tiếp tục
            </Typography>
          </Box>

          <Box component="form" className="space-y-4">
            <TextField
              fullWidth
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />

            {error && (
              <Alert severity="error" className="mb-4">
                {error}
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              onClick={handleAuth}
              className="py-3"
              size="large"
            >
              {isLogin ? 'Đăng nhập' : 'Đăng ký'}
            </Button>

            <Box className="text-center mt-4">
              <Button
                variant="text"
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600"
              >
                {isLogin ? 'Chưa có tài khoản? Đăng ký' : 'Đã có tài khoản? Đăng nhập'}
              </Button>
            </Box>
          </Box>

          <Box className="text-center mt-6">
            <Typography variant="caption" className="text-gray-500">
              © 2025 Dr. Lee Min Khang. All Rights Reserved.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default MedicalApp;