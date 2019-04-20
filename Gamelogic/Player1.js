var player1={
    AvailableMoney1: 0,
    utilities1:0,
    shares1:[]
};
var player2={
    AvailableMoney2:0,
    utilities2:0,
    shares2:[]
};
var bid=0;

function countOccupiedSpaces(array){
    var count=0;
    for(var i=0; i<array.length+1;i++)
    {
        if(array[i] != null && array[i] !=0){
            count++
        }
    }
    return count;
}
 createShares(0);
shareSort(shares);
function buyShares(bid,numberOfShares, ArraySeller, ArrayBidder ){
if(countOccupiedSpaces(ArraySeller)<bid){
    console.log('buy operation invalid, seller has less shares than the amount you want to buy');
}
}