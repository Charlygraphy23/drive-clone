import React from "react";
import ProfileImageComponent from "./components/profileImage";
import ProfileForm from "./components/profileForm";
import { ProfileProvider } from "./store/provider";

const ProfilePage = () => {
	return (
		<ProfileProvider>
			<ProfileImageComponent />
			<ProfileForm />
		</ProfileProvider>
	);
};

export default ProfilePage;
