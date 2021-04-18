# [Treasurer](https://docs.google.com/spreadsheets/d/1TC2Jp-IbnCO36YYWcauVKZh0NWe6fAJlcf_IiwMmphQ)

## HOW TO USE
1.	Create a copy of this [google sheet](https://docs.google.com/spreadsheets/d/1TC2Jp-IbnCO36YYWcauVKZh0NWe6fAJlcf_IiwMmphQ) in your drive
2.	A Treasurer tab will be created in the menu
3.	Last Month / Current month / Custom month will create an expense sheet for that particular month
4.	Auto update will setup a trigger to create an expense sheet of last month on 1st of every month
5.	Please verify the expense sheet once created since the script may misbehave if formatting of these email messages changes in future
	
## WHY TO USE
1.	Get all your monthly expenses at one place with complete privacy
2.	All your online expenses from Credit/Debit Cards or Wallets or UPI apps are collected at a single place for easy budgeting
3.	Furthermore the process can be automated to be done on 1st of each month without human intervention
4.	The script is open source where you can contribute as well https://github.com/5amyak/Treasurer
5.	The script asks for minimum permissions and none of your data ever leaves the google servers
6.	Supported apps are PhonePe, PayTM, AxisBank CC, ICICIBank CC etc.
	
## HOW IT WORKS
1.	Metadata sheet is used to scrape mails from your gmail account to create the expenses sheet
2.	Please go to Tools -> Script Editor from menu to understand how the regex is getting used in GmailScrape class
3.	Add new rows in metadata sheet to extend the usage
