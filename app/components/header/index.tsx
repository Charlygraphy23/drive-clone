import TopBarAvatar from "./components/avatar";
import TopbarNotification from "./components/notification";
import SearchComponent from "./components/search";
import style from "./style.module.scss";

type Props = {
	hideSearch?: boolean;
};

const Header = ({ hideSearch }: Props) => {
	return (
		<header className={style.header}>
			{!hideSearch && <SearchComponent />}
			<div className={`d-flex align-items-center ${style.wrapper}`}>
				<TopbarNotification />
				<TopBarAvatar />
			</div>
		</header>
	);
};

export default Header;
