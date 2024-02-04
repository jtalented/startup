##This file is my notes for CS 260


##Git pushing and pulling
<<<<<<< Updated upstream
Changes need to be pulled from the origin, and then pushed to Github to the main branch. From this assignment I learned how to properly perform merges between branches and resolve conflicts. In addition I learned the formatting of texts and styling, as well as using links and images throughout the text.


# Notes on EC2 
Its using a t2.micro instance type

Double check the network settings

Public IP address currently
http://184.72.159.46

SSH Command
ssh -i C:\Users\Jayden\Downloads\production.pem ubuntu@184.72.159.46

#Changing IP address
Check subheading "Keeping the same public IP address"
at https://learn.cs260.click/page/webServers/amazonWebServicesEc2/amazonWebServicesEc2_md


# Site name and URL
260madlib

http://260madlib.click

Web Server Host name
260madlib.click

Caddy allows for secure connection using third party verfication



# HTML

Only thing rendered in headers is the title line.

Following headers is the navigation elements.

Body has the content.

Footer has the span (Author)

Has an anchor with a link to the repository.



Play.html scores and about all have the same headers and footers.



restart caddy
sudo service caddy restart


./deployFiles.sh -k C:/Users/Jayden/Downloads/production.pem -h 260madlib.click -s simon


ssh into caddy

ssh -i C:/Users/Jayden/Downloads/production.pem ubuntu@260madlib.click


