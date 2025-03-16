# [Treasurer](https://docs.google.com/spreadsheets/d/1TC2Jp-IbnCO36YYWcauVKZh0NWe6fAJlcf_IiwMmphQ)

## How To Use
1.	Create a copy of this [google sheet](https://docs.google.com/spreadsheets/d/1TC2Jp-IbnCO36YYWcauVKZh0NWe6fAJlcf_IiwMmphQ) in your drive
2.	A Treasurer tab will be created in the menu
3.	Last Month / Current month / Custom month will create an expense sheet for that particular month
4.	Auto update will setup a trigger to create an expense sheet of last month on 1st of every month
5.	Please verify the expense sheet once created since the script may misbehave if formatting of these email messages changes in future

## Why To Use
1.	Get all your online expenses from UPI apps | Wallets | Credit/Debit Cards at a single place for easy budgeting
2.	Automate the process to create an expenses sheet on the 1st of every month
3.	No privacy worries since the script asks for minimum permissions and none of your data ever leaves the Google servers
4.	Fully open source project where you can contribute as well https://github.com/5amyak/Treasurer
5.	Currently, the supported apps are PhonePe, PayTM, AxisBank CC, ICICIBank CC etc.
	
## How It Works
1.	Metadata sheet is used to scrape mails from your gmail account to create the expenses sheet
2.	Please go to Tools -> Script Editor from menu to understand how the regex is getting used in GmailScrape class
3.	Add new rows in metadata sheet to extend the usage
