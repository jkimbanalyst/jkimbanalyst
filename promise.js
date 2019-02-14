let DNA = "GTACCTAGCGTATATACC" //20
const PROTEIN1 = ["Asn","Leu","Tyr","Ile",
"Gln","Trp","Leu","Lys","Asp","Gly","Gly","Pro",
"Ser","Ser","Gly","Arg","Pro","Pro","Pro","Ser"];

const myUrl = "https://mikecaines.com/api/map.json";
let slicedDNA = [];
let lookup = []; // key - value array of objects to lookup the item easily
let matched = [];
let values = "";
let abbrs = "";

fetch(myUrl)// fetch returns a promise object 
.then(response => response.json())// this is called "chaining"
.then(function(data){
    for (let i=0; i<data.length;i++) {
        //for each amino acid, iterate as many as the number of codons it has (0-6)
        for (let j=0;j<data[i].codons.length;j++){
            // get the abbr and codons and make a key:value to add it to the array 
            abbrs = data[i].abbr;
            values = data[i].codons[j];
            lookup.push({"abbr":abbrs, "codons":values});
        }
    }


//to slice the DNA in each 3 characters
function sliceDNA(DNA) {
    for (let i=0; i<DNA.length;i +=3) {
        slicedDNA.push(DNA.slice(i,i+3));
    }
    //console.log(slicedDNA);
    return slicedDNA;
}

//to find if the sliced DNA matches with anything in the lookup Array 
function findMatch(slicedDNA, lookup) {
    for (let i=0; i<slicedDNA.length;i++) {
        for (let j=0;j<lookup.length;j++) {
            if (slicedDNA[i]==lookup[j].codons) {
                //console.log(lookup[j].abbr, lookup[j].codons);
                matched.push(lookup[j].abbr);
            }
        }
    }
    //console.log(matched);
    return matched;
}


slicedDNA =sliceDNA(DNA);
matched = findMatch(slicedDNA, lookup);
console.log("The list of Amino Acids found in the DNA is " + matched);

})

