# Advanced

1. Use visual studio 2022

1. clone and open in visual studio 2022 ( and have git of course added to visual studio)
2. switch to android branch
![image](https://user-images.githubusercontent.com/71297464/174668228-6ab011de-31c9-4b41-8f40-eac81e7c7f20.png)

3.
follow this tutorial of Initialize the SDK Section until setting the enviorment variables (including).
after updating the enviorment variables restart visual studio.
https://firebase.google.com/docs/admin/setup#windows

![image](https://user-images.githubusercontent.com/71297464/173902356-c36b16e3-5048-40ff-921d-a842377c5158.png)


if not working with console(The enviorment variable), try to add it manually  in "Edit the enviorment variables" in windows. should work with user variables (system variable not required from what we observed)


4. add firebase admin package in nuget console


5. click the play button with the word advanced on it , and all dependecies should install.








in nuget console:
1.
 update-database










Details:

1. if you want to change the ports that will be available for Signalr to connect to (local host addresses) you have to add addresses to  [lunchSettings.Json]  in application url.
2. if you want to change port that will be the address of the site (for the api through proxy) you need to change env.development port.
3. make sure env.development.local has no valid address (for now) because else the https certficate could fail.
4.  will not work properly if https certficate invalid (SignalR problems)

5. .Net Core 6 project + react. 
