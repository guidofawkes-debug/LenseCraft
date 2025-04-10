
import { QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import CartPage from './pages/CartPage';
import InventoryPage from './pages/InventoryPage';
import CheckoutPage from './pages/checkout';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import NotFound from './pages/not-found';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/home',
    element: (
      <>
        <Navbar />
        <HomePage />
        <Footer />
      </>
    )
  },
  {
    path: '/products',
    element: (
      <>
        <Navbar />
        <ProductsPage />
        <Footer />
      </>
    )
  },
  {
    path: '/product/:id',
    element: (
      <>
        <Navbar />
        <ProductDetailPage />
        <Footer />
      </>
    )
  },
  {
    path: '/cart',
    element: (
      <>
        <Navbar />
        <CartPage />
        <Footer />
      </>
    )
  },
  {
    path: '/checkout/:sessionId',
    element: (
      <>
        <Navbar />
        <CheckoutPage />
        <Footer />
      </>
    )
  },
  {
    path: '/checkout/success',
    element: (
      <>
        <Navbar />
        <CheckoutSuccessPage />
        <Footer />
      </>
    )
  },
  {
    path: '/about',
    element: (
      <>
        <Navbar />
        <AboutPage />
        <Footer />
      </>
    )
  },
  {
    path: '/contact',
    element: (
      <>
        <Navbar />
        <ContactPage />
        <Footer />
      </>
    )
  },
  {
    path: '/inventory',
    element: (
      <>
        <Navbar />
        <InventoryPage />
        <Footer />
      </>
    )
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
