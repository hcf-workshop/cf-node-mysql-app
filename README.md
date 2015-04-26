# MySQL Node

This is a simple Node.js app that uses MySQL. 

New users should check out the resources available at [HP Helion Docs](http://docs.hpcloud.com/helion/devplatform/workbook/database/node/). 
The site includes more detail and has instructions on how to create an HP
Helion Development Platform Application Lifecycle Services Cluster.

## Prerequisites
- If you do not have an HP Helion Development Platform Application Lifecycle 
  Services Cluster available, please create one before continuing. You will also
  need to install the Helion CLI, which can be installed from the cluster's
  Management Console. Please refer to [HP Helion Docs](http://docs.hpcloud.com/helion/devplatform/workbook/database/node/)
  for further details.  
- Make sure that the MySQL service is enabled. It is not enabled by default.    
  You can take the following steps to enable it:
    - Go to the Management Console (e.g. https://api.example.com)
    - Admin --> Cluster --> Settings (gear icon on right corner) --> Check off 
      MySQL --> Save

## Deploy the Application

Execute the following commands:

- Open the terminal
- If you are not already there, *cd* to the root directory of the sample. The 
  root directory contains the manifest.yml file which helps automate deployment. 
- If you have not logged in to your target environment yet, execute the following:

    `helion target https://api.example.com`
    
    `helion login`
    
    Enter your Management Console credentials
    
    `helion push`

    Hit enter to accept any default values that you may be prompted for. 
    Note: By default, ALS clusters are configured with two domains (private and
    public). In some situations, the Helion CLI may prompt you to select a target
    domain. If prompted, select the public domain from the given list (e.g. https://api.example.com)
    
## View and run the app
- Go to the Management Console (e.g. https://api.example.com)
- Check the applications link to see a list of your apps.
- Click on the app you just deployed.
- Click "View App" to see your app in action.

The result when visiting the application page and clicking 'View App' should be
a page showing some text after your app has connected to MySQL and executed a 
query.
