import Link from "next/link";
import TopBarAvatar from "./components/avatar";
import SearchComponent from "./components/search";
import style from "./style.module.scss";

type Props = {
	hideSearch?: boolean;
	showContactUs?: boolean;

};

const Header = ({ hideSearch, showContactUs }: Props) => {
	return (
		<header className={style.header}>
			{!hideSearch && <SearchComponent />}
			<div className={`d-flex align-items-center ${style.wrapper}`}>
				{showContactUs && <Link href="/contact-us">Contact Us</Link>}
				{/* <TopbarNotification /> */}
				<TopBarAvatar />
			</div>
		</header>
	);
};

export default Header;
