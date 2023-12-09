import Intro from "../components/Intro";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <div className="home-section">
        <Navbar />
        <Intro />
        <Footer />
      </div>
    </>
  );
};

export default Home;
