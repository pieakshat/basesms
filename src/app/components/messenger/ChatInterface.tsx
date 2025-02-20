"use client"
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { AddressInput } from './AddressInput';

export const ChatInterface = () => {
    const [recipientAddress, setRecipientAddress] = useState('');

    return (
        <Card className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
            <CardContent className="flex flex-col h-full p-4 space-y-4">
                <AddressInput
                    value={recipientAddress}
                    onChange={setRecipientAddress}
                />
                <MessageList to={recipientAddress as `0x${string}`} />
                <MessageInput to={recipientAddress as `0x${string}`} />
            </CardContent>
        </Card>
    );
};
