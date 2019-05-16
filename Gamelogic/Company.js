Object.defineProperty(exports, "__esModule", { value: true });
class Share {
  constructor (quantity, company) {
    this.quantity = quantity,
    this.company = company
  }
}

class Player {
  constructor(availableMoney, utilities, shares, smoney, id){
    this.availableMoney = availableMoney;
    this.utilities = utilities;
    this.shares = shares;
    this.smoney = smoney;
    this.id = id;
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

    this.players = [];
  }

  addNewPlayer(id) {
    this.players.push(new Player(10000, 0, [], 10000, id));
  }

  removePlayer(id) {
    const playerLeaving = this.players.find( (player) => {return player.id === id});
    const playerLeavingIndex = this.players.indexOf(playerLeaving);

    if (playerLeavingIndex > -1) {
      this.players.splice(playerLeavingIndex, 1);
    }
  }
}
exports.default = new Game();
