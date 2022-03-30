import React from "react";
import { Button } from "semantic-ui-react";
import "./style/index.css";
import "semantic-ui-css/semantic.min.css";
import useWeb3 from "./hooks/web3.js";
function App() {
  const [web3, connectMetamask, account, balance] = useWeb3();
  const onClick = async () => {
    await connectMetamask();
  };

  return (
    <div className="App">
      {account ? (
        <div>
          {account} - {balance}
        </div>
      ) : (
        <Button primary onClick={onClick}>
          Connect Metamaskd
        </Button>
      )}
    </div>
  );
}

export default App;
