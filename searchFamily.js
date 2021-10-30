let sibling = [];
let siblings =[];
let broAndSis =[];
function searchBySiblings(person, people){
  let arrayOfSiblings = people.filter(function (potentialMatch) {
    if((potentialMatch.parents[0] == person.parents[0] || potentialMatch.parents[1] == person.parents[1]) && potentialMatch !== person && potentialMatch.parents.length >= 0){               
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
      siblings = arrayOfSiblings[i];
      broAndSis = sibling;
    }
  alert(broAndSis);
}

let sibling = [];
let siblings =[];
let broAndSis =[];
function searchBySiblings(person, people){
  let arrayOfSiblings = people.filter(function (potentialMatch) {
    if((potentialMatch.parents[0] == person.parents[0] || potentialMatch.parents[1] == person.parents[1]) && potentialMatch !== person && potentialMatch.parents.length >= 0){               
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
      siblings = arrayOfSiblings[i];
      broAndSis = sibling;
    }
  alert(broAndSis);
}




function searchGrandchildren(){
  switch(grandChildren) {
    case 'yes' :
      searchByParents(descendants, data)
      break;
    case 'Yes' :
      searchByParents(descendants, data)
      break;
    case 'end' || 'End' || 'stop' || 'Stop' || 'no' || 'No' :
      return  
    case 'reset' || 'restart' || 'Reset' || 'Restart' :
      child =[];
      children = [];
      descendants = [];
      grandChildren = [];
      app(people);
      break;
  }
}
child =[];
children = [];
descendants = [];
grandChildren = [];
}
