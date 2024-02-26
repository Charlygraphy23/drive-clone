import { StaticImport } from "next/dist/shared/lib/get-img-props";

type RenderProps = {
	record: { data: unknown } & Pick<ColumnType, "dataIndex" | "title">;
	value: string | number | boolean | null | React.ReactElement | Object;
};

export type ColumnType = {
	dataIndex: string;
	render?: (
		props: RenderProps
	) =>
		| React.ReactElement[]
		| React.ReactElement
		| string
		| number
		| null
		| undefined
		| boolean;
	title: string;
	icon?: React.ReactElement | StaticImport | string;
};

export type TableProps<T> = {
	columns: ColumnType[];
	data: T[];
	emptyIcon?: React.ReactElement;
	isLoading?: boolean;
};
