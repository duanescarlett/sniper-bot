
const { ethers } = require("ethers")
require('dotenv').config()

const IERC20 = [
    'function name() external pure returns(string memory)',
    'function symbol() external pure returns(string mamory)',
    'function decimals() external pure returns(uint8)',
    'function totalSupply() external view returns(uint256)',
    'function balanceOf(address owner) external view returns (uint256)',
    'function allowance(address owner, address spender) external view returns (uint256)',
    'function approve(address spender, uint256 value) external returns (bool)',
    'function transfer(address to, uint256 value) external returns (bool)',
    'function transferFrom(address from, address to, uint256 value) external returns (bool)',
    'function nonces(address owner) external view returns (uint256)',
    'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external'
]

const V2Router = [
    'function addLiquidity(address tokenA, address tokenB, uint256 amountADesired, uint256 amountBDesired, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) external returns (uint256, uint256, uint256)',
    'function addLiquidityETH(address token, uint256 amountTokenDesired, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) payable external returns (uint256, uint256, uint256)',
    'function removeLiquidity(address tokenA, address tokenB, uint256 liquidity, uint256 amountAMin, uint256 amountBMin, address to, uint256 deadline) external returns (uint256, uint256)',
    'function removeLiquidityETH(address token, uint256 liquidity, uint256 amountTokenMin, uint256 amountETHMin, address to, uint256 deadline) external returns (uint256, uint256, uint256)'
]

const V2Factory = [
    'function getPair(address token0, address token1) external view returns (address)',
    'function allPairs(uint256 val) external view returns (address)',
    'event PairCreated(address indexed token0, address indexed token1, address pair, uint)'
]

const uFactoryAddress = '0x152eE697f2E276fA89E96742e9bB9aB1F2E61bE3'
const uRouterAddress = '0xF491e7B69E4244ad4002BC14e878a34207E38c29'
const WFTMAddress = '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83'

async function main() {
    // Connect to a network
    const provider = new ethers.providers.JsonRpcProvider(`https://rpc.ftm.tools/`)
    // Get gas price
    const gasPrice = await provider.getGasPrice()
    // Create wallet object
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
    // Get a signer
    const signer = wallet.connect(provider)
    // Look up the current block number
    let block = await provider.getBlockNumber()
    console.log('Block No# ', block)

    const uFactory = new ethers.Contract(uFactoryAddress, V2Factory, signer)
    const uRouter = new ethers.Contract(uRouterAddress, V2Router, signer)
    const WFTM = new ethers.Contract(WFTMAddress, IERC20, signer)

    const amt = '10' // How much FTM are you willing to spend on new coins
    const slippage = '0.05' // 5% slippage

    // uFactory.event.PairCreated({}, async (error, event) => {
    //     console.log(`New pair detected...\n`, event)
    // })

    // event PairCreated(address indexed token0, address indexed token1, address pair, uint);
    while (true) {
        uFactory.on("PairCreated", (error, event) => {
            console.log('The Event Listener: ', event)
        })
        console.log('Waiting => ')
    }

    // // WDow
    // const contract = new ethers.Contract(cpieV2RouterAddr, V2Router, signer)
    // const token = new ethers.Contract(cpieTokenAddr, IERC20, signer)
    // const factory = new ethers.Contract(cpieFactoryAddr, V2Factory, signer)

    // let amt = 5002 - 1020
    // let _amount = ethers.utils.parseEther("20")
    // let _amountMin = ethers.utils.parseEther(amt.toString())

    // // Get pair LP for approval
    // let liquid = await factory.getPair(cpieTokenAddr, WETH)
    // // console.log(liquid)
    // await token.approve(liquid, ethers.utils.parseEther("20"))

    // let val = {
    //     from: wallet.address,
    //     value: ethers.utils.parseUnits("1", "ether"),//ethers.utils.parseEther("0.1"),
    //     gasPrice: gasPrice,
    //     gasLimit: ethers.utils.hexlify(3000000), // 100 gwei
    //     nonce: provider.getTransactionCount(wallet.address, 'latest')
    // }

    // let timestamp = Math.round(new Date().getTime() / 1000)
    // timestamp += 3600

    // let trans = await contract.addLiquidityETH(
    //     cpieTokenAddr,
    //     _amount,
    //     0,
    //     0,
    //     wallet.address,
    //     timestamp,
    //     val
    // )

    // // wait until the transaction is mined
    // let result = await trans.wait()
    // console.log(result)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });