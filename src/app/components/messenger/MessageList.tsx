"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import { useAccount } from 'wagmi';
import { decodeAbiParameters, parseAbiParameters } from 'viem';
import { getMessages, type Message } from '@/utils/messageUtils';

// interface Message {
//     from: string;
//     to: string;
//     content: string;
//     timestamp: number;
// }

interface MessageListProps {
    to: `0x${string}`;
}

export const MessageList = ({ to }: MessageListProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const publicClient = usePublicClient();
    const [loading, setLoading] = useState(true);
    const { address } = useAccount();

    const decodeMessage = (data: string): string => {
        try {
            const decoded = decodeAbiParameters(
                parseAbiParameters('string'),
                data as `0x${string}`
            );
            return decoded[0];
        } catch (error) {
            console.error('Error decoding message:', error);
            return '[Undecodable message]';
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            const msgs = await getMessages(publicClient, address as string, to);
            setMessages(msgs);
            setLoading(false);
            console.log(msgs);
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 10000);
        return () => clearInterval(interval);
    }, [publicClient, address as string, to]);

    // useEffect(() => {
    //     if (!publicClient || !address || !to) return;

    //     const fetchMessages = async () => {
    //         try {
    //             const blockNumber = await publicClient.getBlockNumber();
    //             const blocks = await Promise.all(
    //                 Array.from({ length: 10 }, (_, i) =>
    //                     publicClient.getBlock({
    //                         blockNumber: blockNumber - BigInt(i * 100),
    //                         includeTransactions: true
    //                     })
    //                 )
    //             );
    //             // console.log("Fetched blocks: ", blocks.map(block => block.transactions));

    //             console.log("Fetched transactions: ", blocks.flatMap(block => block.transactions));


    //             const transactions = blocks
    //                 .flatMap(block => block.transactions)
    //                 .filter(tx =>
    //                     typeof tx !== 'string' &&
    //                     ((tx.from === address && tx.to === to) || (tx.from === to && tx.to === address)) &&
    //                     tx.input && tx.input !== '0x'
    //                 );
    //             const tx = transactions[0];
    //             console.log("Transaction data: ", tx);
    //             // console.log(transactions);



    //             const allMessages: Message[] = transactions
    //                 .map(tx => ({
    //                     from: tx.from,
    //                     to: tx.to!,
    //                     content: decodeMessage(tx.input),
    //                     timestamp: Number(1234 || Date.now() / 1000)// hardcoded 1234
    //                 }))
    //                 .sort((a, b) => a.timestamp - b.timestamp);

    //             // console.log("messages: ", allMessages);
    //             setMessages(allMessages);
    //         } catch (error) {
    //             console.error('Error fetching messages:', error);
    //         }
    //     };

    //     fetchMessages();

    //     const unsubscribe = publicClient.watchBlockNumber({
    //         onBlockNumber: () => {
    //             fetchMessages();
    //         },
    //     });

    //     return () => {
    //         unsubscribe();
    //     };
    // }, [publicClient, address, to]);

    const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

    if (!publicClient || !address) {
        return (
            <ScrollArea className="flex-1 p-4 border rounded-md">
                <div className="text-center text-gray-500">Connecting to wallet...</div>
            </ScrollArea>
        );
    }

    return (
        <ScrollArea className="flex-1 p-4 border rounded-md">
            <div className="space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className="flex flex-col space-y-1">
                        <div className="text-sm text-gray-500">{formatAddress(message.from)}</div>
                        <div
                            className={`p-3 rounded-lg max-w-[80%] ${message.from.toLowerCase() === address.toLowerCase()
                                ? 'bg-blue-100 self-end'
                                : 'bg-gray-100'
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}
                {messages.length === 0 && (
                    <div className="text-center text-gray-500">
                        {to ? 'No messages with this address yet' : 'Enter an address to see messages'}
                    </div>
                )}
            </div>
        </ScrollArea>
    );
};
