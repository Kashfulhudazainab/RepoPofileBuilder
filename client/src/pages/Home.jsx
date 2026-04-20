import CTA from '../components/Home/CTA.jsx';
import Features from '../components/Home/Features.jsx';
import Hero from '../components/Home/Hero.jsx';
import RepoCard from '../components/Home/RepoCard.jsx';
import Footer from '../components/shared/Footer.jsx';
import Navbar from '../components/shared/Navbar.jsx';

const Home = () => {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <Hero/>
      <RepoCard/>
<Features/>
<CTA/>
      <Footer/>
    </div>
  );
};

export default Home;