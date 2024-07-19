"use client";

import { getStorageApi } from "@/app/_apis_routes/storage";
import { TOTAL_FREE_SPACE } from "@/app/_config/const";
import { formatBytes } from "@/app/utils/index.utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import style from "../style.module.scss";
import { StorageLoader } from "./loader";

const StorageComponent = () => {
	const router = useRouter()

	const { data, isFetching } = useQuery({ queryFn: getStorageApi, queryKey: ["getStorage"], staleTime: 30000 })
	const response = data?.data?.data ?? 0
	const consumedStorageSpace = useMemo(() => formatBytes(response), [response])
	const totalSpace = useMemo(() => formatBytes(TOTAL_FREE_SPACE), [])
	const progress = useMemo(() => Math.floor((response / TOTAL_FREE_SPACE) * 100), [response])



	const handleClick = () => {
		router.push("/plans")
	}



	return (
		<>


			{isFetching && <StorageLoader />}

			{!isFetching && <div className={style.volume}>
				<span style={{ width: `${progress}%` }}></span>
			</div>}

			{!isFetching && <p>
				{consumedStorageSpace} of {totalSpace} used
			</p>}

			<button className={`button`} onClick={handleClick}> Buy storage</button>
		</>
	);
};

export default StorageComponent;
