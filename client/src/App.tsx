import AppContent from './components/AppContent'
import ThemeContextProvider from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'



const App = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeContextProvider>
  )
}

export default App