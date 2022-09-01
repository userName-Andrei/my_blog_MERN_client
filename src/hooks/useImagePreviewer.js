import {useState} from 'react';

const useImagePreviewer = (ref) => {
    const [preview, setPreview] = useState({});
    const [previewURL, setPreviewURL] = useState('');
    const reader = new FileReader();
    
    const onChangePreview = (e) => {
        setPreview(e.target.files[0])

        reader.readAsDataURL(e.target.files[0])

        reader.onloadend = () => {
            setPreviewURL(reader.result)
        }
    }

    const onDeletePreview = () => {
        setPreview({})
        setPreviewURL('')
        ref.current.value = ''
    }

    return ({onChangePreview, onDeletePreview, preview, previewURL, setPreviewURL})
}

export default useImagePreviewer;