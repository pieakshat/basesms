import {
    type Hash,
    encodeAbiParameters,
    parseAbiParameters,
    decodeAbiParameters,
    createPublicClient,
    http
} from 'viem';
import { base } from 'viem/chains';

export interface Message {
    from: string;
    to: string;
    content: string;
    timestamp: number;
}

export const encodeMessage = (content: string) => {
    return encodeAbiParameters(
        parseAbiParameters('string'),
        [content]
    );
};

export const decodeMessage = (data: string): string => {
    try {
        const decoded = decodeAbiParameters(
            parseAbiParameters('string'),
            data as `0x${string}`
        );
        return decoded[0];
    } catch (error) {
        console.error('Error decoding message:', error);
        return '';
    }
};

export const sendMessage = async (
    walletClient: any,
    to: string,
    content: string
): Promise<Hash> => {
    const encodedData = encodeMessage(content);

    const hash = await walletClient.sendTransaction({
        to,
        data: encodedData,
        value: BigInt(0),
    });

    return hash;
};

export const getMessages = async (
    publicClient: any,
    address: string,
    otherAddress: string
) => {
    try {
        // Get block number for time reference
        const blockNumber = await publicClient.getBlockNumber();

        // Get blocks for the last 1000 blocks (adjust as needed)
        const blocks = await Promise.all(
            Array.from({ length: 10 }, (_, i) =>
                publicClient.getBlock({
                    blockNumber: blockNumber - BigInt(i * 100),
                    includeTransactions: true
                })
            )
        );

        // Extract and filter transactions
        const transactions = blocks
            .flatMap(block => block.transactions)
            .filter(tx =>
                typeof tx !== 'string' && // Ensure it's a full transaction object
                ((tx.from === address && tx.to === otherAddress) ||
                    (tx.from === otherAddress && tx.to === address)) &&
                tx.data && tx.data !== '0x'
            );
        // console.log("transactions: ", blocks.map(block => block.transactions));
        // Convert to messages
        const messages: Message[] = transactions
            .map(tx => ({
                from: tx.from,
                to: tx.to,
                content: decodeMessage(tx.data),
                timestamp: Number(tx.timestamp || Date.now() / 1000)
            }))
            .sort((a, b) => a.timestamp - b.timestamp);

        console.log(messages);
        return messages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        return [];
    }
};

// Helper function to get latest contacts
export const getLatestContacts = async (
    publicClient: any,
    address: string
) => {
    try {
        const blockNumber = await publicClient.getBlockNumber();
        const blocks = await Promise.all(
            Array.from({ length: 5 }, (_, i) =>
                publicClient.getBlock({
                    blockNumber: blockNumber - BigInt(i * 100),
                    includeTransactions: true
                })
            )
        );

        const contacts = new Set<string>();

        // biome-ignore lint/complexity/noForEach: <explanation>
        blocks.forEach(block => {
            // biome-ignore lint/complexity/noForEach: <explanation>
            block.transactions
                // @ts-ignore
                .filter(tx => typeof tx !== 'string' && tx.from === address && tx.data && tx.data !== '0x')
                // @ts-ignore
                .forEach(tx => {
                    if (typeof tx !== 'string' && tx.to) {
                        contacts.add(tx.to);
                    }
                });
        });

        return Array.from(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
};