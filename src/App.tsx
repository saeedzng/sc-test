import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "@ton/core";
import WebApp from '@twa-dev/sdk';


function App() {
  const {
    contract_address,
    counter_value,
    contract_balance,
    sendIncrement ,
    sendDeposit,
    sendWithdrawalRequest,
    
  } = useMainContract();

  const { connected } = useTonConnect()
  const showmessagetouser= () => {
    let saythelink = sendIncrement;
    WebApp.showAlert(saythelink.toString());
  }
  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
        <b>{WebApp. platform}</b>
        <br/>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          <br/>
          {contract_balance && (<div className='Hint'>{ fromNano(contract_balance) }</div>)}
        </div>
        <a onClick={() => {
            showmessagetouser()
          }
        }>show message link</a>
        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value?? "Loading..."}</div>
        </div>
        {connected && (
              <a
                onClick={() => {
                  sendIncrement();
                  
                }}
              >
                Increment
              </a>
            )}
            <br/>
        {connected && (
              <a
                onClick={() => {
                  sendDeposit();
                }}
              >
                Request Deposit Of 1 TON
              </a>
            )}
            <br/>
        {connected && (
              <a
                onClick={() => {
                  sendWithdrawalRequest();
                }}
              >
                Request withdrawal Of 0.7 TON
              </a>
            )}

      </div>
    </div>
  );
}

export default App;