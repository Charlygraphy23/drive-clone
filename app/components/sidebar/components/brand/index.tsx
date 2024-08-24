import Logo from '@app/assets/logo.png';
import Image from "next/image";
import style from "../../style.module.scss";


const SidebarBrand = () => {
	return (
		<div className={style.sidebar__brand}>
			<Image src={Logo} alt="logo" width={150} height={50} />
		</div>
	);
};

export default SidebarBrand;
