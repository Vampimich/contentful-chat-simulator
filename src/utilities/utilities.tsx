export const dateParser = (currentDateString:string) => {

    let parsedCurrentDateString = currentDateString.replace(
        /[ /)\(:-]/g,
        "_"
    );
    let dateForIdArray = parsedCurrentDateString.split("_", 7);
    let dateForId = dateForIdArray.join("_");
    return dateForId
}

export const CHATBOT_MESSAGES = [
    "Are you ok?",
    "Remember that you're important.",
    "Could you please elaborate?",
    "I see.",
    "I'm sorry you're feeling that way.",
    "How are you?",
    "I'm going to help you.",
    "I'm here with you."
]

export const getRandomInt = (max:number) => {
    return Math.floor(Math.random() * max);
}

export const getChatBotRandomMessage = () => {
    return CHATBOT_MESSAGES[getRandomInt(CHATBOT_MESSAGES.length)]; 
}