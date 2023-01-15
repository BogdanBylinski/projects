import React from "react";

function Avatar({ id, nr, url, number, toggleSwitch, end, small }) {
  return (
    <div
      style={
        end ? { alignSelf: "flex-end", height: "30px", width: "30px" } : {}
      }
      onClick={toggleSwitch ? (e) => toggleSwitch(e, nr) : null}
      className={` authContainer_avatars-avatar ${
        number ? (number === nr ? "choosed" : "") : ""
      }`}
    >
      <img
        style={small ? { height: "30px", width: "30px" } : {}}
        referrerPolicy="no-referrer"
        src={
          url
            ? url
            : "https://www.pngitem.com/pimgs/m/575-5759580_anonymous-avatar-image-png-transparent-png.png"
        }
        alt="avatar "
      />
    </div>
  );
}

export default Avatar;
