import React from "react";

function Avatar({ id, nr, url, number, toggleSwitch }) {
  return (
    <div
      onClick={toggleSwitch ? (e) => toggleSwitch(e, nr) : null}
      className={`authContainer_avatars-avatar ${
        number === nr ? "choosed" : ""
      }`}
    >
      <img referrerPolicy="no-referrer" src={url} alt="avatar " />
    </div>
  );
}

export default Avatar;
