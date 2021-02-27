/*
    A MediaStream represents a stream of media content,
    which consists of tracks (MediaStreamTrack) of audio and video.
    You can retrieve all the tracks from MediaStream by calling MediaStream.getTracks(),
    which returns an array of MediaStreamTrack objects.
*/
let tracks = MediaStream.getTracks()

/*
    A MediaStreamTrack has a kind property that is either audio or video,
    indicating the kind of media it represents.
    Each track can be muted by toggling its enabled property.
    A track has a Boolean property remote that indicates
    if it is sourced by an RTCPeerConnection and coming from a remote peer.
*/
tracks.forEach(track => {
    console.log(track.kind) // indicates whether it's an audio or video track
    console.log(track.remote) // indicates whether it's coming from a remote peer
    track.enabled = true // mute/unmute a track
});