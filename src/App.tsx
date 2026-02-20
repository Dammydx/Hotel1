import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Rooms from './pages/Rooms';
import Amenities from './pages/Amenities';
import Dining from './pages/Dining';
import Events from './pages/Events';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import RoomDetail from './pages/RoomDetail';
import DiningDetail from './pages/DiningDetail';
import VenueDetail from './pages/VenueDetail';
import NotFound from './pages/NotFound';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminLayout from './components/Layout/AdminLayout';
import AdminRooms from './pages/admin/AdminRooms';
import AdminAmenities from './pages/admin/AdminAmenities';
import AdminDining from './pages/admin/AdminDining';
import AdminVenues from './pages/admin/AdminVenues';
import AdminGallery from './pages/admin/AdminGallery';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSettings from './pages/admin/AdminSettings';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:slug" element={<RoomDetail />} />
            <Route path="/amenities" element={<Amenities />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/dining/:slug" element={<DiningDetail />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:slug" element={<VenueDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />

            {/* Admin routes */}
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="rooms" element={<AdminRooms />} />
              <Route path="amenities" element={<AdminAmenities />} />
              <Route path="dining" element={<AdminDining />} />
              <Route path="venues" element={<AdminVenues />} />
              <Route path="gallery" element={<AdminGallery />} />
              <Route path="testimonials" element={<AdminTestimonials />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;