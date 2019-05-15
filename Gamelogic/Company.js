Object.defineProperty(exports, "__esModule", { value: true });
class Share {
  constructor (price, owner, identifier) {
    this.price = price,
    this.owner = owner,
    this.identifier = identifier
  }
}
class Company {
  constructor () {
    this.price = 0;
    this.shares = [];
    this.companyA = [];
    this.companyB = [];
    this.companyC = [];
    this.player1 = {
      AvailableMoney: 10000,
      utilities:0,
      shares:[],
      SMoney:10000
    };
    this.player2 = {
      AvailableMoney:10000,
      utilities:0,
      shares:[],
      SMoney:10000
    };
    this.bid = 10;
  }


  //every share will get the same price, but different number which will help us sort them into its corresponding owner
  // the shares will then be sorted based on the owner and but into each company's stack
  createShares(price1){
    var sharess = [];
    for (let i = 0; i < 20; i++) {
      const newShare = new Share(price1, 1, i)
      sharess.push(newShare)
    }
    for (let i = 0; i < 20; i++) {
      const newShare = new Share(price1, 2, i)
      sharess.push(newShare)
    } for (let i = 0; i < 20; i++) {
      const newShare = new Share(price1, 3, i)
      sharess.push(newShare)
    }

    shares=sharess;
  }

  //organiza las acciones, no se por que pero quedan 20 espacios vacios, total este es el mvp
  shareSort(sharesToSort){
    for(var j=0; j<20; j++){
        companyA.push(sharesToSort[j]);
    }
    for(var k=20; k<40; k++){
        companyB.push(sharesToSort[k]);
    }
    for(var l=40; l<60; l++){
        companyC.push(sharesToSort[l]);
    }
    /*console.log(companyA);
    console.log(companyB);
    console.log(companyC);*/
  }

  //counts occupied spaces, used to see how many shares a company or user has available
  countOccupiedSpaces(array){
    var count=0;
    for(var i=0; i<array.length+1;i++)
    {
      if(array[i] != null && array[i] !==0){
        count++
      }
    }
    return count;
  }

  //function that returns true if player has enough money to buy the shares he is bidding for
  /**

      * @return {boolean}
      */
  EnoughMoney(player, bid, companyArray){
    var totalPrice = bid*companyArray[0].price;
    var enoughmoney=false;
    if(player.AvailableMoney>totalPrice){
      enoughmoney=true;
    }
    return enoughmoney;
  }

  //returns true if the share array is empty
  isEmpty(array){
    var isempty=false;
    if(array.isEmpty()){
      isempty=true;
    }
    return isempty;
  }

  RaisePrices(player1,player2, company, shareIdentifier){
    for(var i=0; i<player1.shares.length;i++){
      if(player1.shares[i].owner===1) {
        player1.shares[i].price += 1;
      }
    }
    for(var j=0; j<player2.shares.length;j++){
      if(player2.shares[j].owner===shareIdentifier ) {
        player2.shares[j].price += 1;
      }
    }

    for(var k=0; k<company.length; k++){
      company[k].price+=1;
    }
  }

  LowerPrices(player1,player2, company, shareIdentifier){
    for(var i=0; i<player1.shares.length;i++){
      if(player1.shares[i].owner===1) {
        player1.shares[i].price -= 1;
      }
    }
    for(var j=0; j<player2.shares.length;j++){
      if(player2.shares[j].owner===shareIdentifier ) {
        player2.shares[j].price -= 1;
      }
    }

    for(var k=0; k<company.length; k++){
      company[k].price-=1;
    }
  }

  buy(bid, player, company) {
    if (countOccupiedSpaces(company) < bid ) {
      console.log('buy operation invalid, seller has less shares than the amount you want to buy');
    }else if(EnoughMoney(player,bid,company)===false){
      console.log("you don't have any money to buy shares, sell shares to earn money");
    }else if(countOccupiedSpaces(company) > bid && EnoughMoney(player,bid,company)===true) {
      var amountDue = 0;
      for (var i = 0; i < bid; i++) {
          amountDue+=company[i].price;
          player.shares.push(company.pop())
      }

      player.AvailableMoney=player.AvailableMoney-amountDue;
      RaisePrices(player1, player2,company,company[0].owner)   
    }
  }

