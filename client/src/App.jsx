import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth }       from './context/AuthContext'
// import BottomTabBar      from './components/shared/BottomTabBar'
import ProtectedRoute    from './components/ProtectedRoute'
import Home              from './pages/Home'
import Profile           from './pages/Profile'
import Repos             from './pages/Repos'
import Settings          from './pages/Settings'
import Edit              from './pages/Edit'
import AuthPage          from './pages/AuthPage'
import Privacy           from './pages/Privacy'
import Terms             from './pages/Terms'

const hideTabBarOn = ['/auth', '/']

const Layout = ({ children }) => {
  const location   = useLocation()
  const { user }   = useAuth()
  const shouldHide = hideTabBarOn.includes(location.pathname) || !user

  return (
    <>
      {children}
      
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/"        element={<Home />}     />
          <Route path="/auth"    element={<AuthPage />} />
          <Route path="/privacy" element={<Privacy />}  />
          <Route path="/terms"   element={<Terms />}    />

          {/* Protected routes */}
          <Route path="/profile"  element={<ProtectedRoute><Profile /></ProtectedRoute>}  />
          <Route path="/repos"    element={<ProtectedRoute><Repos /></ProtectedRoute>}    />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/edit"     element={<ProtectedRoute><Edit /></ProtectedRoute>}     />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App