import Web3 from 'web3';

// 替换为你的节点URL
const providerUrl = 'http://37.60.227.180:8545';

// 创建Web3实例
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

// 设置交易数据
const txData = {
    from: '0x80DcF27E8872a5D928b3838F3B14d3e82C301091', // 替换为你的地址
    to: '0x388228CEF2902e61FFa7E9f92682cD93289791d2', // 替换为接收方地址
    value: web3.utils.toWei('0.1', 'ether') // 发送金额，单位为 ether
};

// 私钥，用于签名交易
const privateKey = '792F7827FA157F8D5EF70E767BBC024A6D6D1DD32014F48C6B3934C619D23471'; // 替换为你的私钥

async function signAndSendTransaction() {
    try {
        // 获取当前的 gas 价格
        const gasPrice = await web3.eth.getGasPrice();
        
        // 估算交易所需的 gas 量
        const estimatedGas = await web3.eth.estimateGas(txData);
        
        // 设置交易数据中的 gas 和 gasPrice
        txData.gas = estimatedGas;
        txData.gasPrice = gasPrice;

        // 签名交易
        const signedTx = await web3.eth.accounts.signTransaction(txData, privateKey);
        
        // 发送已签名的交易并获取回执
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        
        // 打印交易回执
        console.log('Transaction receipt:', receipt);
    } catch (error) {
        console.error('Error signing or sending transaction:', error);
    }
}

// 每6秒执行一次交易
setInterval(signAndSendTransaction, 6000);