  transfer1(shareArray){
    var parallel=[];

    for(var j=0; j<shareArray.length; j++){
      if(shareArray[j].owner===1){
          parallel.push(shareArray[j]);
          shareArray[j]=0;
      }
    }
    for( var i = shareArray.length-1; i--;){
      if ( shareArray[i] === 0) shareArray.splice(i, 1);
    }
    /*var filtered =shareArray.filter(function (el) {
        return el !== 0;
    });
    shareArray=filtered*/

    return parallel;
  }

  sell1(offer, player, companyA) {
    if(countOccupiedSpaces(player.shares)<offer){
        console.log("you don't have any shares available");
    }else if(countOccupiedSpaces(player.shares) > offer){
      var parallel= transfer1(player.shares);
      var money=0;
      for(var i=0; i<offer;i++){
          money=parallel[i].price;
          companyA.push(parallel.pop());
      }
      LowerPrices(player1, player2, companyA, 1)
      player.AvailableMoney+=money;
    }
  }

  sell2(offer, player, companyB) {
    if(countOccupiedSpaces(player.shares)<offer){
        console.log("you don't have any shares available");
    }else if(countOccupiedSpaces(player.shares) > offer){
      var parallel= transfer2(player.shares);
      var money=0;
      for(var i=0; i<offer;i++){
        money=parallel[i].price;
        companyB.push(parallel.pop());
      }
      LowerPrices(player1, player2, companyB, 1)
      player.AvailableMoney+=money;
    }
  }

  sell3(offer, player, companyC) {
    if(countOccupiedSpaces(player.shares)<offer){
      console.log("you don't have any shares available");
    }else if(countOccupiedSpaces(player.shares) > offer){
      var parallel= transfer3(player.shares);
      var money=0;
      for(var i=0; i<offer;i++){
          money=parallel[i].price;
          companyC.push(parallel.pop());
      }
      LowerPrices(player1, player2, companyA, 1)
      player.AvailableMoney+=money;
    }
  }

  transfer2(shareArray){
    var parallel=[];

    for(var j=0; j<shareArray.length; j++){
      if(shareArray[j].owner===2){
          parallel.push(shareArray[j]);
          shareArray[j]=0;
      }
    }
    for( var i = shareArray.length-1; i--;){
        if ( shareArray[i] === 0) shareArray.splice(i, 1);
    }
    /*var filtered =shareArray.filter(function (el) {
        return el !== 0;
    });
    shareArray=filtered*/

    return parallel;
  }

  transfer3(shareArray){
    var parallel=[];

    for(var j=0; j<shareArray.length; j++){
      if(shareArray[j].owner===3){
        parallel.push(shareArray[j]);
        shareArray[j]=0;
      }
    }
    for( var i = shareArray.length-1; i--;){
      if ( shareArray[i] === 0) shareArray.splice(i, 1);
    }
    /*var filtered =shareArray.filter(function (el) {
        return el !== 0;
    });
    shareArray=filtered*/

    return parallel;
  }

  Winner(player1, player2){
    var Wincriteria1= player1.AvailableMoney-player1.SMoney;
    var Wincriteria2= player2.AvailableMoney-player2.SMoney;

    if(Wincriteria1>Wincriteria2){
      console.log('Player 1 Wins');
    }else if(Wincriteria2>Wincriteria1){
      console.log('Player 2 Wins');
    }
  }

  //shareABC are used as counters
  showHowMany(player,shareA,shareB,shareC){
    for(i=0; i<player.shares.length; i++){
      if(player.shares[i].owner===1){
        shareA+=1;
      }else if(player.shares[i].owner===2){
        shareB+=1;
      }else if(player.shares[i].owner===3){
        shareC+=1;
      }
    }
    console.log(shareA);
    console.log(shareB);
    console.log(shareC);
  }

  GetSharePrice(shareArray){
    return shareArray[0].price;
  }
}
exports.default = new Company();
