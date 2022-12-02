import React from "react";
import { useState } from "react";
import Avatar from "../avatar/Avatar";
import FormInput from "../formInput/FormInput.components";
import images from "../../assets/images/images.json";
import UploadControl from "../uploadControll/UploadControl";
import axios from "axios";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  updateUserAfterSignUp,
} from "../../utils/firebase/firebase.utils";

function SignUp() {
  const [picLoading, setPicLoading] = useState(false);
  const [number, setNumber] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [photoLink, setPhotoLink] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const toggleSwitch = (e, nr) => {
    setImageURL(e.target.src);
    setNumber(nr);
    // setImageURL(e.targe);
  };
  const writeToMongo = async (user) => {
    const { email, uid } = user;
    let obj = {
      uid,
      displayName: name + " " + lastName,
      email: email,
      // createdAt,
      following: [],
      followers: [],
      photoURL: imageURL
        ? imageURL
        : "https://www.refugee-action.org.uk/wp-content/uploads/2016/10/anonymous-user.png",
    };
    const config = {
      ...obj,
      headers: {
        "Content-type": "application/JSON",
      },
    };
    try {
      if (user) {
        await axios.post("http://localhost:3333/api/user/", config);
      }
    } catch (e) {}
  };
  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      alert("Please Select an Image!");
      return;
    }

    if (
      pics.target.files[0].type === "image/jpeg" ||
      pics.target.files[0].type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics.target.files[0]);
      data.append("upload_preset", "bx672nek");
      data.append("cloud_name", "drtiqizbn");
      fetch("https://api.cloudinary.com/v1_1/drtiqizbn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setImageURL(data.url.toString());
          setPhotoLink(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
          setNumber(5);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      alert("Please Select an Image !!");
      setPicLoading(false);
      return;
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    if (!name || !lastName) {
      alert("Fill Name/Last name section");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      if (user) {
        await writeToMongo(user);
      }
      await createUserDocumentFromAuth(user, {
        name,
        imageURL,
        lastName,
      });

      //   await updateUserAfterSignUp(name, lastName, imageURL);
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };
  const resetFormFields = () => {
    setName("");
    setConfirmPassword("");
    setEmail("");
    setLastName("");
    setPassword("");
  };
  return (
    <>
      <form onSubmit={handleSubmit} action="" className="authContainer_form">
        <div className="authContainer_form-item">
          <FormInput
            type={"text"}
            placeholderText={"Your name"}
            classNameText={"half"}
            func={setName}
            values={name}
          ></FormInput>

          <FormInput
            type={"text"}
            placeholderText={"Last name"}
            classNameText={"half"}
            func={setLastName}
            values={lastName}
          ></FormInput>
        </div>
        <div className="authContainer_form-item">
          <FormInput
            type={"email"}
            placeholderText={"Your Email"}
            func={setEmail}
            values={email}
          ></FormInput>
        </div>
        <div className="authContainer_form-item">
          <FormInput
            classNameText={"half"}
            type={"password"}
            placeholderText={"Password"}
            func={setPassword}
            values={password}
          ></FormInput>

          <FormInput
            classNameText={"half"}
            type={"password"}
            placeholderText={"Confirm password"}
            func={setConfirmPassword}
            values={confirmPassword}
          ></FormInput>
        </div>
        <div className="authContainer_avatars">
          {images.slice(0, 4).map((image) => (
            <Avatar
              key={image.id}
              number={number}
              url={image.url}
              nr={image.id}
              toggleSwitch={toggleSwitch}
            ></Avatar>
          ))}
          <div
            className={`authContainer_avatars-avatar ${
              number === 5 ? "choosed" : ""
            }`}
          >
            <UploadControl
              photoLink={photoLink}
              onChange={postDetails}
              accept="image/*"
              disabled={picLoading}
            ></UploadControl>
          </div>
        </div>
        <div className="authContainer_buttons">
          <button disabled={picLoading} className="button login">
            {picLoading ? "Uploading..." : "SignUp"}
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
