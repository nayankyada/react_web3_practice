import { useEffect, useState } from "react";
import Web3 from "web3";
const useWeb3 = () => {
  let web3;

  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState(0);
  if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    web3 = new Web3(window.ethereum);
  } else {
    const provider = new Web3.providers.HttpProvider(
      "https://rinkeby.infura.io/v3/c42cdaff77b14d8aa379fd73d2585210"
    );
    web3 = new Web3(provider);
  }
  const getBalance = async () => {
    const balance = web3.utils.fromWei(
      await web3.eth.getBalance(account),
      "ether"
    );
    setBalance(balance);
  };
  useEffect(() => {
    const g = async () => {
      await getBalance();
    };
    if (account) {
      g();
    }
  }, [account]);
  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
      setAccount("");
    } else if (accounts[0] !== account) {
      setAccount(accounts[0]);
    }
  };
  window.ethereum.on("accountsChanged", handleAccountsChanged);

  const connectMetamask = async () => {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then(handleAccountsChanged);
  };

  return [web3, connectMetamask, account, balance];
};
export default useWeb3;
