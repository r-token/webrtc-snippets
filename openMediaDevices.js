const openMicrophone = async (contraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints)
}

try {
    const stream = openMicrophones({'video': false, 'audio': true})
    console.log('Got MediaStream:', stream)
} catch (err) {
    console.error('Error accessing media devices.', err)
}