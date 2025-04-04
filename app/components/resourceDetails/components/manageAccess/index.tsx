"use client"

import { updateAccess } from "@/app/_apis_routes/resources";
import { getUsersByEmail } from "@/app/_apis_routes/user";
import { MANAGE_ACCESS_MODAL_ID } from "@/app/_config/const";
import useDebounceValue from "@/app/_hooks/useDebounce";
import AvatarComponent from "@/app/components/avatar";
import ButtonGroup from "@/app/components/buttonGroup";
import ModalComponent, { ButtonClose } from "@/app/components/modal";
import useToast from "@/app/hooks/useToast";
import { SelectedAccessType } from "@/app/interfaces/index.interface";
import { ACCESS_TYPE } from "@/app/lib/database/interfaces/access.interface";
import { useAppDispatch, useAppSelector } from "@/app/store";
import { AccessList, updateInfoByFolderId } from "@/app/store/actions/info.actions";
import { ErrorHandler } from "@/app/utils/index.utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Divider, Select, SelectProps, Space } from "antd";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
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
    const debounceSearchValue = useDebounceValue(search)
    const Toast = useToast()

    const { data, isFetching } = useQuery({
        queryFn: () => getUsersByEmail(debounceSearchValue),
        queryKey: ["search-users", search],
        enabled: !!debounceSearchValue,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
        staleTime: Infinity
    })
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useAppDispatch()
    const mutation = useMutation({ mutationFn: updateAccess })
    const session = useSession()
    const user = session?.data?.user
    const resourceId = modalState?.id
    const resourceInfoById = resourceInfo[resourceId]

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

    const handleSearch = (value: string) => {
        setSearch(value)
    };

    const onChange = (values: string[]) => {

        const filterSelectedValues = values?.filter(val => {
            const data = JSON.parse(val) as User
            const userInfo = data as AccessList["userInfo"]
            const hasPermission = selectedAccess?.find(access => access?.userInfo?._id === userInfo?._id);
            return !hasPermission
        })

        const contractData = filterSelectedValues?.map((value) => {
            const data = JSON.parse(value) as User
            const userInfo = data as AccessList["userInfo"]
            return {
                userInfo,
                accessType: ACCESS_TYPE.READ,
                resourceId: resourceId as NonNullable<string>
            }
        })

        setSelectedAccess([...accessList, ...contractData])
        setSelectEmails(filterSelectedValues)
    }

    const handleSubmit = async () => {

        if (!resourceId) return;

        setIsLoading(true)
        try {
            const formatData = selectedAccess.map(access => ({
                accessId: access?._id,
                createdFor: access?.userInfo?._id,
                accessType: access?.accessType,
                userInfo: access?.userInfo
            }))

            await mutation.mutateAsync({
                accessList: formatData,
                resourceId,
                deletedUserIds
            })
            clearState();

            dispatch(updateInfoByFolderId({
                resourceId,
                accesses: formatData,
            }))
            setIsLoading(false)
        }
        catch (err) {
            const errors = ErrorHandler(err) as { email: string } & Record<string, string>
            Toast.error(String(errors))
            setIsLoading(false)
            console.error(errors)
        }


    }

    const onAccessTypeChange = (type: ACCESS_TYPE, index: number) => {

        if (!hasAccess || selectedAccess?.[index]?.userInfo?._id === user?._id) return;


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
        <ModalComponent id={MANAGE_ACCESS_MODAL_ID} isOpen={manageAccessModal}>
            <div className={style.manageAccess}>
                <div className={style.header}>
                    <p>Share <strong><small>{resourceInfoById?.name}</small></strong></p>
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
                                user={access.userInfo}
                            />
                            <div className={style.selectedUsersWrapper}>
                                <div className={style.info}>
                                    <p>{`${access?.userInfo?.firstName} ${access?.userInfo?.lastName} ${access?.userInfo?._id === user?._id ? "(you)" : ""}`}</p>
                                    <span>{access?.userInfo?.email}</span>
                                </div>

                                {resourceInfoById?.ownerInfo?._id === access?.userInfo?._id
                                    ? <p style={{ opacity: 0.4 }}>Owner</p>
                                    : (!hasAccess || access?.userInfo?._id === user?._id)
                                        ? null
                                        : <Select
                                            className={style.selectAccess}
                                            defaultValue={access?.accessType}
                                            disabled={!hasAccess || access?.userInfo?._id === user?._id}
                                            options={[
                                                { value: ACCESS_TYPE.WRITE, label: 'Write', disabled: !hasAccess || access?.userInfo?._id === user?._id },
                                                { value: ACCESS_TYPE.READ, label: 'Read', disabled: !hasAccess || access?.userInfo?._id === user?._id },
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

