import { StaticImport } from "next/dist/shared/lib/get-img-props";

type RenderProps = {
  record: { data: any } & Pick<ColumnType, "dataIndex" | "title">;
  value: string | number | boolean | null;
};

export type ColumnType = {
  dataIndex: string;
  render?: (props: RenderProps) => React.ReactElement[] | React.ReactElement;
  title: string;
  icon?: React.ReactElement | StaticImport | string
};
