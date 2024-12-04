import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SignupPage, LoginPage, MarketplacePage, ProductDetailsPage } from './Pages'
import { AuthProvider, CartProvider } from './Context'
import { Toaster } from 'react-hot-toast'
function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Toaster />
          <Routes>
            <Route path="/signup" element={<SignupPage  />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<MarketplacePage />} />
            <Route path="/product/:id" element={<ProductDetailsPage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
