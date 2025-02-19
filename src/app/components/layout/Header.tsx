import { WalletComponents } from '../messenger/ConnectWallet';

export const Header = () => {
    return (
        <header className="border-b bg-white relative z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Blockchain Messenger</h1>
                <div className="relative">
                    <WalletComponents />
                </div>
            </div>
        </header>
    );
};