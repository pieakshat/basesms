"use client"

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useAccount, useSendTransaction } from 'wagmi';
import { parseEther, isAddress } from 'viem';
import { useState } from 'react';
import { Address } from '@coinbase/onchainkit/identity';

// Fix 1: Correct props typing
interface MessageInputProps {
    to: `0x${string}`
}

export const MessageInput = ({ to }: MessageInputProps) => {
    const [message, setMessage] = useState('');

    const {
        data: hash,
        error,
        isPending,
        sendTransaction
    } = useSendTransaction();

    const { address } = useAccount();

    // Fix 2: Better error handling
    if (!address) {
        return <div>Please connect your wallet first</div>;
    }

    const isValidAddress = isAddress(to);

    // Convert string to hex
    const stringToHex = (str: string): `0x${string}` => {
        const hex = '0x' + Array.from(str)
            .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
            .join('');
        return hex as `0x${string}`;
    };

    async function send(msg: string, to: `0x${string}`) {
        if (!isValidAddress) return;
        if (!Address) return;
        try {
            const hexMessage = stringToHex(msg);
            console.log('Sending transaction:', {
                to,
                value: parseEther('0.00001'),
                data: hexMessage
            });

            // Fix 3: Proper error and success handling
            const hash = await sendTransaction({
                to,
                value: parseEther('0.00001'),
                data: hexMessage
            });

            console.log('Transaction result:', hash);
            setMessage(''); // Clear input on success

        } catch (error) {
            console.error('Transaction failed:', error);
        }
    }

    return (
        <div className="flex space-x-2">
            <Input
                placeholder="Type your message..."
                className="flex-1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!isValidAddress}
            />
            <Button
                onClick={() => send(message, to)}
                disabled={isPending || !message.trim() || !isValidAddress}
            >
                <Send className="h-4 w-4" />
                {isPending && <span className="ml-2">Sending...</span>}
            </Button>
            {error && (
                <div className="text-red-500 mt-2">
                    Error: {error.message}
                </div>
            )}
        </div>
    );
};