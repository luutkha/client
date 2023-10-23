import {
    Avatar,
    Button,
    Flex
} from '@mantine/core';

import React, { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
type Props = {
    url?: string;
    images: ImageListType;
    setImages: React.Dispatch<React.SetStateAction<never[]>>;
}

const AvatarUpload = ({ url, images, setImages }: Props) => {
    // const [images, setImages] = React.useState([]);
    const [isUpdateMode, setisUpdateMode] = useState(false)
    const onChange = (
        imageList: ImageListType,
        addUpdateIndex: number[] | undefined
    ) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList as never[]);
    };

    const renderImageByUrl = () => {
        return <Flex justify={'center'} align={'center'} gap="5px" direction={'column'}>
            <Avatar w={'100%'} size={'10rem'} src={url} alt="it's me" />
            <Flex gap={'5px'} w={'100%'}>
                <Button w={'100%'} onClick={() => setisUpdateMode(true)} >Change Avatar</Button>
            </Flex>
        </Flex>
    }
    return (

        <>
            {url && !isUpdateMode ? renderImageByUrl() : <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={1}
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                    // write your building UI
                    <Flex justify={'center'} align={'center'} mih={'100%'} miw={'10rem'} >
                        { }
                        {imageList.length > 0 ? imageList.map((image, index) => (
                            <Flex justify={'center'} align={'center'} gap="5px" direction={'column'} key={index}>
                                <Avatar w={'100%'} size={'10rem'} src={image.dataURL} alt="it's me" />
                                <Flex gap={'5px'} w={'100%'}>
                                    <Button w={'100%'} onClick={() => onImageUpdate(index)}>Update</Button>
                                    <Button onClick={() => onImageRemove(index)}>Remove</Button>
                                    {url && <Button color="red" onClick={() => setisUpdateMode(false)}>Cancel</Button>}

                                </Flex>
                            </Flex>
                        )) : <Flex direction={'column'} gap="5px" w={'100%'}
                            h={'100%'}>
                            <Button onClick={onImageUpload}
                                w={'100%'}
                                h={'100%'}
                                {...dragProps}>Upload Avatar</Button>
                            {url && <Button color="red" onClick={() => setisUpdateMode(false)}>Cancel</Button>}
                        </Flex>
                        }
                    </Flex>
                )}
            </ImageUploading>}
        </>
    )
}

export default AvatarUpload