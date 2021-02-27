// Once a RTCPeerConnection is connected to a remote peer,
// it is possible to stream audio and video between them.
// This is the point where we connect the stream we receive from getUserMedia()
// to the RTCPeerConnection.
// A media stream consists of at least one media track, and these are individually
// added to the RTCPeerConneciton when we want to transmit the media to the remote peer.

const localStream = await getUserMedia({video: true, audio: true});
const peerConnection = new RTCPeerConnection(iceConfig);

localStream.getTracks().forEach(track => {
    peerConnection.addTrack(track, localStream);
});

// Tracks can be added to a RTCPeerConnection before it has connected to a remote peer,
// so it makes sense to perform this setup as early as possible
// instead of waiting for the connection to be completed.


// To receive the remote tracks that were added by the other peer,
// we register a listener on the local RTCPeerConnection listeneing for the track event.
// Since playback is done on a MediaStream object, we first create an empty instance
// that we then populate with the tracks from the remote peer as we receive them.

const remoteStream = MediaStream();
const remoteVideo = document.querySelector('#remoteVideo');
remoteVideo.srcObject = remoteStream;

peerConnection.addEventListener('track', async (event) => {
    remoteStream.addTrack(event.track, remoteStream);
});
