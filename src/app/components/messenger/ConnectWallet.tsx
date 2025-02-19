import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
    Address,
    Avatar,
    Name,
    Identity,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';

export function WalletComponents() {
    return (
        <div className="relative">
            <Wallet>
                <ConnectWallet>
                    <div className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
                        <Avatar className="h-6 w-6" />
                        <Name className="text-sm font-medium" />
                    </div>
                </ConnectWallet>
                <WalletDropdown className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                        <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10" />
                            <div className="flex flex-col">
                                <Name className="font-medium" />
                                <Address className={`text-sm ${color.foregroundMuted}`} />
                            </div>
                        </div>
                    </Identity>
                    <div className="border-t">
                        <WalletDropdownDisconnect className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50" />
                    </div>
                </WalletDropdown>
            </Wallet>
        </div>
    );
}