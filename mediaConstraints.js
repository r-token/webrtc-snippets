async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}

// Open camera with at least minWidth and minHeight capabilities
async function openCamera(cameraId, minWidth, minHeight) {
    const constraints = {
        'audio': {'echoCancellation': true},
        'video': {
            'deviceId': cameraId,
            'width': {'min': minWidth},
            'height': {'min': minHeight}
            }
        }

    return await navigator.mediaDevices.getUserMedia(constraints);
}

// Other constraints

// Camera with a resolution as close to 640x480 as possible
let nearConstraints = 
{
    "video": {
        "width": 640,
        "height": 480
    }
}

// Camera with a resolution in the range 640x480 to 1024x768
let rangeConstraints = {
    "video": {
        "width": {
            "min": 640,
            "max": 1024
        },
        "height": {
            "min": 480,
            "max": 768
        }
    }
}

// Camera with the exact resolution of 1024x768
let exactConstraints = {
    "video": {
        "width": {
            "exact": 1024
        },
        "height": {
            "exact": 768
        }
    }
}

// To determine the actual configuration a certain track of a media stream has,
// we can call MediaStreamTrack.getSettings()
// which returns the MediaTrackSettings currently applied.
MediaStreamTrack.getSettings()

const cameras = getConnectedDevices('videoinput');
if (cameras && cameras.length > 0) {
    // Open first available video camera with a resolution of 1280x720 pixels
    const stream = openCamera(cameras[0].deviceId, 1280, 720);
}