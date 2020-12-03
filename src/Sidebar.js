import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import SidebarChannel from "./SidebarChannel";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import HeadsetIcon from "@material-ui/icons/Headset";
import MicIcon from "@material-ui/icons/Mic";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import db from "./firebase";

function Sidebar() {
	const user = useSelector(selectUser);
	const [channels, setChannels] = useState([]);

	useEffect(() => {
		// add channel functionality
		db.collection("channels").onSnapshot((snapshot) =>
			setChannels(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					channel: doc.data(),
				}))
			)
		);
	}, []);

	const addChannel = () => {
		// function
		const channelName = prompt("Enter channels name");
		if (channelName) {
			db.collection("channels").add({
				channelName: channelName,
			});
		}
	};

	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<h3> ChaluAtmaa </h3>
				<ExpandMoreIcon />
			</div>
			<div className="sidebar__channels">
				<div className="sidebar__channelsHeader">
					<div className="sidebar__header">
						<ExpandMoreIcon />
						<h4>Text Channels</h4>
					</div>
					<AddIcon onClick={addChannel} className="sidebar__addChannel" />
				</div>
				<div className="sidebar__channelslist">
					{channels.map(({ id, channel }) => (
						<SidebarChannel
							key={id}
							id={id}
							channelName={channel.channelName}
						/>
					))}
				</div>
			</div>
			<div className="sidebar__voice">
				<SignalCellularAltIcon
					className="sidebar__voiceIcon"
					fontSize="large"
				/>
				<div className="sidebar__voiceInfo">
					<h3>Voice Connected</h3>
					<p>Stream</p>
				</div>
				<div className="sidebar__voiceIcons">
					<InfoOutlinedIcon />
					<CallIcon />
				</div>
			</div>
			<div className="sidebar__profile">
				<Avatar
					className="sidebar__profileImage"
					onClick={() => auth.signOut()}
					src={user.photo}
				/>
				<div className="sidebar__profileInfo">
					<h3>@{user.displayName.split(" ")[0]}</h3>
					<p>#{user.uid.substring(0, 6)}</p>
				</div>
				<div className="sidebar__profileIcons">
					<HeadsetIcon />
					<MicIcon />
					<SettingsIcon />
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
