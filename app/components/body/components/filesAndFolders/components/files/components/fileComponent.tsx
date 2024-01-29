"use client";

import React, { PropsWithChildren } from "react";
import useFileColumns from "../hooks/useFileColumns";
import MyTable from "@/app/components/table";

type Props = {} & PropsWithChildren;

const FileComponent = ({}: Props) => {
	const { columns } = useFileColumns();

	return <MyTable columns={columns} />;
};

export default FileComponent;
