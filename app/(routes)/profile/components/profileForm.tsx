import React from "react";
import style from "../style.module.scss";
import ProfileInputGroup from "./inputGroup";

const ProfileForm = () => {
  return (
    <div className={style.profileForm}>
      <section className={style.body}>
          <ProfileInputGroup label="First Name" value="Dipta" />
          <ProfileInputGroup label="Last Name" value="Biswas" />
          <ProfileInputGroup label="Email" value="dipta.biswas@yopmail.com" />
          <ProfileInputGroup label="@username" value="dipta2" />
      </section>
      <footer className="d-flex justify-content-end align-items-center mt-4 mb-2">
        <button type="button" className="button cancel me-3">
          cancel
        </button>
        <button type="submit" className="button submit">
          OK
        </button>
      </footer>
    </div>
  );
};

export default ProfileForm;
