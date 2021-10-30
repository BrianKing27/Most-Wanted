let spouse = [];
let theSpouse = [];
let sibling =[];
let siblings =[];


function searchBySiblings(person, people){
  let arrayOfSiblings = people.filter(function (potentialMatch) {
    if((potentialMatch.parents[0] == person.parents[0] || potentialMatch.parents[1] == person.parents[1]) && potentialMatch !== person && potentialMatch.parents.length > 0 && person.parents.length > 0){               
      return true;
    }   
    else {
      return false;
    }
  });
   for(let i = 0; i < arrayOfSiblings.length; i++){
    sibling +=  'Sibling of ' + person.firstName + ' ' + person.lastName + '\n';
    sibling += '-----------------------' + '\n';
    sibling += 'First name: ' + arrayOfSiblings[i].firstName + ' ' + '\n';
    sibling += 'Last name: ' + arrayOfSiblings[i].lastName + '\n';
    sibling += '\n'

    siblings = sibling;
 }
 alert(siblings);
 sibling = [];
 siblings = [];
}


function searchBySpouse(person, people){
  let spouseName = people.filter(function (potentialMatch) {
    if((potentialMatch.currentSpouse == person.id)){               
      return true;
    }   
    else {
      return false;
    }
  });
    for(let i = 0; i < spouseName.length; i++){
      spouse =  'Spouse of ' + person.firstName + ' ' + person.lastName + '\n';
      spouse += '-----------------------' + '\n';
      spouse += 'First name: ' + spouseName[i].firstName + ' ' + '\n';
      spouse += 'Last name: ' + spouseName[i].lastName + '\n';
      spouse += '\n';
      theSpouse = spouse;

    }
    alert(theSpouse);
    spouse = [];
    theSpouse = [];

}
