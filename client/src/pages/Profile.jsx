
import CoreTechnologies from "../components/Profile/CoreTechnologies.jsx";
import FeaturedRepositories from "../components/Profile/FeaturedCards.jsx";
import PerformanceMetrics from "../components/Profile/PerformanceMetrices.jsx";
import ProfileHero from "../components/Profile/ProfileHero";
import RepoCard from "../components/Profile/RepoCard.jsx";
import Footer from "../components/shared/Footer.jsx";
import Navbar from "../components/shared/Navbar.jsx";

const Profile = () => {
  return (
    <>
    <Navbar/>
    <ProfileHero/>
    <PerformanceMetrics/>
    <CoreTechnologies/>
    {/* <RepoCard/> */}
    <FeaturedRepositories/>
    <Footer/>
    </>
  );
};

export default Profile;