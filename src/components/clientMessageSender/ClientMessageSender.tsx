import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";

import Input from "../input/Input";
import { MessageItemI } from "@/interfaces/messageItem";
import MessagesContainer from "../messagesContainer/MessagesContainer";

import { dateParser, getChatBotRandomMessage } from "../../utilities/utilities";

const contentfulManagement = require("contentful-management");

const Space = process.env.NEXT_PUBLIC_SPACE_ID!;

const CMAToken = process.env.REACT_APP_CONTENTFUL_ACCESS_TOKEN;

interface ClientMessageSenderProps {
    clientName: string;
    conversationTime: string;
}

const managementClient = contentfulManagement.createClient({
    accessToken: CMAToken,
});

//Component start
const ClientMessageSender: React.FC<ClientMessageSenderProps> = ({
    clientName,
    conversationTime,
}) => {
    const EmptyMessage = {
        messageAuthor: "",
        messageBody: "",
        messageTitle: "",
        messageSent: "",
    };
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState(false);
    const [messageObject, setMessageObject] = useState(EmptyMessage);
    const [messagesToDisplay, setMessagesToDisplay] = useState<
        Array<MessageItemI>
    >([]);
    const [messageIdArray, setMessageIdArray] = useState<Array<string>>([]);
    const [conversationActive, setConversationActive] = useState(true);

    const handleInputchange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleClientSendMessage = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputValue.trim()) {
            setError(true);
        } else {
            setError(false);
            parseInfoToSend();
        }
    };

    const endConversation = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setConversationActive(false);

        sendTranscriptToContentful();
    };

    const parseInfoToSend = () => {
        console.log(inputValue);
        let newDate = new Date();
        let currentDateString = newDate.toString();
        let dateForId = dateParser(currentDateString);

        let messageId = clientName + "_" + dateForId;

        setMessageObject({
            ...messageObject,
            messageAuthor: clientName,
            messageBody: inputValue,
            messageTitle: messageId,
            messageSent: currentDateString,
        });

        setMessagesToDisplay((currentArray) => [
            ...currentArray,
            {
                author: clientName,
                message: inputValue,
                isFromChatBot: false,
                id: messageId,
            },
        ]);

        setMessageIdArray((oldArray) => [...oldArray, messageId]);

        myAsyncFunction();

        console.log("CurrentDateString " + messageObject.messageSent);
        console.log("messageId " + messageObject.messageTitle);
        console.log("inputValue " + messageObject.messageBody);
        console.log("Clientname " + messageObject.messageAuthor);
    };

    const sendMessageToContentful = () => {
        managementClient
            .getSpace(Space)
            .then((space: any) => space.getEnvironment("master"))
            .then((environment: any) =>
                environment.createEntryWithId(
                    "messages",
                    messageObject.messageTitle,
                    {
                        fields: {
                            messageTitle: {
                                "en-US": messageObject.messageTitle,
                            },
                            messageAuthor: {
                                "en-US": messageObject.messageAuthor,
                            },
                            messageSent: {
                                "en-US": messageObject.messageSent,
                            },
                            messageBody: {
                                "en-US": messageObject.messageBody,
                            },
                        },
                    }
                )
            )
            .then((entry: any) => {
                console.log(entry);
                entry.publish();
            })
            .catch(console.error);
    };

    const sendTranscriptToContentful = () => {
        const transcriptArrayOfObjs = messageIdArray.map((messageId) => {
            return { sys: { type: "Link", linkType: "Entry", id: messageId } };
        });

        const converName = clientName + conversationTime;
        //console.log("Aqui/>", converName);

        managementClient
            .getSpace(Space)
            .then((space: any) => space.getEnvironment("master"))
            .then((environment: any) =>
                environment.createEntryWithId("conversation", converName, {
                    fields: {
                        conversationTitle: {
                            "en-US": conversationTime,
                        },
                        messageTranscript: {
                            "en-US": transcriptArrayOfObjs,
                        },
                    },
                })
            )
            .then((entry: any) => {
                console.log(entry);
                entry.publish();
            })
            .catch(console.error);
    };

    function delay(ms: number) {
        return new Promise<void>((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async function myAsyncFunction() {
        console.log("Let chatbot answer");
        await delay(2000);
        letChatBotAnswer();
    }

    const letChatBotAnswer = () => {
        let newDate = new Date();
        let currentDateString = newDate.toString();
        let dateForId = dateParser(currentDateString);

        let messageId = "ChatBot_" + dateForId;

        let ChatBotMessage = getChatBotRandomMessage();
        let newAuthorMessage = "ChatBot";

        setMessageObject({
            ...messageObject,
            messageAuthor: newAuthorMessage,
            messageBody: ChatBotMessage,
            messageTitle: messageId,
            messageSent: currentDateString,
        });

        setMessagesToDisplay((currentArray) => [
            ...currentArray,
            {
                author: newAuthorMessage,
                message: ChatBotMessage,
                isFromChatBot: true,
                id: messageId,
            },
        ]);

        setMessageIdArray((oldArray) => [...oldArray, messageId]);
    };

    useEffect(() => {
        sendMessageToContentful();
        setInputValue("");
    }, [messageObject]);

    return (
        <div className="page-center">
            {clientName !== "" && (
                <>
                    <form onSubmit={handleClientSendMessage}>
                        <h2 tabIndex={0}>Welcome {clientName}</h2>
                        <Input
                            aria-label="Message Input"
                            label="Message"
                            value={inputValue}
                            placeholder="You message here"
                            onChange={handleInputchange}
                            error={error}
                            disabled={!conversationActive}
                        ></Input>
                        {conversationActive && (
                            <button
                                aria-label="Send Message"
                                type="submit"
                                className="submit-btn generic-button"
                                tabIndex={0}
                            >
                                Send
                            </button>
                        )}
                    </form>
                    <button
                        aria-label="End Conversation"
                        className="red-button generic-button"
                        onClick={endConversation}
                        tabIndex={0}
                    >
                        End Conversation
                    </button>
                    <MessagesContainer
                        allMessages={messagesToDisplay}
                    ></MessagesContainer>
                </>
            )}
        </div>
    );
};

export default ClientMessageSender;
