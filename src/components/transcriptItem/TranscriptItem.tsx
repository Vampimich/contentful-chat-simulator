import { ChangeEvent, FC, useEffect } from "react";

interface TranscriptItemProps {
    messageDate: string,
    messageAuthor: string,
    messageBody: string
    key: string,
}

const TranscriptItem: FC<TranscriptItemProps> = ({
    messageAuthor,
    messageBody,
    messageDate,
    key
}) => {

    //useEffect(() => {}, []);
    
    return (
        <div  tabIndex={0} key={key} className={`transcript-message-card`}>
            <p>{messageDate}</p>
            <p>{messageAuthor}</p>
            <p>{messageBody}</p>
        </div>
    );
};

export default TranscriptItem;