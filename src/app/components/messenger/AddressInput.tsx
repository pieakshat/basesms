import { Input } from '@/components/ui/input';
import { isAddress } from 'viem';

interface AddressInputProps {
    value: string;
    onChange: (value: string) => void;
}

export const AddressInput = ({ value, onChange }: AddressInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        onChange(newValue);
    };

    const isValid = value ? isAddress(value) : true;

    return (
        <div className="flex space-x-2">
            <Input
                placeholder="Enter recipient address (0x...)"
                className={`flex-1 ${!isValid ? 'border-red-500' : ''}`}
                value={value}
                onChange={handleChange}
            />
            {!isValid && (
                <span className='text-sm text-red-500'>
                    Please enter a valid Ethereum address
                </span>
            )}
        </div>
    );
};