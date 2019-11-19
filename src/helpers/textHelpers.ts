
const MAGIC_LENGTH = 5;

export function splitNumberList(userEntry: string): number[] {
    const userSplit = userEntry.split(',');
    if (userSplit.length !== MAGIC_LENGTH) {
        console.log('You gave me bad info');
        return [];
    }
    const unsanitizedSplit = userSplit.map(entry => parseInt(entry));
    const sanitizedSplit = unsanitizedSplit.filter(val => val !== undefined);
    if (sanitizedSplit.length === MAGIC_LENGTH) {
        return sanitizedSplit;
    }
    return [];
}

export function splitLabelList(userEntry: string): string[] {
    const userSplit = userEntry.split(',');
    if (userSplit.length !== MAGIC_LENGTH) {
        console.log('You gave me bad info');
        return [];
    }
    return userSplit;
}
