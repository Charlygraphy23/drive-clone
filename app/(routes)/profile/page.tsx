import { authOptions } from "@/app/lib/authConfig";
import { User, getServerSession } from "next-auth";
import ProfileForm from "./components/profileForm";
import ProfileImageComponent from "./components/profileImage";
import { ProfileProvider } from "./provider";


const getUserSessionInfo = async () => {
	const session = await getServerSession(authOptions)
	return session?.user as User
}

const ProfilePage = async () => {
	const user = await getUserSessionInfo()

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
