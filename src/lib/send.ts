import { useAccount } from 'wagmi';

export default async function sendTransaction() {
    const { address } = useAccount();

    if (!address) {
        console.log("Not connected!!")
        return;
    }

}