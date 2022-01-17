


import './App.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { useState } from 'react';
import  { Toaster,toast } from 'react-hot-toast'

function App() {

  // const [copied, setCopied] = useState(false);

  return (
    <>
      <CopyToClipboard text="https://google.com">
          <p
            onClick={() => toast('texto copiado',{position:'bottom-right'})}
            style={{ textAlign: 'center' }}>copy me!!!</p>
      </CopyToClipboard>
      <Toaster />
    </>

  );
}

export default App;
