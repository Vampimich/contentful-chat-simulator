import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import MessageItem from "../messageItem/MessageItem";
import { MessageItemI } from "@/interfaces/messageItem";

interface MessageContainerProps {
    allMessages : MessageItemI[];
}

const MessagesContainer: React.FC<MessageContainerProps> = ({allMessages}) => {
    return (
        <div tabIndex={0} key="msg-ctnr" className="messages-container">
            {allMessages.map((singleMessage) =>
                MessageItem(singleMessage)
            )}
        </div>
    );
};
export default MessagesContainer;
