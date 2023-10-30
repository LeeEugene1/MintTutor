
// import { ethers } from 'ethers';
// Dapp Status Section
const accountsDiv = document.getElementById('accounts');

// Basic Actions Section
const onboardButton = document.getElementById('connectButton');

const initialize = async () => {
    ethersProvider = new ethers.providers.Web3Provider(window.ethereum, 'any');

}
// const isMetaMaskConnected = () => accounts && accounts.length > 0;

const updateButtons = () => {
    // if (isMetaMaskInstalled()) {
    //     addEthereumChain.disabled = false;
    //     switchEthereumChain.disabled = false;
    // } else {
    //     onboardButton.innerText = 'Click here to install MetaMask!';
    //     onboardButton.onclick = onClickInstall;
    //     onboardButton.disabled = false;
    // }

    // if (isMetaMaskConnected()) {
    //     onboardButton.innerText = 'Connected';
    //     onboardButton.disabled = true;
    //     if (onboarding) {
    //         onboarding.stopOnboarding();
    //     }
    // } else {
        onboardButton.innerText = 'Connect';
        onboardButton.onclick = onClickConnect;
        onboardButton.disabled = false;
    // }
}
const onClickConnect = async () => {
    try {
    const newAccounts = await ethereum.request({
        method: 'eth_requestAccounts',
    });
    handleNewAccounts(newAccounts);
    } catch (error) {
    console.error(error);
    }
};
function handleNewAccounts(newAccounts) {
    accounts = newAccounts;
    accountsDiv.innerHTML = accounts;
    // fromDiv.value = accounts;
    // gasPriceDiv.style.display = 'block';
    // maxFeeDiv.style.display = 'none';
    // maxPriorityDiv.style.display = 'none';
    // if (isMetaMaskConnected()) {
    // initializeAccountButtons();
    // }
    updateButtons();
}

window.addEventListener('load', initialize);
