"use client";

import React from "react";
import useFileColumns from "../hooks/useFileColumns";
import MyTable from "@/app/components/table";

const FileComponent = () => {
	const { columns } = useFileColumns();

	return <MyTable columns={columns} />;
};

export default FileComponent;
