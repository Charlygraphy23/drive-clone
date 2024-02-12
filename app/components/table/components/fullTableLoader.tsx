import React from "react";
import style from "../style.module.scss";
import { FallingLines } from "react-loader-spinner";

const FullTableLoader = () => {
	return (
		<section className={style.fullTableLoader}>
			<FallingLines color='#6a29ff' width='100' visible={true} />
		</section>
	);
};

export default FullTableLoader;
