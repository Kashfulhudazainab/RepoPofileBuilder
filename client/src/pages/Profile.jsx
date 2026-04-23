import CoreTechnologies    from "../components/Profile/CoreTechnologies.jsx";
import FeaturedRepositories from "../components/Profile/FeaturedCards.jsx";
import PerformanceMetrics  from "../components/Profile/PerformanceMetrices.jsx";
import ProfileHero         from "../components/Profile/ProfileHero";
import Footer              from "../components/shared/Footer.jsx";
import Navbar              from "../components/shared/Navbar.jsx";
import { useAuth }         from "../context/AuthContext";
import { useNavigate }     from "react-router-dom";
import { useEffect }       from "react";

const Profile = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // If not logged in, redirect to auth
  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <p className="text-text-secondary text-sm">Loading profile...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <ProfileHero user={user} />
      <PerformanceMetrics />
      <CoreTechnologies />
      <FeaturedRepositories />
      <Footer />
    </>
  );
};

export default Profile;