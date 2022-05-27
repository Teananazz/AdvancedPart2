# Advanced


Need to test running instruction:

1. install files ( go to AppFiles and do npm install)


2. go to package manager of visual studio and download missing packages.
 ![image](https://user-images.githubusercontent.com/71297464/170653381-52ac91a2-a728-4720-9683-7d3ddf7922c7.png)

the following two commands in nuget console:

5. add-migration init
6. update-database

7. will not work properly if https certficate invalid 






Details:

1. if you want to change the ports that will be available for Signalr to connect to (local host addresses) you have to add addresses to  [lunchSettings.Json]  in application url.
2. if you want to change port that will be the address of the site (for the api through proxy) you need to change env.development port.
3. make sure env.development.local has no valid address (for now) because else the https certficate could fail.
