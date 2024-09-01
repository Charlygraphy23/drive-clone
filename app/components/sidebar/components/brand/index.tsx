import Logo from '@app/assets/logo.png';
import Image from "next/image";
import style from "../../style.module.scss";


const SidebarBrand = () => {
	return (
		<div className={style.sidebar__brand}>
			<Image src={Logo} alt="mbox" width={70} height={70} />
		</div>
	);
};

export default SidebarBrand;
