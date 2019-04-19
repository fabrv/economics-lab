var pricee=0;
var shares=[];
var companyA=[];
var companyB=[];
var companyC=[];


//every share will get the same price, but different number which will help us sort them into its corresponding owner
// the shares will then be sorted based on the owner and but into each company's stack
function createShares(price1) {
    var sharess = [];
    for (var i = 0; i < 61; i++) {

        sharess[i] = {
            price: price1,
            owner: i
        };
    }
console.log(sharess);
    shares=sharess;
}


function shareSort(sharesToSort){
       for(var j=0; j<21; j++){
           companyA.push(sharesToSort[j]);
       }
        for(var k=21; k<41; k++){
            companyB.push(sharesToSort[k]);
        }
        for(var l=41; l<61; l++){
            companyC.push(sharesToSort[l]);
        }
    /*console.log(companyA);
    console.log(companyB);
    console.log(companyC);*/
    }




/*createShares(pricee);
console.log("----------FIRST FUNCTION RUN----------");
shareSort(shares);*/



