import { ScrollArea } from '@/components/ui/scroll-area';

export const MessageList = () => {
    return (
        <ScrollArea className="flex-1 p-4 border rounded-md">
            <div className="space-y-4">
                {/* Sample messages for layout purposes */}
                <div className="flex flex-col space-y-1">
                    <div className="text-sm text-gray-500">0x1234...5678</div>
                    <div className="bg-blue-100 p-3 rounded-lg max-w-[80%] self-end">
                        Hey there! How are you?
                    </div>
                </div>
                <div className="flex flex-col space-y-1">
                    <div className="text-sm text-gray-500">0x8765...4321</div>
                    <div className="bg-gray-100 p-3 rounded-lg max-w-[80%]">
                        I'm doing great, thanks for asking!
                    </div>
                </div>
            </div>
        </ScrollArea>
    );
};