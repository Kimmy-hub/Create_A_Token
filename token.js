class MyToken {
    constructor() {
        this.tokenName = "MyToken";
        this.tokenAbbrv = "MTK";
        this.totalSupply = 0;
        this.balances = {};
    }

    mint(address, value) {
        this.totalSupply += value;
        if (this.balances[address] === undefined) {
            this.balances[address] = 0;
        }
        this.balances[address] += value;
    }

    burn(address, value) {
        if (this.balances[address] === undefined || this.balances[address] < value) {
            throw new Error("Insufficient balance to burn");
        }
        this.totalSupply -= value;
        this.balances[address] -= value;
    }

    balanceOf(address) {
        return this.balances[address] || 0;
    }
}

const myToken = new MyToken();
console.log(`Token Name: ${myToken.tokenName}`);
console.log(`Token Abbreviation: ${myToken.tokenAbbrv}`);
console.log(`Total Supply: ${myToken.totalSupply}`);

myToken.mint('0x123', 100);
console.log(`Balance of 0x123: ${myToken.balanceOf('0x123')}`);
console.log(`Total Supply after minting: ${myToken.totalSupply}`);

try {
    myToken.burn('0x123', 50);
    console.log(`Balance of 0x123 after burning: ${myToken.balanceOf('0x123')}`);
    console.log(`Total Supply after burning: ${myToken.totalSupply}`);
} catch (e) {
    console.error(e.message);
}

try {
    myToken.burn('0x123', 100);
} catch (e) {
    console.error(e.message);
}
