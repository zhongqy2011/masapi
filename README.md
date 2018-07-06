# mas_api.js

This is a client javascript program to consume the rate info from one MAS API. It allows user to get the fixed deposit/saving deposit rate info of Banks and Financial Companies from MAS API and do comparation and the up/down trend within the specific period. 

## Functionality

1. To display the financial companies rates against bank rates by months within the period provided.
2. To display the overall average of financial companies rates against bank rates within the period provided.
3. To display interest rates slope are on an upward or downward trend within the period provided.
4. Assumptions:
  - NULL value returned from the source will be treated as zero.
  - There is no structure or interface change/downtime with the MAS API since this release. 
  - The trend generated is based on the start and end date. This can be enhenced to track month by month.

## Installation

1. To run the javascript via command line with auguments, we use Node.js to trigger the js file. Hence Node.js is required to install in location PC. You can find the details [here](https://nodejs.org/en/) for Node.js related info and installation package.
2. Copy mas_api.js file to your location PC.

## Usage

Command:  node mas_api.js para1 para2 para3 para4

- para1 - Deposit Type (FixedDeposits, SavingsDeposits)
- para2 /para3  - Start/End date ( format: MMM-YYYY) 
- para4 -  Query Category (Months, Average)

Sample:

- Input: node mas_api.js FixedDeposits JAN-2018 JUN-2018 Months
- Output:    end_of_month|banks_fixed_deposits_3m|banks_fixed_deposits_6m|banks_fixed_deposits_12m|fc_fixed_deposits_3m|fc_fixed_deposits_6m|fc_fixed_deposits_12m

		2018-01|1.30|1.40|1.50|1.40|1.50|1.60|
		.......
		2018-06|1.32|1.41|1.50|1.43|1.56|1.58|
		Trend|up|up|-|up|up|down|

(Note: Figures are in percentage %)

## Design Issues

1. As the requirement assumes the program to be run via command line with parameters, we choose to use javascript and trigger by Node.js. There is no GUI provided by the program.
2. Below are some common functions developed which can be reused in future.
  - function yearValidation(year) - this is to validate the year input is in format "9999" and with range 1980 to current year.
  - function dateconversion(vdate) - this is to convert date format from MMM-YYYY to YYYY-MM.
  - function pad(num, size) - this is to add prefix "0" to a number base on the size.
3. Due to development environment/time constraint, there could be bug(s) within the source code. Appreciate your kind feedback on the issue found and possible solutions. 

## Testing

Unit test cases has been created and can be found in the file lists.

## Additional Notes

  - Figures from MAS API refer to average rates compiled from that quoted by 10 leading banks and finance companies.
  - Figures provided by MAS API is since 1983 onwards.
  - MAS API used for rate extraction in this program is [nterest Rates of Banks and Finance Companies, Monthly](https://secure.mas.gov.sg/api/APIDescPage.aspx?resource_id=5f2b18a8-0883-4769-a635-879c63d3caac)
