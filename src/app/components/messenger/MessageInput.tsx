"use client"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { useState } from 'react';

export const MessageInput = (to: `0x${string}`) => {
    const [message, setMessage] = useState('');

    const {
        data: hash,
        error,
        isPending,
        sendTransaction
    } = useSendTransaction();

    const { address } = useAccount();

    if (!address) {
        console.error("not connected!!");
    }

    // Convert string to hex
    const stringToHex = (str: string): `0x${string}` => {
        // Convert each character to hex and concatenate
        const hex = '0x' + Array.from(str)
            .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('');
        return hex as `0x${string}`;
    };

    async function send(msg: string, to: `0x${string}`) {
        // Convert message to hex before sending
        const hexMessage = stringToHex(msg);

        sendTransaction({
            to: to,
            value: parseEther('0.00001'),
            data: hexMessage
        });
    }

    return (
        <div className="flex space-x-2">
            <Input
                placeholder="Type your message..."
                className="flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button
                onClick={() => send(message, to)}
                disabled={isPending || !message.trim()}
            >
                <Send className="h-4 w-4" />
            </Button>
        </div>
    );
};