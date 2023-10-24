import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import MessageItem from "../messageItem/MessageItem";
import { MessageItemI } from "@/interfaces/messageItem";

interface MessageContainerProps {
    allMessages : MessageItemI[];
}

const Header: React.FC = () => {
    return (
        <div tabIndex={0} className="header-div">
            <a className="header-item" href="/">Chat</a>
            <a className="header-item" href="/archive">Archive</a>
        </div>
    );
};
export default Header;
