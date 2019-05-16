Object.defineProperty(exports, "__esModule", { value: true });
class Share {
  constructor (quantity, company) {
    this.quantity = quantity,
    this.company = company
  }
}

class Player {
  constructor(availableMoney, utilities, shares, smoney){
    this.availableMoney = availableMoney;
    this.utilities = utilities;
    this.shares = shares;
    this.smoney = smoney;
  }
}

class Company {
  constructor(shares, price){
    this.shares = shares;
    this.price = price;
  }
}

class Game {
  constructor () {
    this.companies = [
      new Company(100000, 5),
      new Company(100000, 5),
      new Company(100000, 5),
    ]
    this.player1 = new Player(10000, 0, [], 10000);
    this.player2 = new Player(10000, 0, [], 10000);
  }
}
exports.default = new Game();
