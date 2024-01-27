"use client";

import React from "react";
import useFileColumns from "../hooks/useFileColumns";
import MyTable from "@/app/components/table";

type Props = {
	apiCall: () => Promise<any>;
};

const FileComponent = ({ apiCall }: Props) => {
	const { columns } = useFileColumns();

	return <MyTable columns={columns} api={apiCall} />;
};

export default FileComponent;
