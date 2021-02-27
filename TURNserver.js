// The following code snippet illustrates a sample configuration for an
// RTCPeerConnection where the TURN server has the hostname my-turn-server.mycompany.com
// and is running on port 194303.
// The configuration object also support the username and credentials properties for
// securing the access to the server.
// These are required when connecting to a TURN server

const iceConfiguration = {
    iceServers: [
        {
            urls: 'turn:my-turn-server.mycompany.com:19403',
            username: 'optional-username',
            credentials: 'auth-token'
        }
    ]
}

const peerConnection = new RTCPeerConnection(iceConfiguration);