# Advanced



1. install files ( go to ClientApp directory and do npm install from terminal)

2. npm install @microsoft/signalr


3. go to package manager of visual studio and download missing packages.
![image](https://user-images.githubusercontent.com/71297464/170661848-71e0fa1b-d1d9-47b3-9f8c-3dcad7acc0f0.png)




4.
follow this tutorial of Initialize the SDK Section until setting the enviorment variables (including).
after updating the enviorment variables restart visual studio.
https://firebase.google.com/docs/admin/setup#windows

![image](https://user-images.githubusercontent.com/71297464/173902356-c36b16e3-5048-40ff-921d-a842377c5158.png)


if not working with console(The enviorment variable), try to add it manually .


5. add firebase admin package in nuget console








in nuget console:
1.
 update-database










Details:

1. if you want to change the ports that will be available for Signalr to connect to (local host addresses) you have to add addresses to  [lunchSettings.Json]  in application url.
2. if you want to change port that will be the address of the site (for the api through proxy) you need to change env.development port.
3. make sure env.development.local has no valid address (for now) because else the https certficate could fail.
4.  will not work properly if https certficate invalid (SignalR problems)

5. .Net Core 6 project + react. 
