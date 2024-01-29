"use client";

import React, { PropsWithChildren, useEffect } from "react";

type Props = {
	data: any;
} & PropsWithChildren;

const FileAndFolderStateProvider = ({ children, data }: Props) => {
	useEffect(() => {
		console.log("Files and folder Provider !!");
		console.log("Rendarable Data", data);
	}, []);

	return <>{children}</>;
};

export default FileAndFolderStateProvider;
