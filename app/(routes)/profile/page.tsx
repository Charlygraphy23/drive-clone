import { getUserInfo } from "@/app/_actions/user";
import ProfileForm from "./components/profileForm";
import ProfileImageComponent from "./components/profileImage";
import { ProfileProvider } from "./provider";


const ProfilePage = async () => {
	const user = await getUserInfo()

	return (
		<>
			<ProfileProvider userInfo={user}>
				<ProfileImageComponent />
				<ProfileForm />
			</ProfileProvider>
		</>

	);
};

export default ProfilePage;
