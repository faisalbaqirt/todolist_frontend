import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/actions/authAction";
import ModalDialog from "./ModalDialog";

const Register = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    pin: "",
  });
  const [pinValid, setPinValid] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (modalShow === false && modalContent.title === "Success") {
      navigate("/login");
    }
  }, [modalShow, modalContent, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "pin") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });

      if (numericValue.length === 6) {
        setPinValid(true);
      } else {
        setPinValid(false);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.pin.length === 6) {
      try {
        setIsLoading(true);
        const response = await dispatch(registerUser(formData));
        if (
          response.payload.message === "This user is already registered" ||
          response.payload.message === "This username is already registered" ||
          response.payload.message === "This email is already registered"
        ) {
          setIsLoading(false);
          setModalContent({
            title: "Error",
            message: response.payload.message,
          });
          setModalShow(true);
        } else {
          setIsLoading(false);
          setModalContent({
            title: "Success",
            message: "Successfully created an account",
          });
          setModalShow(true);
        }
      } catch (error) {
        throw error;
      }
    } else {
      setModalContent({
        title: "Error",
        message: "PIN must be 6 characters long",
      });
      setModalShow(true);
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
        <h2 className="text-center mb-3">Create an account</h2>
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
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
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
            <div className="auth-validation">
              <span>
                <i
                  className={`bi ${
                    pinValid ? "bi-check-circle-fill" : "bi-x-circle-fill"
                  }`}
                ></i>
              </span>{" "}
              {"  "}
              PIN number must be 6 characters long
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!pinValid}
          >
            Register
          </button>
        </form>
        <div className="auth-footer text-center mt-3">
          Already have an account? <a href="/login">Login</a>
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

export default Register;
