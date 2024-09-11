"use client";

import { getStorageApi } from "@/app/_apis_routes/storage";
import useToast from "@/app/hooks/useToast";
import { formatBytes } from "@/app/utils/index.utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import style from "../style.module.scss";
import { StorageLoader } from "./loader";

const StorageComponent = () => {
	const router = useRouter()

	const { data, isFetching, isError, error } = useQuery({ queryFn: getStorageApi, queryKey: ["getStorage"], staleTime: 30000 })
	const totalStorage = data?.data?.total ?? 0
	const usedStorage = data?.data?.used ?? 0
	const usedStorageLabel = useMemo(() => formatBytes(usedStorage), [usedStorage])
	const totalStorageLabel = useMemo(() => formatBytes(totalStorage), [totalStorage])
	const progress = useMemo(() => {
		if (!totalStorage) return 0
		return Math.floor((usedStorage / totalStorage) * 100)
	}, [totalStorage, usedStorage])
	const Toast = useToast()

	const handleClick = () => {
		router.push("/plans")
	}

	if (isError) {
		Toast.error(String(error?.message))
	}

	return (
		<>

			{isFetching && <StorageLoader />}

			{totalStorage ? <>
				{!isFetching && <div className={style.volume}>
					<span style={{ width: `${progress}%` }}></span>
				</div>}

				{!isFetching && <p>
					{usedStorageLabel} of {totalStorageLabel} used
				</p>}
			</> : null}

			{!totalStorage ? <p>Please subscribe to a subscription plan!</p> : null}

			<button className={`button`} onClick={handleClick}> Buy storage</button>
		</>
	);
};

export default StorageComponent;
