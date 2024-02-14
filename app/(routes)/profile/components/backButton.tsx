"use client";

import { useRouter } from "next/navigation";
import React from "react";

const ProfileBackButton = () => {

    const route = useRouter()

    const handleClick = () => {
        route.back()
    }

  return (
    <button onClick={handleClick}>
      <i className="bi bi-chevron-left"></i>
    </button>
  );
};

export default ProfileBackButton;
