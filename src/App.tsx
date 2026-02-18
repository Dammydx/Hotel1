import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/admin/rooms" element={<ProtectedRoute><AdminRooms /></ProtectedRoute>} />
            <Route path="/admin/amenities" element={<ProtectedRoute><AdminAmenities /></ProtectedRoute>} />
            <Route path="/admin/dining" element={<ProtectedRoute><AdminDining /></ProtectedRoute>} />
            <Route path="/admin/venues" element={<ProtectedRoute><AdminVenues /></ProtectedRoute>} />
            <Route path="/admin/gallery" element={<ProtectedRoute><AdminGallery /></ProtectedRoute>} />
            <Route path="/admin/testimonials" element={<ProtectedRoute><AdminTestimonials /></ProtectedRoute>} />
            <Route path="/admin/messages" element={<ProtectedRoute><AdminMessages /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute><AdminSettings /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;