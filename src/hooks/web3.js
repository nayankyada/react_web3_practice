import { useEffect, useState } from "react";
import Web3 from "web3";
const useWeb3 = () => {
  let web3;

  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  const [chainId, setChainId] = useState("");
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
  } else {
    const provider = new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/c42cdaff77b14d8aa379fd73d2585210"
    );
    web3 = new Web3(provider);
  }

  useEffect(() => {
    const g = async () => {
      await getBalance();
    };
    if (account) {
      g();
    }
  }, [account, chainId]);
  const getBalance = async () => {
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(account),
      "ether"
    );
    setBalance(balance);
  };
  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
      setAccount("");
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
    }
  };
  const handleNetworkChanged = (cid) => {
    setChainId(cid);
  };

  const connectMetamask = async () => {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then(handleAccountsChanged);
  };
  window.ethereum.on("accountsChanged", handleAccountsChanged);
  window.ethereum.on("networkChanged", handleNetworkChanged);

  return [web3, connectMetamask, account, balance, chainId];
};
export default useWeb3;
