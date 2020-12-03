import React from "react";
import "./ChatHeader.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import PeopleOutlineRoundedIcon from "@material-ui/icons/PeopleOutlineRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";

function ChatHeader({ channelName }) {
	return (
		<div className="chatHeader">
			<div className="chatHeader__left">
				<h3>
					<span className="chatHeader__hash">#</span> {channelName}
				</h3>
			</div>

			<div className="chatHeader__right">
				<NotificationsIcon />
				<EditLocationIcon />
				<PeopleOutlineRoundedIcon />

				<div className="chatHeader__search">
					<input type="text" placeholder="Search" />
					<SearchRoundedIcon />
				</div>
				<SendRoundedIcon />
				<HelpRoundedIcon />
			</div>
		</div>
	);
}

export default ChatHeader;
