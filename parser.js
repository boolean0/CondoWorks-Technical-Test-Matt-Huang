const fs = require('fs');

parseFile('test-q1.txt'); //testing code for local file test-q1.txt

function parseFile(fileLocation){
    const allFileContents = fs.readFileSync(fileLocation, 'utf-8');

    //pattern searching regexes
    const billDatePat = /Bill date: /i;
    const billNumPat = /Bill number: /i;
    const billTotalPat = /Total new charges/i; 
    const dollarSign = /[$]/; 
    const custAccntNumPat = /[0-9]+ - [0-9]+/;
    const billPeriodPat = /TEST AV *([Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec].+\d\d\d\d)/; 
    
    //values to store information in 
    var custAccntNum = '';
    var billPeriod = '';
    var billDate = '';
    var billNum = '';
    var billTotal = '';
    
    //flag for when customer account number has already been found 
    var custAccntNumFound = false;  
    
    allFileContents.split(/\r?\n/).forEach(line =>  {
      if(billDatePat.test(line)){
          billDate = line.trim(); 
      }
      else if(billNumPat.test(line)){
          billNum = line.trim(); 
      }
      else if(billTotalPat.test(line)){
          billTotal = 'Total New Charges: $';
          var dollarSignIdx = line.search(dollarSign); 
    
          for(i = dollarSignIdx + 1; i < line.length; ++i){ 
              //print until we see a non-valid value of money (i.e not an integer or a), not a comma or decimal point
              //assumes the money string is properly formatted
            if(!isNaN(line[i]) || line[i] == ','  || line[i] == '.'){
                billTotal += line[i]; 
            }
            else{
                break;
            }
          }
      }
      else if(custAccntNumPat.test(line) && !custAccntNumFound){
          var accntNumObj = custAccntNumPat.exec(line);
          custAccntNum = accntNumObj[0];
          custAccntNumFound = true; 
      }
      else if(billPeriodPat.test(line)){
          var billPeriodObj = billPeriodPat.exec(line); 
          billPeriod = billPeriodObj[1]; 
      }
    
      
    
    }); 
    
    console.log('Customer Account Number:', custAccntNum);
    console.log('Bill Period: ', billPeriod);
    console.log(billNum);
    console.log(billDate);
    console.log(billTotal);
    
}

