"use client";

import MyDropdown from "@/app/components/dropdown";
import { DATA_TYPE } from "@/app/interfaces/index.interface";
import { useAppStore } from "@/app/store";
import { toggleModal } from "@/app/store/actions";
import { FolderDataType } from "@/app/store/reducers/folders.reducers";
import style from "../../../style.module.scss";

type Props = {
	data: FolderDataType;
};

const FolderSkeleton = ({ data }: Props) => {
	const store = useAppStore();
	const handleRenameClient = (e: React.MouseEvent<HTMLElement>) => {
		e.stopPropagation()
		e.preventDefault()

		store.dispatch(
			toggleModal({
				isOpen: true,
				data: {
					folderId: data?._id,
					type: DATA_TYPE.FOLDER,
					value: data?.name ?? "",
				},
				name: "renameModal",
			})
		);
	};

	return (
		<div className={style.skeleton}>
			<div className={`${style.label} d-flex`}>
				<i className='bi bi-folder-fill'></i>
				<p>{data?.name}</p>
			</div>

			<MyDropdown
				className={style.dropdown}
				handler={{
					className: style.dropdownItem,
					render: () => <i className='bi bi-three-dots-vertical'></i>,
				}}>
				<MyDropdown.Menu>
					<MyDropdown.List className='d-flex' onClick={handleRenameClient}>
						<i className='bi bi-pen-fill'></i>
						<span> Rename </span>
					</MyDropdown.List>

					<MyDropdown.List divider></MyDropdown.List>

					<MyDropdown.List className='d-flex'>
						<i className='bi bi-trash3-fill'></i>
						<span> Move to trash </span>
					</MyDropdown.List>
				</MyDropdown.Menu>
			</MyDropdown>
		</div>
	);
};

export default FolderSkeleton;
