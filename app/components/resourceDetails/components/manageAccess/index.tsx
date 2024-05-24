"use client"

import { updateAccess } from "@/app/_apis_routes/resources";
import { getUsersByEmail } from "@/app/_apis_routes/user";
import { MANAGE_ACCESS_MODAL_ID } from "@/app/_config/const";
import AvatarComponent from "@/app/components/avatar";
import ButtonGroup from "@/app/components/buttonGroup";
import ModalComponent, { ButtonClose } from "@/app/components/modal";
import { SelectedAccessType } from "@/app/interfaces/index.interface";
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    toggleModal as toggleModalState
} from "@/app/store/actions";
import { AccessList, updateInfoByFolderId } from "@/app/store/actions/info.actions";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Divider, Select, SelectProps, Space } from "antd";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import style from "./style.module.scss";


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
    const [deletedUserIds, setDeletedUserIds] = useState<string[]>([])
    const [selectEmails, setSelectEmails] = useState<string[]>([])

    const { data, isFetching } = useQuery({
        queryFn: () => getUsersByEmail(search),
        queryKey: ["search-users", search],
        enabled: !!search,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        staleTime: Infinity
    })
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const dispatch = useAppDispatch()
    const mutation = useMutation({ mutationFn: updateAccess })
    const session = useSession()
    const user = session?.data?.user
    const folderId = modalState?.value as NonNullable<string>
    const resourceInfoById = resourceInfo[folderId]

    const hasAccess = useMemo(() => {
        const access = resourceInfoById?.accessList?.find(a => a?.userInfo?._id === user?._id)
        return access?.accessType === ACCESS_TYPE.WRITE
    }, [resourceInfoById?.accessList, user?._id])

    const clearState = () => {
        setSearch("")
        setSelectedAccess([])
        setAccessList([])
        setOptions([])
        setSelectEmails([])
    }

    const toggleModal = useCallback((isOpen?: boolean) => {
        dispatch(
            toggleModalState({
                isOpen: !!isOpen,
                name: "manageAccessModal",
            })
        );
        clearState()
    }, [dispatch]);

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
                resourceId: folderId as NonNullable<string>
            }
        })

        setSelectedAccess([...accessList, ...contractData])
        setSelectEmails(values)
    }

    const handleSubmit = async () => {

        if (!folderId) return;

        setIsLoading(true)
        const formatData = selectedAccess.map(access => ({
            accessId: access?._id,
            createdFor: access?.userInfo?._id,
            accessType: access?.accessType,
            userInfo: access?.userInfo
        }))

        await mutation.mutateAsync({
            accessList: formatData,
            resourceId: folderId,
            deletedUserIds
        })
        toggleModal();

        dispatch(updateInfoByFolderId({
            folderId,
            accesses: formatData,
        }))
        router.refresh()
        setIsLoading(false)

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

    const handleRemove = (access: SelectedAccessType) => {
        setDeletedUserIds(prev => ([...prev, access?.userInfo?._id]))
        setSelectedAccess(prev => prev.filter(_access => _access?.userInfo?._id !== access?.userInfo?._id))
        setSelectEmails(prev => Array.from(prev.filter(userInfo => {
            const data = JSON.parse(userInfo) as User
            return access?.userInfo?.email !== data?.email
        })))
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
    }, [resourceInfoById, manageAccessModal])

    return (
        <ModalComponent id={MANAGE_ACCESS_MODAL_ID} isOpen={manageAccessModal} toggle={toggleModal}>
            <div className={style.manageAccess}>
                <div className={style.header}>
                    <p>Share `Folder name`</p>
                    <ButtonClose />
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
                    disabled={!hasAccess}
                    value={selectEmails}
                    removeIcon={null}
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
                                        disabled={!hasAccess}
                                        options={[
                                            { value: ACCESS_TYPE.WRITE, label: 'Write', disabled: !hasAccess },
                                            { value: ACCESS_TYPE.READ, label: 'Read', disabled: !hasAccess },
                                        ]}
                                        popupClassName="selectAccessType"
                                        onSelect={(value) => onAccessTypeChange(value, i)}
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <Divider style={{ margin: '8px 0' }} />
                                                <Space style={{ padding: '0 8px 4px', cursor: "pointer" }} onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault()
                                                    handleRemove(access)
                                                }}>
                                                    Remove Access
                                                </Space>
                                            </>
                                        )}
                                    />}
                            </div>
                        </div>)
                    }
                </div>

                {hasAccess && <div className="d-flex justify-content-end align-items-center mt-4" >
                    <ButtonGroup handleSubmit={handleSubmit} submitText="Done" className={style.submit} loading={mutation.isPending || isLoading} loader="spin" />
                </div>}

            </div>
        </ModalComponent>

    )
}

export default ManageAccess

