import { authOptions } from "@/app/lib/authConfig";
import { getServerSession } from "next-auth";
import BinTableComponent from "./binTableComponent";



const BinPage = async () => {
	const session = await getServerSession(authOptions)
	const user = session?.user
	return (
		<BinTableComponent user={user} />
	);
};

export default BinPage;
