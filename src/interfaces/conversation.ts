// interfaces/author.ts
export type Conversation = {
    contentTypeId: "conversation",
    fields: {
        conversationTitle: string;
        messageTranscript: any;
    }
  };
  