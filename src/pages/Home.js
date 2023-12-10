import Intro from "../components/Intro";
import Todolist from "../components/Todolist";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <>
      <div className="home-section">
        <Navbar />
        {isAuthenticated ? <Todolist /> : <Intro />}
        <Footer />
      </div>
    </>
  );
};

export default Home;
