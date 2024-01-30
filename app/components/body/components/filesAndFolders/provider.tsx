"use client";

import { addBulkFiles } from "@/app/store/actions";
import React, { PropsWithChildren, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

type Props = {
	data: any;
} & PropsWithChildren;

const FileAndFolderStateProvider = ({ children, data }: Props) => {

	const dispatch = useDispatch();
	const ref = useRef(false)

	useEffect(()=> {

		if(ref?.current) return;
		ref.current = true

		dispatch(addBulkFiles({data : data?.files}))

	} , [data?.files, dispatch])


	return <>{children}</>;
};

export default FileAndFolderStateProvider;
