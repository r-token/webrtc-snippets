// OFFER
// // sent over our signaling channel to the receiving side
// // we then set up a listener to our signaling channel
// // for when an answer to our offered session description is received from the receiving side
async function makeCall() {
    const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}
    const peerConnection = new RTCPeerConnection(configuration);
    signalingChannel.addEventListener('message', async message => {
        if (message.answer) {
            const remoteDesc = new RTCSessionDescription(message.answer);
            await peerConnection.setRemoteDescription(remoteDesc);
        }
    });
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    signalingChannel.send({'offer': offer});
}

// ANSWER
// // listen for an incoming offer, then create our RTCPeerConnection instance
// // then set the received offer using setRemoteDescription()
// // then call createAnswer() to create an answer for the received offer
// // that's then sent back to the calling side over our signaling server
const peerConnection = new RTCPeerConnection(configuration);
signalingChannel.addEventListener('message', async message => {
    if (message.offer) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        signalingChannel.send({'answer': answer});
    }
});

// Once the two peers have set both the local and remote session descriptions,
// they know the capabilities of the remote peer. We still need to collect the ICE candidates
// at each peer though and transfer (over the signaling channel) to the other peer

