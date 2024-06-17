import NavRoute from "./components/navRoute";
import style from "./style.module.scss";

const SidebarNavigation = () => {
	return (
		<div className={style.sidebar__navigation}>
			<NavRoute
				path='/'
				icon={<i className='bi bi-house-fill'></i>}
				label='Home'
			/>

			<NavRoute
				path='/shared'
				icon={<i className="bi bi-people-fill"></i>}
				label='Shared with me'
			/>

			<NavRoute
				path='/bin'
				icon={<i className='bi bi-trash-fill'></i>}
				label='Recycle bin'
			/>

			<NavRoute
				path='/settings'
				icon={<i className='bi bi-gear-fill'></i>}
				label='Settings'
			/>


		</div>
	);
};

export default SidebarNavigation;
