# mas_api.js

This is a client javascript program to consume the rate info from one MAS API. It allows user to get the fixed deposit/saving deposit rate info of Banks and Financial Companies from MAS API and do comparation and the up/down trend within the specific period.

## Functionality

1. To display the financial companies rates against bank rates by months within the period provided.
2. To display the overall average of financial companies rates against bank rates within the period provided.
3. To display interest rates slope are on an upward or downward trend within the period provided.
4. Assumption


## Installation

1. To run the javascript via command line with auguments, we use Node.js to trigger the js file. Hence Node.js is required to install in location PC. You can find the details <a REF='https://nodejs.org/en/'>here</a> for Node.js related info and installation package.
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

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

TODO: Write history

## Credits

TODO: Write credits

## License

TODO: Write license
]]></content>
  <tabTrigger>readme</tabTrigger>
</snippet>
