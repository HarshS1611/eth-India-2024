// import { useCallback, useEffect, useState } from "react";
// // import { Avatar, Name } from '@coinbase/onchainkit/identity';
// import {
//   Transaction,
//   TransactionButton,
//   TransactionSponsor,
//   TransactionStatus,
//   TransactionStatusAction,
//   TransactionStatusLabel,
// } from "@coinbase/onchainkit/transaction";
// import { LifecycleStatus } from "@coinbase/onchainkit/transaction";
// // import { Wallet, ConnectWallet } from '@coinbase/onchainkit/wallet";
// import {
//   ConnectWallet,
//   Wallet,
//   WalletDropdown,
//   WalletDropdownDisconnect,
// } from "@coinbase/onchainkit/wallet";
// import {
//   Address,
//   Avatar,
//   Name,
//   Identity,
//   Badge,
// } from "@coinbase/onchainkit/identity";
// import { color } from "@coinbase/onchainkit/theme";
// // import { useEffect, useState } from "react";

// import { getAddress } from "@coinbase/onchainkit/identity";

// export default function WalletComponents() {
//     // const [addressDetail, setAddress] = useState(null);
//     // useEffect(() => {
//     //   const getAddressDetails = async () => {
//     //     const address = await getAddress({ name: "sahasvivek001.cb.id" });
//     //     console.log("Address details:", address);
//     //     setAddress(addressDetail);
//     //   };
//     //   getAddressDetails();
  
//     // }, []);
  
//     return (
//       <div className="flex justify-end">
//         <Wallet>
//           <ConnectWallet>
//             <Avatar className="h-6 w-6" />
//             <Name />
//           </ConnectWallet>
//           <WalletDropdown>
//             <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
//               <Avatar />
//               <Name address="0xB14a7659486Af4ad46c598b404c259E895Da41e2"/>
//             <Address address="0xB14a7659486Af4ad46c598b404c259E895Da41e2" className={color.foregroundMuted} />
//             </Identity>
//             <WalletDropdownDisconnect />
//           </WalletDropdown>
//         </Wallet>
//       </div>
//     );
//   }




// "use client";
// import { useEffect, useState } from "react";
// import {
//   Transaction,
//   TransactionButton,
//   TransactionSponsor,
//   TransactionStatus,
//   TransactionStatusAction,
//   TransactionStatusLabel,
//   LifecycleStatus,
// } from "@coinbase/onchainkit/transaction";
// import {
//   ConnectWallet,
//   Wallet,
//   WalletDropdown,
//   WalletDropdownDisconnect,
// } from "@coinbase/onchainkit/wallet";
// import {
//   Address,
//   Avatar,
//   Name,
//   Identity,
//   Badge,
// } from "@coinbase/onchainkit/identity";
// import { color } from "@coinbase/onchainkit/theme";
// import { getAddress } from "@coinbase/onchainkit/identity";

// export default function WalletComponents() {

//   return (
//     <div className="flex justify-end">
//       <Wallet>
//         <ConnectWallet>
//           <Avatar className="h-6 w-6" />
//           <Name />
//         </ConnectWallet>
//         <WalletDropdown>
//           <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
//             <Avatar />
//             <Name address="0xB14a7659486Af4ad46c598b404c259E895Da41e2" />
//             <Address
//               address="0xB14a7659486Af4ad46c598b404c259E895Da41e2"
//               className={color.foregroundMuted}
//             />
//           </Identity>
//           <WalletDropdownDisconnect />
//         </WalletDropdown>
//       </Wallet>
//     </div>
//   );
// }




'use client';
import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name,
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

type WalletWrapperParams = {
  text?: string;
  className?: string;
  withWalletAggregator?: boolean;
};
export default function Login() {
  return (
    <>
      <Wallet>
        <ConnectWallet
        >
          <Avatar className="h-6 w-6" />
          <Name />
        </ConnectWallet>
        <WalletDropdown>
          <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick={true}>
            <Avatar />
            <Name />
            <Address />
            <EthBalance />
          </Identity>
          <WalletDropdownBasename />
          <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
            Go to Wallet Dashboard
          </WalletDropdownLink>
          <WalletDropdownFundLink />
          <WalletDropdownDisconnect />
        </WalletDropdown>
      </Wallet>
    </>
  );
}

