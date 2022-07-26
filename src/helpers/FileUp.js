export const FileUp = async (file) => {
    //conectado a mi cuenta de cloudinary
    const urlCloudinary = 'https://api.cloudinary.com/v1_1/dcyn2bjb9/upload'

    const formData = new FormData()

    formData.append('upload_preset', 'ml_default'); //preset de subida de archivos cloudinary
    formData.append('file', file); // lo que voy a subir 

    const resp = await fetch(urlCloudinary, {
        method: 'POST',
        body: formData
    })
    const data = await resp.json()
    console.log(data)
    console.log(data.secure_url)
    return data.secure_url
}