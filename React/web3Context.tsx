import { createContext, useState, PropsWithChildren, useEffect, useContext } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../constants";
import CONTRACT_JSON from "../constants/contract.json";

type StakerContextType = {
  metamaskWallet: any;
  metamaskAccount: any;
  connectToWallet: () => void;
  isLoading: boolean;
  getSigner: () => ethers.providers.JsonRpcSigner;
  isNetworkGoerli: boolean | undefined;
};

let metamaskWallet: ethers.providers.ExternalProvider | undefined;
if (typeof window !== "undefined") {
  // @ts-ignore
  metamaskWallet = window.ethereum;
}

export const StakerContext = createContext<StakerContextType | null>(null);

export const StakerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [metamaskAccount, setMetamaskAccount] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [contract, setContract] = useState<ethers.Contract>();

  const [isNetworkGoerli, setIsNetworkGoerli] = useState<boolean>();

  useEffect(() => {
    (async () => {
      const account = await findMetaMaskAccount();
      if (account !== null) {
        checkIfNetworkIsGoerli();
        setMetamaskAccount(account);
        setIsLoading(false);
      }
      (metamaskWallet as any).on("accountsChanged", (accounts: any[]) => {
        if (!accounts.length) {
          setMetamaskAccount(undefined);
          setIsNetworkGoerli(undefined);
        } else {
          setMetamaskAccount(accounts[0]);
        }
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findMetaMaskAccount = async () => {
    try {
      if (!metamaskWallet || !metamaskWallet.request) return null;

      const accounts = await metamaskWallet.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        return account;
      } else {
        setIsLoading(false);
        console.error("No authorized account found");
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const connectToWallet = async () => {
    if (!metamaskWallet || !metamaskWallet.request) return null;

    const accounts = await metamaskWallet.request({
      method: "eth_requestAccounts",
    });

    setMetamaskAccount(accounts[0]);
    checkIfNetworkIsGoerli();
    return accounts[0];
  };

  const getSigner = () => {
    if (metamaskWallet && metamaskAccount) {
      const provider = new ethers.providers.Web3Provider(metamaskWallet);
      const signer = provider.getSigner();
      return signer;
    } else {
      throw alert("Connect to Wallet");
    }
  };

  const checkIfNetworkIsGoerli = async () => {
    if (metamaskWallet) {
      const provider = new ethers.providers.Web3Provider(metamaskWallet);
      const network = await provider.getNetwork();
      if (network.name === "goerli") {
        setIsNetworkGoerli(true);
      } else {
        setIsNetworkGoerli(false);
      }
      return network.name === "goerli";
    }
  };

  //
  //
  // CONTRACT FUNCTIONS BELOW
  //
  //

  const getContract = (signer: ethers.Signer | ethers.providers.Provider | undefined): ethers.Contract => {
    if (contract) return contract;
    const fetchedContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_JSON.abi, signer);
    setContract(fetchedContract);
    return fetchedContract;
  };

  const value = {
    metamaskWallet,
    metamaskAccount,
    connectToWallet,
    isLoading,
    getSigner,
    isNetworkGoerli,
  };

  return <StakerContext.Provider value={value}>{children}</StakerContext.Provider>;
};
