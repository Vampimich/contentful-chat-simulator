import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import ClientNameGetter from "../clientNameGetter/ClientNameGetter";
import ClientMessageSender from "../clientMessageSender/ClientMessageSender";
import { dateParser } from "@/utilities/utilities";

const ClientUser: React.FC = () => {
    const [clientName, setClientName] = useState<string>("");
    const [conversationTime, setConversationTime] = useState("");

    // Callback function to handle data received from the
    //child component
    const handleChildNameCallback = (childData: string): void => {
        // Update the name in the component's state
        setClientName(childData);

    };

    useEffect(() => {
        let newDate = new Date();
        let currentDateString = newDate.toString();
        let dateForConversationName = dateParser(currentDateString);
        let conversationNameString = clientName + "_" + dateForConversationName;
        setConversationTime(conversationNameString);
        console.log("conver", conversationTime)
    }, [clientName]);
    return (
        <div>
            {clientName === "" && <ClientNameGetter parentCallback={handleChildNameCallback} />}
            <ClientMessageSender clientName={clientName} conversationTime={conversationTime}></ClientMessageSender>
        </div>
    );
};
export default ClientUser;
