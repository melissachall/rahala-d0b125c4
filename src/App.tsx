
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

import HomePage from "./pages/HomePage";
import FlightsPage from "./pages/FlightsPage";
import ExplorePage from "./pages/ExplorePage";
import ActivitiesPage from "./pages/ActivitiesPage";
import CityDetailPage from "./pages/CityDetailPage";
import AttractionDetailPage from "./pages/AttractionDetailPage";
import ActivityDetailPage from "./pages/ActivityDetailPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<><HomePage /><Navigation /></>} />
                <Route path="/flights" element={<><FlightsPage /><Navigation /></>} />
                <Route path="/explore" element={<><ExplorePage /><Navigation /></>} />
                <Route path="/activities" element={<><ActivitiesPage /><Navigation /></>} />
                <Route path="/city/:cityId" element={<><CityDetailPage /><Navigation /></>} />
                <Route path="/attraction/:attractionId" element={<><AttractionDetailPage /><Navigation /></>} />
                <Route path="/activity/:activityId" element={<><ActivityDetailPage /><Navigation /></>} />
                <Route path="/cart" element={<><CartPage /><Navigation /></>} />
                <Route path="/login" element={<><LoginPage /><Navigation /></>} />
                <Route path="/register" element={<><RegisterPage /><Navigation /></>} />
                <Route path="/profile" element={<><ProfilePage /><Navigation /></>} />
                <Route path="*" element={<><NotFound /><Navigation /></>} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
