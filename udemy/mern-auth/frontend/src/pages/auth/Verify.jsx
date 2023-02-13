import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, RESET, verifyUser } from "../../redux/features/auth/authSlice";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { useEffect } from "react";
const Verify = () => {
  const dispatch = useDispatch();
  const redirection = () => {
    navigate("/profile");
  };
  const navigate = useNavigate();
  const { verificationToken } = useParams();
  const { isLoading, user } = useSelector((state) => state.auth);

  const verifyAccount = async () => {
    await dispatch(verifyUser(verificationToken));
    await dispatch(RESET());
    redirection();
  };
  useEffect(() => {
    if (user?.isVerified === true) {
      console.log("adasdasklmk");
      navigate("/profile");
    }
  }, [navigate, user]);

  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className="--center-all">
          <h2>Account Verification</h2>
          <p>To verify your account, click the button below...</p>
          <br />
          <button onClick={verifyAccount} className="--btn --btn-primary ">
            Verify Account
          </button>
        </div>
      </section>
    </>
  );
};

export default Verify;
