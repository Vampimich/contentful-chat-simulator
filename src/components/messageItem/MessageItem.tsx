import { ChangeEvent, FC } from "react";
import { MessageItemI } from "@/interfaces/messageItem";

const MessageItem: FC<MessageItemI> = ({
    message,
    author,
    isFromChatBot,
    id,
}) => {
    return (
        <div
            key={id}
            className={`message-row ${
                isFromChatBot ? "chatbot-message" : "user-message"
            }`}
        >
            <div tabIndex={0} className={`message-item`}>
                <p>{author}</p>
                <p> {message}</p>
            </div>
        </div>
    );
};

export default MessageItem;
