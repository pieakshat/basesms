import { Input } from '@/components/ui/input';

export const AddressInput = () => {
    return (
        <div className="flex space-x-2">
            <Input
                placeholder="Enter recipient address (0x...)"
                className="flex-1"
            />
        </div>
    );
};