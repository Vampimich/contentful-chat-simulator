import { ChangeEvent, FC, useEffect } from "react";

interface ArchiveConversationItemProps {
    archiveConversationTitle: any
    key: string,
    indexGetter : (arg: number) => void
}

const ArchiveConversationItem: FC<ArchiveConversationItemProps> = ({
    archiveConversationTitle,
    key,
    indexGetter
}) => {

    //useEffect(() => {}, []);

    const onItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        indexGetter(Number(archiveConversationTitle.split("_",1)[0]));
    }
    
    return (
        <div tabIndex={0} onClick={onItemClick} key={key} className={`conversation-card`}>
            {archiveConversationTitle !== undefined  ? archiveConversationTitle.slice(2) : 'b'}
        </div>
    );
};

export default ArchiveConversationItem;
