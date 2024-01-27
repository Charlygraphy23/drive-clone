import MyDropdown from "@/app/components/dropdown";
import React from "react";

const FileAction = () => {
	return (
		<MyDropdown
			handler={{
				render: () => <i className='bi bi-three-dots'></i>,
			}}>
			<MyDropdown.Menu>
				<MyDropdown.List>Rename</MyDropdown.List>
				<MyDropdown.List divider></MyDropdown.List>
				<MyDropdown.List>Move to trash</MyDropdown.List>
			</MyDropdown.Menu>
		</MyDropdown>
	);
};

export default FileAction;
