// interfaces/author.ts
export type Messages = {
    contentTypeId: "messages",
    fields: {
        messageAuthor: string;
        messageBody: string;
        messageTitle: string;
        messageSent: string;
    }
  };