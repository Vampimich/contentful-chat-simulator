import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { createClient, EntryCollection } from "contentful";


import { Messages } from "@/interfaces/messages";
import { Conversation } from "@/interfaces/conversation";

import ArchiveConversationItem from "../archiveConversationItem/ArchiveConversationItem";
import TranscriptItem from "../transcriptItem/TranscriptItem";

const Space = process.env.NEXT_PUBLIC_SPACE_ID!;
const Token = process.env.NEXT_PUBLIC_DELIVERY_TOKEN!;

const client = createClient({
    accessToken: Token,
    space: Space,
    environment: "master",
});

const Archive: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const [conversations, setConversations] = useState<Array<any>>([]);

    const handleIndexGetter = (indexFromConversationChild: number): void => {
        // Update the name in the component's state
        setActiveIndex(indexFromConversationChild);
        console.log(
            conversations[indexFromConversationChild].messageTranscript
        );
    };

    useEffect(() => {
        client
            .getEntries<Conversation>({
                content_type: "conversation",
            })
            .then((conversations) => {
                console.log(conversations.items);
                const conversationArrayOfObjs = conversations.items.map(
                    (conversation) => {
                        return conversation.fields;
                    }
                );
                console.log(conversationArrayOfObjs);
                setConversations(conversationArrayOfObjs);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <div className="archive-container"  tabIndex={0}>
            <div className="all-transcripts archive-section"  tabIndex={0}>
                <h2>All Conversations</h2>
                {conversations.length > 0 ? (
                    conversations.map((singleConversation, index) => (
                        <ArchiveConversationItem
                            key={
                                index +
                                "_" +
                                singleConversation.conversationTitle
                            }
                            archiveConversationTitle={
                                index +
                                "_" +
                                singleConversation.conversationTitle
                            }
                            indexGetter={handleIndexGetter}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
            <div className="transcript-messages archive-section"  tabIndex={0}>
                <h2>Messages</h2>
                {activeIndex !== -1 &&
                    conversations[activeIndex].messageTranscript.map(
                        (messagesArray: any, index: number) => (
                            <TranscriptItem
                                key={
                                    index +
                                    "_" +
                                    messagesArray.fields.messageTitle
                                }
                                messageDate={messagesArray.fields.messageSent}
                                messageAuthor={
                                    messagesArray.fields.messageAuthor
                                }
                                messageBody={messagesArray.fields.messageBody}
                            />
                        )
                    )}
            </div>
        </div>
    );
};
export default Archive;