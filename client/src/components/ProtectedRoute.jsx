import { Navigate } from 'react-router-dom'
import { useAuth }  from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-muted text-sm">Loading...</p>
      </div>
    )
  }

  if (!user) return <Navigate to="/auth" replace />

  return children
}

export default ProtectedRoute