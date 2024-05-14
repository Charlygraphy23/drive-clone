"use client"

import { updateAccess } from "@/app/_apis_routes/resources";
import { getUsersByEmail } from "@/app/_apis_routes/user";
import AvatarComponent from "@/app/components/avatar";
import ButtonGroup from "@/app/components/buttonGroup";
import ModalComponent from "@/app/components/modal";
import { MANAGE_ACCESS_MODAL_ID } from "@/app/config/const";
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    toggleModal as toggleModalState
} from "@/app/store/actions";
import { AccessList } from "@/app/store/actions/info.actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select, SelectProps } from "antd";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import style from "./style.module.scss";

type SelectedAccessType = { _id?: string, } & Pick<AccessList, "accessType" | "userInfo" | "resourceId">

const ManageAccess = () => {
    const {
        manageAccessModal,
        data: modalState
    } = useAppSelector((state) => state.modals);
    const {
        data: resourceInfo
    } = useAppSelector((state) => state.resourceInfo);
    const [options, setOptions] = useState<SelectProps['options']>([] as SelectProps['options'])
    const [search, setSearch] = useState<string>("")
    const [accessList, setAccessList] = useState<SelectedAccessType[]>([])
    const [selectedAccess, setSelectedAccess] = useState<SelectedAccessType[]>([])
    const { data, isFetching } = useQuery({
        queryFn: () => getUsersByEmail(search),
        queryKey: ["search-users", search],
        enabled: !!search,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        staleTime: Infinity
    })
    const dispatch = useAppDispatch()
    const mutation = useMutation({ mutationFn: updateAccess })
    const session = useSession()
    const user = session?.data?.user
    const folderId = modalState?.value
    const resourceInfoById = resourceInfo[folderId]


    const toggleModal = (isOpen?: boolean) => {
        dispatch(
            toggleModalState({
                isOpen: !!isOpen,
                name: "manageAccessModal",
            })
        );
    };

    const handleSearch = (value: string) => {
        setSearch(value)
    };

    const onChange = (values: string[]) => {
        const contractData = values?.map((value) => {
            const data = JSON.parse(value) as User
            const userInfo = data as AccessList["userInfo"]
            return {
                userInfo,
                accessType: ACCESS_TYPE.READ,
                resourceId: folderId
            }
        })

        setSelectedAccess([...accessList, ...contractData])
    }

    const handleSubmit = async () => {
        const formatData = selectedAccess.map(access => ({
            accessId: access?._id,
            createdFor: access?.userInfo?._id,
            accessType: access?.accessType
        }))

        await mutation.mutateAsync({
            accessList: formatData,
            resourceId: folderId
        })
    }

    const onAccessTypeChange = (type: ACCESS_TYPE, index: number) => {
        setSelectedAccess(prev => {
            const newArray = Array.from(prev)
            newArray[index] = {
                ...newArray[index],
                accessType: type
            }
            return newArray
        })
    }

    useEffect(() => {
        if (isFetching) return;

        const formattedData = data?.map(user => ({
            label: user.email,
            value: JSON.stringify({
                _id: user?._id ?? "",
                firstName: user?.firstName ?? "",
                lastName: user?.lastName ?? "",
                imageUrl: user?.imageUrl ?? "",
                email: user?.email ?? "",
            } as User)
        }))
        setOptions(formattedData ?? [])
    }, [data, isFetching])

    useEffect(() => {
        setAccessList(resourceInfoById?.accessList ?? [])
        setSelectedAccess(resourceInfoById?.accessList ?? [])
    }, [resourceInfoById])

    return (
        <ModalComponent id={MANAGE_ACCESS_MODAL_ID} isOpen={manageAccessModal} toggle={toggleModal}>
            <div className={style.manageAccess}>
                <div className={style.header}>
                    <p>Share `Folder name`</p>
                    <ModalComponent.ButtonClose />
                </div>

                <Select
                    className={`${style.select} selectAccessList`}
                    mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onSearch={handleSearch}
                    options={Array.from(options ?? [])}
                    size="large"
                    loading={isFetching}
                    onKeyDown={(e) => e.stopPropagation()}
                    filterOption={(inputValue, option) => !!JSON.parse(option?.value as string)?.email?.toString().includes(inputValue)}
                    onChange={onChange}

                />

                <div className={style.selectedUsers}>
                    {
                        selectedAccess.map((access, i) => <div key={String(access?._id)}
                            className={style.selectedUsersContainer}>
                            <AvatarComponent
                                className={style.avatar}
                                user={{
                                    _id: access.userInfo?._id ?? "",
                                    firstName: access?.userInfo?.firstName ?? "",
                                    lastName: access?.userInfo?.lastName ?? "",
                                    image: access?.userInfo?.imageUrl ?? "",
                                }}
                            />
                            <div className={style.selectedUsersWrapper}>
                                <div className={style.info}>
                                    <p>{`${access?.userInfo?.firstName} ${access?.userInfo?.lastName} ${access?.userInfo?._id === user?._id ? "(you)" : ""}`}</p>
                                    <span>{access?.userInfo?.email}</span>
                                </div>

                                {resourceInfoById?.ownerInfo?._id === access?.userInfo?._id ?
                                    <p style={{ opacity: 0.4 }}>Owner</p> :
                                    <Select
                                        className={style.selectAccess}
                                        defaultValue={access?.accessType}
                                        disabled={resourceInfoById?.ownerInfo?._id === access?.userInfo?._id}
                                        options={[
                                            { value: ACCESS_TYPE.WRITE, label: 'Write', disabled: resourceInfoById?.ownerInfo?._id === access?.userInfo?._id },
                                            { value: ACCESS_TYPE.READ, label: 'Read', disabled: resourceInfoById?.ownerInfo?._id === access?.userInfo?._id },
                                        ]}
                                        popupClassName="selectAccessType"
                                        onSelect={(value) => onAccessTypeChange(value, i)}
                                    />}
                            </div>
                        </div>)
                    }
                </div>

                <div className="d-flex justify-content-end align-items-center mt-4" >
                    <ButtonGroup handleSubmit={handleSubmit} submitText="Done" className={style.submit} />
                </div>

            </div>
        </ModalComponent>

    )
}

export default ManageAccess
