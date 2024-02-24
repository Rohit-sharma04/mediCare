// // VideoCall.jsx ---

import { useEffect, useCallback, useState, useContext } from "react";
import ReactPlayer from "react-player";
import peer from "../service/peer";
import { SocketContext } from "../context/SocketProvider";
import { useParams } from "react-router-dom";


const VideoCall = () => {
    const socket = useContext(SocketContext)
    const [remoteSocketId, setRemoteSocketId] = useState(null);
    const [myStream, setMyStream] = useState();
    const [remoteStream, setRemoteStream] = useState();
    const { callerId, receiverId } = useParams();
    const [callReceived, setCallReceived] = useState(false);

    useEffect(() => {
        console.log("room joined event ", callerId, receiverId)
        socket.emit("room:joined", { callerId, receiverId })
        socket.on("receiver:joinedRoom", () => {
            console.log("doctor joined the room ")
            setCallReceived(true);
        })
    }, [socket, callerId, receiverId])

    console.log("Local Audio Tracks:", myStream?.getAudioTracks());
    console.log("Remote Audio Tracks:", remoteStream?.getAudioTracks());

    const handleUserJoined = useCallback(({ id }) => {
        // console.log(`Email ${email} joined room`);
        setRemoteSocketId(id);
    }, []);

    const handleCallUser = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        const offer = await peer.getOffer();
        socket.emit("user:call", { to: remoteSocketId, offer });
        setMyStream(stream);
    }, [remoteSocketId, socket]);

    const handleIncommingCall = useCallback(
        async ({ from, offer }) => {
            setRemoteSocketId(from);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setMyStream(stream);
            console.log(`Incoming Call`, from, offer);
            const ans = await peer.getAnswer(offer);
            socket.emit("call:accepted", { to: from, ans });
        },
        [socket]
    );

    const sendStreams = useCallback(() => {
        for (const track of myStream.getTracks()) {
            peer.peer.addTrack(track, myStream);
        }
    }, [myStream]);

    const handleCallAccepted = useCallback(
        ({ from, ans }) => {
            peer.setLocalDescription(ans);
            console.log("Call Accepted!");
            sendStreams();
        },
        [sendStreams]
    );

    const handleNegoNeeded = useCallback(async () => {
        const offer = await peer.getOffer();
        socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    }, [remoteSocketId, socket]);

    useEffect(() => {
        peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
        return () => {
            peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
        };
    }, [handleNegoNeeded]);

    const handleNegoNeedIncomming = useCallback(
        async ({ from, offer }) => {
            const ans = await peer.getAnswer(offer);
            socket.emit("peer:nego:done", { to: from, ans });
        },
        [socket]
    );

    const handleNegoNeedFinal = useCallback(async ({ ans }) => {
        await peer.setLocalDescription(ans);
    }, []);

    useEffect(() => {
        peer.peer.addEventListener("track", async (ev) => {
            const remoteStream = ev.streams;
            console.log("GOT TRACKS!!");
            console.log("remote stream ", remoteStream[0])
            setRemoteStream(remoteStream[0]);
        });
    }, []);

    const [caller, setCaller] = useState();
    const handleCaller = (data) => {
        console.log("caller ", data)
        setCaller(data)
    }
    useEffect(() => {
        socket.on("user:joined", handleUserJoined);
        socket.on("incomming:call", handleIncommingCall);
        socket.on("call:accepted", handleCallAccepted);
        socket.on("peer:nego:needed", handleNegoNeedIncomming);
        socket.on("peer:nego:final", handleNegoNeedFinal);
        socket.on("you are caller", handleCaller);
        return () => {
            socket.off("user:joined", handleUserJoined);
            socket.off("incomming:call", handleIncommingCall);
            socket.off("call:accepted", handleCallAccepted);
            socket.off("peer:nego:needed", handleNegoNeedIncomming);
            socket.off("peer:nego:final", handleNegoNeedFinal);
        };
    }, [
        socket,
        handleUserJoined,
        handleIncommingCall,
        handleCallAccepted,
        handleNegoNeedIncomming,
        handleNegoNeedFinal,
    ]);

    return (
        <div className="bg-gradient-to-r from-[#E55D87] to-[#5FC3E4]">

            <div className={`relative ${caller && !myStream ? 'h-[calc(100vh-96px)]' : 'h-[90vh]'}`}>
                {/* <!-- Remote Video Container --> */}
                <div className="absolute inset-0 flex justify-center items-center ">
                    {/* sm:h-4/5 h-full sm:w-4/5 */}
                    <div className="relative border-8 border-gray-300 rounded-xl">
                        {/* <!-- Remote Video --> */}
                        {remoteStream ? (
                            < ReactPlayer
                            // w-full h-full
                                className="object-cover bg-green-400"
                                playing={true}
                                // controls={true}
                                volume={1}
                                height="100%"
                                width="100%"
                                url={remoteStream}
                            />
                        ) :
                            <>
                                <div className="relative flex h-full w-full items-center justify-center z-40">
                                    <i className="fa-solid fa-bell animate-wiggle inline text-lg text-teal-600" />
                                    <div className="absolute  inline rounded-full bg-teal-500 px-1.5 text-center text-sm text-black w-40 h-40 ">

                                        <div className="absolute start-0 top-0 -z-10 h-full w-full animate-ping rounded-full bg-teal-200" />
                                    </div>

                                </div>
                           
                            </>
                        }
                        {/* <!-- Local Video Overlay --> */}
                        <div className="absolute inset-0 flex justify-end items-end">
                            <div className="w-1/4 h-1/4 mr-4 mb-4">
                                {/* <!-- Local Video --> */}
                                {myStream && (
                                    < ReactPlayer
                                        className="w-full h-full bg-red-500 object-cover"
                                        playing={true}
                                        // controls={true}
                                        volume={1}
                                        height="100%"
                                        width="100%"
                                        url={myStream}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {caller && !myStream ? <div className="text-center text-blue-300 font-bold text-4xl">Calling ...</div> : null}
            <div className=" flex items-center justify-center ">
                {/* send stream by receiver */}

                {myStream && caller != callerId && <button onClick={sendStreams} className="bg-green-400 p-3 rounded-full mx-2 flex">
                    Send Stream
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-1 ">
                        <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-4.72 4.72a.75.75 0 1 1-1.06-1.06l4.72-4.72h-2.69a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                </button>}
                {/*  Call- used by user*/}
                {remoteSocketId && callReceived && caller == callerId && <button onClick={handleCallUser} className="bg-green-400 p-3 rounded-full mx-2 flex">
                    Send Stream
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-1">
                        <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-4.72 4.72a.75.75 0 1 1-1.06-1.06l4.72-4.72h-2.69a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>

                </button>}

                <button className="bg-red-500 p-3 rounded-full mx-2 flex my-1">
                    End
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 mx-1">
                        <path fillRule="evenodd" d="M15.22 3.22a.75.75 0 0 1 1.06 0L18 4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06L19.06 6l1.72 1.72a.75.75 0 0 1-1.06 1.06L18 7.06l-1.72 1.72a.75.75 0 1 1-1.06-1.06L16.94 6l-1.72-1.72a.75.75 0 0 1 0-1.06ZM1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            </div>
    );
};

export default VideoCall;
