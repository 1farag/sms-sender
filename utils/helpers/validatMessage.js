export function validateMessage(message) {
    let limit;
    let splitLength ;

    const checkArabic = /[ء-ي]/g;
    const checkEnglish = /[a-zA-Z]/g;

    const language = checkArabic.test(message) ? 'Arabic' : checkEnglish.test(message) ? 'English' : null;


    if (language === 'English') {
        limit = 160 ;
        splitLength = 153;
    } else if (language === 'Arabic') {
        limit = 70;
        splitLength = 67;
    } else {
        throw new Error('Unsupported language');
    }

    if (message.length <= limit) {
        // Message is within the limit, no splitting required
        return [message];
    } else {
        // Split the message into multiple messages
        const messages = [];
        let remainingMessage = message;

        while (remainingMessage.length > 0) {
            const currentMessage = remainingMessage.substring(0, splitLength);
            messages.push(currentMessage);
            remainingMessage = remainingMessage.substring(splitLength);
        }

        return messages;
    }
}

