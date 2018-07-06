/* program: mas_api.js
    Purpose: Allow user to get the fixed deposit/saving deposit rate info of Banks and Financial Companies from MAS API and do comparation and the up/down trend within the specific period.
    Command line: node mas_api.js para1 para2 para3 para4
    Parameters: para1 - DepositType (FixedDeposits, SavingsDeposits), para2 /para3  - Start/End date ( format: MMM-YYYY), para4 -  QueryCategory (Months, Average)
    Output examples:
	- node mas_api.js FixedDeposits JAN-2018 JUN-2018 Months
		end_of_month|banks_fixed_deposits_3m|banks_fixed_deposits_6m|banks_fixed_deposits_12m|fc_fixed_deposits_3m|fc_fixed_deposits_6m|fc_fixed_deposits_12m
		2018-01|	1.30|1.40|1.50|1.40|1.50|1.60|
		.......
		2018-06|	1.32|1.41|1.50|1.43|1.56|1.58|
		Trend|up|up|-|up|up|down|

	- node mas_api.js SavingsDeposits JAN-2018 JUN-2018 Average
		From 2018-01 To 2018-06|banks_savings_deposits|fc_savings_deposits
		Average|1.31|1.41|

    Notes: 
	- Rate in output is in percentage (%)
	- Data is from MAS API: https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=5f2b18a8-0883-4769-a635-879c63d3caac
*/
var StartDate; // format --> MMM-YYYY
var EndDate; // format --> MMM-YYYY
var DepositType; // option value: FixedDeposits, SavingsDeposits
var QueryCategory; // option value: Months, Average
var validMon = 'JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC';
var ValidationOK = 1;
var ErrMessage = '';
var URL = 'https://eservices.mas.gov.sg/api/action/datastore/search.json?resource_id=5f2b18a8-0883-4769-a635-879c63d3caac';
var cond ='';
var StartDate1;
var EndDate1;

