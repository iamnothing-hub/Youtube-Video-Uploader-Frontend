
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { AuthProvider } from './helper/AuthContext.jsx'



createRoot(document.getElementById('root')).render(

  <GoogleOAuthProvider clientId='941342337732-ejq01c1vqhqj15ktolaid1fueik2e3s5.apps.googleusercontent.com'>
    <AuthProvider>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </AuthProvider>
  </GoogleOAuthProvider>

)
