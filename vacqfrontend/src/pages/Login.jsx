import { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {reset, login} from "../features/auth/authSlice"

function Login() {
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => {
      return state.auth;
    }
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // redirect when logged in
    if (isSuccess) {
      navigate("/");
    }
    dispatch(reset());
  }, [dispatch, isError, isSuccess, message, navigate, user]);

  const onChange = (e) => {
    setFromData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {email, password};
    dispatch(login(userData));
  };

  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to get support</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
