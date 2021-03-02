if (!SAAgent.channelIds[0]) {
                createHTML("Something goes wrong...NO CHANNEL ID!");
                return;
            }

            function sendHrData(heartRate){
                 // return Data to Android
                 SASocket.sendData(SAAgent.channelIds[0], 'HR: '+heartRate);
                 createHTML("Send massage:<br />" +
                             newData);

             tizen.humanactivitymonitor.stop('HRM');

            }

            var heartRateData=0;

            function onsuccessCB(hrmInfo) {

                console.log('Heart rate: ' + hrmInfo.heartRate);
                heartRateData = hrmInfo.heartRate;
                // holding 15 seconds as HRM sensor needs some time 
                setTimeout(function(){
                    sendHrData(heartRateData);
                    }, 15000);

            }

            function onerrorCB(error) {
                tizen.humanactivitymonitor.stop('HRM');
                console.log('Error occurred: ' + error.message);
            }



            function onchangedCB(hrmInfo) {
                //alert("onChanged...");
                tizen.humanactivitymonitor.getHumanActivityData('HRM', onsuccessCB, onerrorCB);

            }

            tizen.humanactivitymonitor.start('HRM', onchangedCB);