// this is to validate the year in start and end date
function yearValidation(year) {
    var text = /^[0-9]+$/;
    if (year != 0) {
        if ((year != "") && (!text.test(year))) {

            ErrMessage = 'Please Enter Numeric Values of Year Only';
            return false;
        }

        if (year.length != 4) {
            ErrMessage = 'Year is not proper. Please check';
            return false;
        }
        var current_year=new Date().getFullYear();
        if((year < 1980) || (year > current_year))
            {
            ErrMessage = 'Year should be in range 1980 to current year';
            return false;
            }
        return true;
    }

//to check if the value is a number, if not a number, return 0, if yes, return n
function toNumeric(n) {
    if (!isNaN(parseFloat(n)) && isFinite(n)) {
	return n;
    }
    else
    {	return 0;
    }
}
// to add prefix "0" base on the size
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

//To convert date format from MMM-YYYY to YYYY-MM
function dateconversion(vdate) {
	var y = vdate.substr(5,8);
	var m = vdate.substr(1,3);
	var mSTR =  'JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC';
	var mNumber = mSTR.indexOf(m) / 3 + 1;
	
	return y + '-' + pad(nNumber,2);
}

//get arguments from input
var args = process.argv;
//alert(args.length);

//validation check on the parameters

if (args.length != 6) {
	ErrMessage = 'Please pass in correct number of parameters before run the program!\nThe Syntax of the command is: node mas_api.js p1 p2 p3 p4\np1 option value: FixedDeposits, SavingsDeposits\np2 and p3 date format: MMM-YYYY\np4 option value: Months, Average';
	ValidationOK = 0; 
}

if (args[3] != 'FixedDeposits' && args[3] != 'SavingsDeposits') {
	ErrMessage = 'Please pass in correct parameters before run the program!\nThe Syntax of the command is: node mas_api.js p1 p2 p3 p4\np1 option value: FixedDeposits, SavingsDeposits\np2 and p3 date format: MMM-YYYY\np4 option value: Months, Average';
	 ValidationOK = 0;
}
	
StartDate = args[4].trim().toUpperCase();
EndDate = args[5].trim().toUpperCase();

if (StartDate.lenth != 8 || EndDate.length !=8 || StartDate.substr(4,1) !='-' || EndDate.substr(4,1) !='-' )  {
	ErrMessage = 'Please input the Start/End date with the correct format <MMM-YYYY> ';
	ValidationOK = 0;
}

if (validMon.indexOf(StartDate.substr(1,3)) / 3 + 1 == -1 || validMon.indexOf(EndDate.substr(1,3)) / 3 + 1 == -1) {
	ErrMessage = 'Month is invalid! Please input the Start/End date with the correct format <MMM-YYYY> ';
	ValidationOK = 0;
}

if (StartDate.substr(5,4)*100 + validMon.indexOf(StartDate.substr(1,3)) / 3 + 1 >EndDate.substr(5,4)*100 + validMon.indexOf(EndDate.substr(1,3)) / 3 + 1 ) {
	ErrMessage = 'To Date cannot be earlier than Start Date! ';
	ValidationOK = 0;
}

if (yearValidation(StartDate.substr(5,4))  == false) { 
	ValidationOK = 0;
}
if (yearValidation(EndDate.substr(5,4))  == false) { 
	ValidationOK = 0;
}

if (args[6].toUpperCase() != 'MONTHS' && args[6].toUpperCase() != 'AVERAGE') {
	ErrMessage = 'Please pass in correct parameters before run the program! \nThe Syntax of the command is: node mas_api.js p1 p2 p3 p4\np1 option value: FixedDeposits, SavingsDeposits\np2 and p3 date format: MMM-YYYY\np4 option value: Months, Average';
	ValidationOK = 0;
}

if (ValidationOK != 0) {

    StartDate1 = StartDate.substr(5,8) + '-'+parseInt(alidMon.indexOf(StartDate.substr(1,3)) / 3 + 1);
    EndDate1 = EndDate.substr(5,8) + '-'+parseInt(alidMon.indexOf(EndDate.substr(1,3)) / 3 + 1);
//extract fields base on the deposit type
    if (DepositType == 'FixedDeposits') {
	cond = '&fields=end_of_month,banks_fixed_deposits_3m,banks_fixed_deposits_6m,banks_fixed_deposits_12m,fc_fixed_deposits_3m,fc_fixed_deposits_6m,fc_fixed_deposits_12m';
}
else
{	cond = '&fields=end_of_month,banks_savings_deposits,fc_savings_deposits';
}
//add the period
    cond = cond + '&between[end_of_month]='+ StartDate1 + ','+ EndDate1;

    request.open('GET', URL + cond, true);
    // this following line is needed to tell the server this is a ajax request
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
 	var json = JSON.parse(this.response);
	var myArray = new Array(json.json.result.total); // this is to store the data into array for processing purpose
	var i = 0;
	
	if (DepositType == 'FixedDeposits') {
	    for (var key in json) {
		i++;
    		if (json.hasOwnProperty(key)) {
        		var item = json[key];
		var myArray[i] = new Array(7);
            		myArray[i].[1] = item.end_of_month;
            		myArray[i].[2] = toNumeric(item.banks_fixed_deposits_3m);
            		myArray[i].[3] = toNumeric(item.banks_fixed_deposits_6m);
            		myArray[i].[4] = toNumeric(item.banks_fixed_deposits_12m);
            		myArray[i].[5] = toNumeric(item.fc_fixed_deposits_3m);
            		myArray[i].[6] = toNumeric(item.fc_fixed_deposits_6m);
            		myArray[i].[7] = toNumeric(item.fc_fixed_deposits_12m);
        		}   
	                  }
	    }
	    // populate data
	    var TrendBK3M = '-';
	    var TrendBK6M = '-';
	    var TrendBK12M = '-';
	    var TrendFC3M = '-';
	    var TrendFC6M = '-';
	    var TrendFC12M = '-';
	    if (QueryCategory.toUpperCase() == 'MONTHS') {
	      console.log('end_of_month|banks_fixed_deposits_3m|banks_fixed_deposits_6m|banks_fixed_deposits_12m|fc_fixed_deposits_3m|fc_fixed_deposits_6m|fc_fixed_deposits_12m');
	      for (j=1;j<=i;j++){
  		console.log(myArray[j][1] + '|'+myArray[j][2]+ '|'+myArray[j][3]+ '|'+myArray[j][4]+ '|'+myArray[j][5]+ '|'+myArray[j][6]+ '|'+myArray[j][7]);
	      }
	    // check the trend of bank deposit and fc deposit
	    if (myArray[1][2] >  myArray[i][2]) { TrendBK3M = 'Down'; } 
	    else { 
		if (myArray[1][2] <  myArray[i][2]) { TrendBK3M = 'Up'; } 
		}

	    if (myArray[1][3] >  myArray[i][3]) { TrendBK6M = 'Down'; } 
	    else { 
		if (myArray[1][3] <  myArray[i][3]) { TrendBK6M = 'Up'; } 
		}
	    if (myArray[1][4] >  myArray[i][4]) { TrendBK12M = 'Down'; } 
	    else { 
		if (myArray[1][4] <  myArray[i][4]) { TrendBK12M = 'Up'; } 
		}
	    if (myArray[1][5] >  myArray[i][5]) { TrendFC3M = 'Down'; } 
	    else { 
		if (myArray[1][5] <  myArray[i][5]) { TrendFC3M = 'Up'; } 
		}
	    if (myArray[1][6] >  myArray[i][6]) { TrendFC6M = 'Down'; } 
	    else { 
		if (myArray[1][6] <  myArray[i][6]) { TrendFC6M = 'Up'; } 
		}
	    if (myArray[1][7] >  myArray[i][7]) { TrendFC12M = 'Down'; } 
	    else { 
		if (myArray[1][7] <  myArray[i][7]) { TrendFC12M = 'Up'; } 
		}
  	    console.log('Trend '+ '|' + TrendBK3M+ '|'+TrendBK6M+ '|'+TrendBK12M+ '|'+TrendFC3M+ '|'+TrendFC6M+ '|'+TrendFC12M);
	 }
	else // QueryCategory is Average
	{
	      var AveBK3M = 0;
	      var AveBK6M = 0;
	      var AveBK12M = 0;
	      var AveFC3M = 0;
	      var AveFC6M = 0;
	      var AveFC12M = 0;
	      var SumBK3M = 0;
	      var SumBK6M = 0;
	      var SumBK12M = 0;
	      var SumFC3M = 0;
	      var SumFC6M = 0;
	      var SumFC12M = 0;
	      console.log('From '+ myArray[1].[1] + ' to '+ myArray[i].[1]+'|banks_fixed_deposits_3m|banks_fixed_deposits_6m|banks_fixed_deposits_12m|fc_fixed_deposits_3m|fc_fixed_deposits_6m|fc_fixed_deposits_12m');
	      for (j=1;j<=i;j++){
  		SumBK3M = SumBK3M + myArray[i].[2];
  		SumBK6M = SumBK6M + myArray[i].[3];
  		SumBK12M = SumBK12M + myArray[i].[4];
  		SumFC3M = SumFC3M + myArray[i].[5];
  		SumFC6M = SumFC6M + myArray[i].[6];
  		SumFC12M = SumFC12M + myArray[i].[7];
	      }
	      AveBK3M = (SumBK3M/i).toFixed(2);
	      AveBK6M = (SumBK6M/i).toFixed(2);
	      AveBK12M = (SumBK12M/i).toFixed(2);
	      AveFC3M = (SumFC3M/i).toFixed(2);
	      AveFC6M = (SumFC6M/i).toFixed(2);
	      AveFC12M = (SumFC12M/i).toFixed(2);

	      console.log('Average|' + AveBK3M+ '|' + AveBK6M + '|' + AveBK12M + '|' + AveFC3M+'|'+AveFC6M+'|'+ AveFC12M+'|');
	}
    	}
	else
	{	// DepositType is 'SavingsDeposits'
	    for (var key in json) {
    		if (json.hasOwnProperty(key)) {
        		var item = json[key];
		var myArray[i] = new Array(3);
              		myArray[i].[1] = item.end_of_month;
            		myArray[i].[2] = toNumeric(item.banks_savings_deposits) ;
            		myArray[i].[3] = toNumeric(item.fc_savings_deposits);
        		}   
	    	}        
    	    }
	
	    // populate data
	    var TrendBK = '-';
	    var TrendFC = '-';
	    if (QueryCategory.toUpperCase() == 'MONTHS') {
	      console.log('end_of_month|banks_savings_deposits|fc_savings_deposits');
	      for (j=1;j<=i;j++){
  		console.log(myArray[j][1] + '|'+myArray[j][2]+ '|'+myArray[j][3]+ '|');
	    }
	    // check the trend of bank savings and fc savings
	    if (myArray[1][2] >  myArray[i][2]) { TrendBK = 'Down'; } 
	    else { 
		if (myArray[1][2] <  myArray[i][2]) { TrendBK = 'Up'; } 
		}
	    if (myArray[1][3] >  myArray[i][3]) { TrendFC = 'Down'; } 
	    else { 
		if (myArray[1][3] <  myArray[i][3]) { TrendFC = 'Up'; } 
		}
  	    console.log('Trend '+ '|' + TrendBK+ '|'+TrendFC+ '|');

	}
	else // QueryCategory is Average
	{
	      var AveBK = 0;
	      var AveFC = 0;
	      var SumBK = 0;
	      var SumFC = 0;
	      console.log('From '+ myArray[1].[1] + ' to '+ myArray[i].[1]+'|banks_savings_deposits|fc_savings_deposits|');
	      for (j=1;j<=i;j++){
  		SumBK = SumBK + myArray[i].[2];
   		SumFC = SumFC+ myArray[i].[3];
	      }
	      AveBK = (SumBK/i).toFixed(2);
	      AveFC = (SumFC/i).toFixed(2);
	      console.log('Average|' + AveBK+ '|' + AveFC+'|');
	}
	}
        }
    }
    else
    {	console.log('API - unexpected error!');
    }
}
else
{	console.log(ErrMessage);
}

request.send();
