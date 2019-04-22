
    var pricee=0;
    var shares=[];
    var companyA=[];
    var companyB=[];
    var companyC=[];
    var player1={
        AvailableMoney: 10000,
        utilities:0,
        shares:[]
    };
    var player2={
        AvailableMoney:10000,
        utilities:0,
        shares:[]
    };
    var bid=10;


    //every share will get the same price, but different number which will help us sort them into its corresponding owner
    // the shares will then be sorted based on the owner and but into each company's stack
   function createShares(price1){
        var sharess = [];
        for (var i = 0; i < 20; i++) {

            sharess[i] = {
                price: price1,
                owner: 1,
                identifier: i
            };
        }
       for (var j = 20; j < 40; j++) {
           sharess[j] = {
               price: price1,
               owner: 2,
               identifier: j,

           };
       } for (var k = 40; k < 60; k++) {

           sharess[k] = {
               price: price1,
               owner: 3,
               identifier: k
           };
       }

        shares=sharess;
    }


//organiza las acciones, no se por que pero quedan 20 espacios vacios, total este es el mvp
    function shareSort(sharesToSort){
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
    function countOccupiedSpaces(array){
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
    function EnoughMoney(player, bid, companyArray){
       var totalPrice = bid*companyArray[0].price;
        var enoughmoney=false;
        if(player.AvailableMoney>totalPrice){
            enoughmoney=true;
        }
        return enoughmoney;
    }



    //returns true if the share array is empty
    function isEmpty(array){
       var isempty=false;
       if(array.isEmpty()){
           isempty=true;
       }
       return isempty;
    }


    function RaisePrices(player1,player2, company, shareIdentifier){
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

    function buy(bid, player, company) {
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

    function getShareOwner(shareArray){
        var owner=0;
        owner=ShareArray[0].owner
    }

    function sell1(offer, player, companyA) {
        if(countOccupiedSpaces(player.shares)<offer){
            console.log("you don't have any shares available");
        }else if(countOccupiedSpaces(player.shares) > offer){
            var money=0;
            var parallel=[];
            //V+E
            do{
                for(var j=0; j<player.shares.length; j++){
                    if(player.shares[j].owner===1){

                        money+=player.shares[j].price;
                        parallel.push(player.shares[j]);
                        player.shares[j]=0;
                        companyA.push(parallel.pop());
                        --offer;
                    }

                }
            }while(offer!==0);

            var filtered = player.shares.filter(function (el) {
                return el !== 0;
            });
            player.shares=filtered;

        }
        
    }

    createShares(1);
    shareSort(shares);
    buy(10, player2,companyA);
    buy(3,player2,companyB);
    console.log(player2);
    sell1(3,player2,companyA);


