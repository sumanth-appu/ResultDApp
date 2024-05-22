document.addEventListener('DOMContentLoaded', async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return;
    }
  
    const contractABI = await fetch('/abi').then(response => response.json());
    const contractAddress = await fetch('/address').then(response => response.json()).then(data => data.address);
  
    const contract = new web3.eth.Contract(contractABI, contractAddress);
  
    document.getElementById('addBatch').addEventListener('click', async () => {
      const batchId = document.getElementById('batchId').value;
      const studentRecordsRoot = document.getElementById('studentRecordsRoot').value;
      const ipfsHash = document.getElementById('ipfsHash').value;
      const accounts = await web3.eth.getAccounts();
      await contract.methods.addBatch(batchId, studentRecordsRoot, ipfsHash).send({ from: accounts[0] });
    });
  
    document.getElementById('getBatch').addEventListener('click', async () => {
      const batchId = document.getElementById('getBatchId').value;
      const batch = await contract.methods.getBatch(batchId).call();
      document.getElementById('batchDetails').textContent = JSON.stringify(batch, null, 2);
    });
  });
  