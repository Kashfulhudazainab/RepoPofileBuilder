import LanguageFilter from "../components/Repo/LanguageFilter.jsx";
import CurateHero from "../components/Repo/RepoHero.jsx";
import SearchBar from "../components/Repo/Search";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";
import EditPage from "../components/Repo/MainPage";

const Repos = () => {
  return (
    <>
    <Navbar/>
    <CurateHero/>
    <SearchBar/>
<LanguageFilter/>
<EditPage/>
<Footer/>

    </>
  );
};

export default Repos;