import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import LoginPage from '@/pages/LoginPage'
import DoctorPage from '@/pages/DoctorPage'
import ReceptionistPage from '@/pages/ReceptionistPage'
import { Toaster } from '@/components/ui/toaster'
import type { User } from '@/lib/schema'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        setUser({
          email: session.user.email || '',
          role: 'doctor' // Default role for now
        })
      }
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setUser({
            email: session.user.email || '',
            role: 'doctor'
          })
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Đang tải...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route 
          path="/login" 
          element={user ? <Navigate to={user.role === 'receptionist' ? '/receptionist' : '/doctor'} /> : <LoginPage />} 
        />
        <Route 
          path="/doctor" 
          element={user ? <DoctorPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/receptionist" 
          element={user ? <ReceptionistPage /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/" 
          element={<Navigate to={user ? (user.role === 'receptionist' ? '/receptionist' : '/doctor') : '/login'} />} 
        />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App