var StartHR;
//getting Heart Rate when start app
function onSuccess() {

    function onchangedCB(hrmInfo) {
        console.log('heart rate:' + hrmInfo.heartRate);
        StartHR = hrmInfo.heartRate
        tizen.humanactivitymonitor.stop('HRM');
        var date_key = new Date();
        localStorage.setItem(date_key,StartHR);
    }
    tizen.humanactivitymonitor.start('HRM', onchangedCB);
}

function onError(e) {
    console.log("error " + JSON.stringify(e));
}
tizen.ppm.requestPermission("http://tizen.org/privilege/healthinfo",onSuccess, onError);

//watch physical button handling
(function () {
	
	window.addEventListener("tizenhwkey", function (EV) {
		if (EV.keyName === "back") {
		
		var activePopup = null,
			page = null,
			pageId = "";
			activePopup = document.querySelector(".ui-popup-active");
			page = document.getElementsByClassName("ui-page-active")[0];
			pageId = page ? page.id : "";

			if (pageId === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
}());

//send data to host device 
var HeartRate;

var SAAgent, SASocket, connectionListener,
responseTxt = document.getElementById("responseTxt");

/* Make Provider application running in background */
tizen.application.getCurrentApplication().hide();

function createHTML(log_string)
{
var content = document.getElementById("toast-content");
content.innerHTML = log_string;
tau.openPopup("#toast");
}

//request connection between consumer and provider
connectionListener = {
onrequest: function (peerAgent) {

    createHTML("peerAgent: peerAgent.appName<br />");

    if (peerAgent.appName === "Bon Voyage") {
        SAAgent.acceptServiceConnectionRequest(peerAgent);
        createHTML("Service connection request accepted.");

    } else {
        SAAgent.rejectServiceConnectionRequest(peerAgent);
        createHTML("Service connection request rejected.");

    }
},

//Connection is established
onconnect: function (socket) {
    var onConnectionLost,
        dataOnReceive;

    createHTML("Service connection established");

    /* Obtaining socket */
    SASocket = socket;

    onConnectionLost = function onConnectionLost (reason) {
        createHTML("Service Connection disconnected <br />" + reason);
    };

    //connection lost warning
    SASocket.setSocketStatusListener(onConnectionLost);

    dataOnReceive =  function dataOnReceive (channelId, data) {
        //var newData;

        if (!SAAgent.channelIds[0]) {
            createHTML("Something goes wrong...couldn't find channel id!");
            return;
        }
        
        function onsuccessCB(hrmInfo) {
        	HeartRate=0;
        	HeartRate = hrmInfo.heartRate
            console.log("Heart Rate : " + hrmInfo.heartRate);
        }

        function onerrorCB(error) {
            console.log("Error occurs. name:"+error.name + ", message: "+error.message);
        }

        function onchangedCB(hrmdata) {
            tizen.humanactivitymonitor.getHumanActivityData("HRM", onsuccessCB, onerrorCB);
        } 
        
        tizen.humanactivitymonitor.start("HRM", onchangedCB);
        

        SASocket.sendData(SAAgent.channelIds[0], stepCount);
        createHTML("Send massage:<br />" +
                    newData);
    };

    //set incoming data
    SASocket.setDataReceiveListener(dataOnReceive);
},
onerror: function (errorCode) {
    createHTML("Service connection error<br />errorCode: " + errorCode);
}
};



function requestOnSuccess (agents) {
var i = 0;

for (i; i < agents.length; i += 1) {
    if (agents[i].role === "PROVIDER") {
        createHTML("Service Provider found!<br />" +"Name: " +  agents[i].name);
        SAAgent = agents[i];
        break;
    }
}

SAAgent.setServiceConnectionListener(connectionListener);
};

function requestOnError (e) {
createHTML("requestSAAgent Error" +
            "Error name : " + e.name + "<br />" +"Error message : " + e.message);
};

webapis.sa.requestSAAgent(requestOnSuccess, requestOnError);


function hrm() {
	console.log("Real time heart rate checking"); 
	var heart = 0;
	function onChangeHR(hrmInfo) {
		heart.innerHTML = hrmInfo.heartRate;
		heart = document.getElementById('heart');
	}
	
	tizen.humanactivitymonitor.start('HRM', onChangeHR);
}

function HRM(){
	console.log("Background herat rate testing");
	var current =0;
	function onChangeHR(hrmInfo) {
		current = hrmInfo.heartRate;
		console.log(current)
		if (current < StartHR *85/100) {
		      document.getElementById("home").style.backgroundColor = '#FF0000';
		    } else if (current>=StartHR *85/100){
		    		document.getElementById("home").style.backgroundColor = '#008000';
		    }
	}
	
	tizen.humanactivitymonitor.start('HRM', onChangeHR);
}

//handmotion section
function onchangedCB(resultSet) 
{
   var index = 0;
   for (index=0; index < resultSet.gpsInfo.length; index++)
   {
      if(resultSet.gpsInfo[index].Speed>10){
    	  function onchangedCB()
    	  {
    	     console.log("hand-moved");
    	  }
    	  webapis.motion.start("WRIST_UP", onchangedCB);
      } else{
    	  webapis.motion.stop("GPS");
      }
   }
}
webapis.motion.start("GPS", onchangedCB);

//warning vibration
function warning() {
	var warninglevel;
	if (heartrate<warninglevel){
		navigatorvibrate([1000,1000,2000,2000]);
		
	}
}
