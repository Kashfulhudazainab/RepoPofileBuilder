import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home     from './pages/Home'
import Profile  from './pages/Profile'
import Repos    from './pages/Repos'
import Settings from './pages/Settings'
import Edit     from './pages/Edit'
import AuthPage from './pages/AuthPage'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"         element={<Home />}     />
        <Route path="/profile"  element={<Profile />}  />
        <Route path="/repos"    element={<Repos />}    />
        <Route path="/settings" element={<Settings />} />
        <Route path="/edit"     element={<Edit />}     />
        <Route path="/auth"     element={<AuthPage />} />
        <Route path="/privacy"     element={<Privacy/>} />
        <Route path="/terms"     element={<Terms />} />

        {/* Catch all unknown routes → redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App