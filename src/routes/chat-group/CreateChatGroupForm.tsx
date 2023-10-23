import {
    Avatar,
    Button,
    Flex,
    MultiSelect,
    TextInput,
    Textarea
} from '@mantine/core';
import { useForm } from '@mantine/form';

import { cloneDeep } from 'lodash';
import React, { useEffect, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import globalAxios from '../../configs/axios/axios';
import { User } from '../../interfaces/user.interface';
import { API, MULTIPAR_FORMDATA_HEADER } from '../../utils/constants/api';
import { getCurrentUserInfo } from '../../utils/functions';
import { useNavigate, useParams } from 'react-router-dom';
import { FORM_TYPE } from '../../utils/constants/common';
import { GroupChat } from '../../interfaces/group-chat.interface';
import AvatarUpload from '../../components/AvatarUpload';
import { useDisclosure } from '@mantine/hooks';
import { LoadingOverlay, Group, Box } from '@mantine/core';

type Props = {}

const CreateChatGroupForm = (props: Props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [visible, setvisible] = useState(false)
    const [formType, setFormType] = useState(params.id === 'new' ? FORM_TYPE.CREATE : FORM_TYPE.UPDATE)
    const [dataFromServerApi, setDataFromServerApi] = useState<{ users: User[] }>({ users: [] })
    const [formRawData, setformRawData] = useState<{ members: { value: string, label: string }[], avatar: string }>({
        members: [],
        avatar: ''
    })
    const userInfo = getCurrentUserInfo()

    const form = useForm<Partial<GroupChat>>({
        initialValues: {
            _id: undefined,
            avatar: '',
            name: '',
            description: '',
            members: [],
            admins: [],

        },
        validate: {
            members: (value) => {
                console.log(value);
                if (value)
                    return value.length > 0 ? null : 'Please select at least one member'
                else {
                    return 'Please select at least one member'
                }
            },
            name: (val) => ( val && val.length < 1 ? 'Group name should not blank' : null),


        },
    });

    const [images, setImages] = React.useState([]);

    useEffect(() => {

        handleLoadUsers();
        if (params.id !== 'new') {
            handleLoadGroupChatDetail();

        }
    }, [params.id])

    const handleLoadUsers = async () => {
        try {
            const resp = await globalAxios.get(API.USERS) as User[]
            const userMultiFieldData = resp.map(user => {
                if(user.id === userInfo.user.id)
                return {
                    value: user.id,
                    label: 'You'
            }
                return {
                    value: user.id,
                    label: `${user.name}` || 'Unset Name'
                }
            })
            userMultiFieldData.filter(user => {
                return user.value !== userInfo.user.id
            })
            setformRawData({ ...formRawData, members: userMultiFieldData })

            setDataFromServerApi({ ...dataFromServerApi, users: resp as User[] })
        } catch (error: any) {
            // form.setFieldError('password', error.response.data.message);
        }
    }

    const handleLoadGroupChatDetail = async () => {
        try {
            const resp = await globalAxios.get(API.GROUPS + '/' + params.id) as GroupChat
            form.setValues(resp);
        } catch (error: any) {
            // form.setFieldError('password', error.response.data.message);
        }
    }



    async function handleCreateGroupChat() {
        try {
            const imagesClone = cloneDeep(images) as any[]
            const resp: GroupChat = await globalAxios.post(API.GROUPS, {
                ...form.values,
                members: [...form.values.members || [], userInfo.user.id],
                admins: [...form.values.admins || [], userInfo.user.id],
                avatar: imagesClone.length > 0 ? imagesClone[0].file : null,

            }, MULTIPAR_FORMDATA_HEADER)
            if (resp._id) {
                setFormType(FORM_TYPE.UPDATE)
                navigate(`/group/${resp._id}`)
            }
        }
        catch (e) {

        }
    }

    async function handleUpdateGroupChat() {
        try {
            const imagesClone = cloneDeep(images) as any[]
            const resp: GroupChat = await globalAxios.put(API.GROUPS, {
                ...form.values,
                members: [...form.values.members || []],
                admins: [...form.values.admins || []],
                avatar: imagesClone.length > 0 ? imagesClone[0].file : form.values.avatar,

            }, MULTIPAR_FORMDATA_HEADER)
            if (resp._id) {
                navigate(`/group/${resp._id}`)
            }
        }
        catch (e) {

        }
    }
    const isAdmin = () => {
        if (!form.values.admins) return false
        return form.values.admins?.findIndex((item) => item === userInfo.user.id) > -1
    }
    return (

        <>
            
            <Box pos="relative">
                <LoadingOverlay visible={visible} zIndex={1000} overlayBlur={2} />
                <form onSubmit={form.onSubmit(async () => {

                    setvisible(true)
                    if (formType === FORM_TYPE.CREATE) {
                        await handleCreateGroupChat();
                    } else {
                        await handleUpdateGroupChat();
                    }
                    setvisible(false)
                })}>
                    <Flex

                        w={'100%'}
                        gap="md"
                        justify="flex-start"
                        align="flex-start"
                        direction="row"
                        wrap="wrap"
                    >

                        <h2> {formType === FORM_TYPE.CREATE ? 'Create a Chat Group' : 'Update Chat Group'}</h2>
                        <Flex w={'100%'} gap={'sm'}>

                            <Flex direction="column" gap="sm">
                                <AvatarUpload images={images} setImages={setImages} url={formType === FORM_TYPE.UPDATE ? form.values.avatar : undefined} />
                            </Flex>
                            <Flex w={'100%'} direction={'column'} gap={'sm'}>

                                <TextInput
                                    w={'100%'}
                                    required
                                    label="Group Name"
                                    placeholder="Enter your group chat name"
                                    value={form.values.name}
                                    onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                                    radius="sm"
                                    error={form.errors.name}

                                />
                                <Textarea
                                    w={'100%'}
                                    label="Description"
                                    placeholder="Enter your Description..."
                                    value={form.values.description}
                                    onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
                                    radius="sm"
                                    minRows={4}
                                />
                            </Flex>
                        </Flex>


                        <MultiSelect
                            w={'100%'}
                            label="Members"
                            required
                            placeholder="Pick your group members"
                            value={form.values.members}
                            data={formRawData.members}
                            onChange={(event) => form.setFieldValue('members', event)}
                            searchable
                            disabled={!(isAdmin() || formType === FORM_TYPE.CREATE)}
                            error={form.errors.members}

                        />
                        <MultiSelect

                            w={'100%'}
                            label="Other Admins"
                            placeholder="Pick your group admins..."
                            data={formRawData.members}
                            value={form.values.admins}
                            onChange={(event) => form.setFieldValue('admins', event)}
                            searchable
                            disabled={!(isAdmin() || formType === FORM_TYPE.CREATE)}
                        />

                        <Flex>
                            <Button type="submit" radius="xl">
                                {formType === FORM_TYPE.CREATE ? 'Create' : 'Update'}
                            </Button>
                        </Flex>
                    </Flex>
                </form>
            </Box>
        </>
    )
}

export default CreateChatGroupForm

