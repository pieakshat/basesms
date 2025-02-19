import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { AddressInput } from './AddressInput';

export const ChatInterface = () => {
    return (
        <Card className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
            <CardContent className="flex flex-col h-full p-4 space-y-4">
                <AddressInput />
                <MessageList />
                <MessageInput />
            </CardContent>
        </Card>
    );
};
