import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/actions/authAction";
import ModalDialog from "./ModalDialog";

const Login = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    pin: "",
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (modalShow === false && modalContent.title === "Success") {
      navigate("/");
    }
  }, [modalShow, modalContent, navigate]);

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await dispatch(loginUser(formData));

      if (response && response.payload && response.payload.token) {
        setIsLoading(false);
        setModalContent({
          title: "Success",
          message: `${formData.username} logged in successfully`,
        });
        setModalShow(true);
        localStorage.setItem("token", response.payload.token);
      } else {
        setIsLoading(false);
        setModalContent({
          title: "Error",
          message: response.payload.message,
        });
        setModalShow(true);
      }
    } catch (error) {
      throw error
    }
  };

  return (
    <>
      <div className="container auth-container">
        <a
          className="navbar-brand mb-3 d-flex align-items-center justify-content-center"
          href="/"
        >
          <img
            src="https://res.cloudinary.com/dxgjnu4h8/image/upload/v1701614600/L_s6otfz.png"
            alt="lifesimplify"
          ></img>
        </a>
        <h2 className="text-center mb-3">Login to LifeSimplify</h2>
        {isLoading && (
            <div className="loader-container">
              <div className="spinner-border text-light" role="status"></div>
            </div>
          )}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pin" className="form-label">
              PIN
            </label>
            <input
              type="password"
              className="form-control"
              id="pin"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div className="auth-footer text-center mt-3">
          New to LifeSimplify? <a href="/register">Create an account</a>
        </div>
      </div>
      <ModalDialog
        show={modalShow}
        onHide={handleModalClose}
        title={modalContent.title}
        message={modalContent.message}
      />
    </>
  );
};

export default Login;
