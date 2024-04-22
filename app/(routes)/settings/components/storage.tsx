import style from "../style.module.scss";

function calculateStorage(): Promise<Record<string, number>> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve({
				total: 15,
				used: 6.98,
			});
		}, 4000);
	});
}

const StorageComponent = async () => {
	const data = await calculateStorage();

	return (
		<>
			<div className={style.volume}>
				<span></span>
			</div>
			<p>
				{data?.used} GB of {data?.total} GB used
			</p>
		</>
	);
};

export default StorageComponent;
