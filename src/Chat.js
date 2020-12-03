import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import "./Chat.css";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import GiftIcon from "@material-ui/icons/GifTwoTone";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import firebase from "firebase";

function Chat() {
	const channelId = useSelector(selectChannelId);
	const user = useSelector(selectUser);
	const channelName = useSelector(selectChannelName);
	const [input, setInput] = useState("");
	const [messages, setMessages] = useState([]);
	const dummy = useRef();

	useEffect(() => {
		if (channelId) {
			db.collection("channels")
				.doc(channelId)
				.collection("messages")
				.orderBy("timestamp", "asc")
				.onSnapshot((snapshot) => {
					setMessages(snapshot.docs.map((doc) => doc.data()));
				});
		}
	}, [channelId]);

	const sendMessage = (e) => {
		e.preventDefault();
		db.collection("channels").doc(channelId).collection("messages").add({
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
			message: input,
			user: user,
		});
		setInput("");
		dummy.current.scrollIntoView({ behaviour: "smooth" });
	};

	return (
		<div className="chat">
			<ChatHeader channelName={channelName} />
			<div className="chat__messages">
				{messages.map((message) => (
					<Message
						timestamp={message.timestamp}
						message={message.message}
						user={message.user}
					/>
				))}
				<div ref={dummy}></div>
			</div>

			<div className="chat__input">
				<AddCircleOutlineRoundedIcon fontSize="large" />
				<form>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						disabled={!channelName}
						placeholder={`Message #${channelName} `}
					/>
					<button
						disabled={!input}
						onClick={sendMessage}
						className="chat__inputButton"
						type="submit"
					>
						Send message
					</button>
				</form>
				<div className="chat__inputIcons">
					<CardGiftcardIcon fontSize="large" />
					<GiftIcon fontSize="large" />
					<EmojiEmotionsIcon fontSize="large" />
				</div>
			</div>
		</div>
	);
}

export default Chat;
