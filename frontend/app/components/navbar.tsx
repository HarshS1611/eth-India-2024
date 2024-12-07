'use client';
import {  AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Address,
    Avatar,
    EthBalance,
    Identity,
    Name
  } from '@coinbase/onchainkit/identity';
  import {
    ConnectWallet,
    Wallet,
    WalletDropdown,
    WalletDropdownBasename,
    WalletDropdownDisconnect,
    WalletDropdownFundLink,
    WalletDropdownLink,
  } from '@coinbase/onchainkit/wallet';
  
  import { color } from "@coinbase/onchainkit/theme";

export default function Navbar() {
    return (
        <div className="flex items-center justify-between pb-2 border-b-2 border-b-gray-500 mb-5 w-full md:w-[550px] ">
            <a className="font-serif mx-4 font-bold text-2xl" href="/">
                FIT CHAIN
            </a>
            <Wallet>
        <ConnectWallet className={color.inverse}>
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
            <Avatar />
            <Name/>
            <Address className={color.foregroundMuted} />
          </Identity>
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
            {/* <Avatar className="mx-4 ">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}

        </div>
    )
}