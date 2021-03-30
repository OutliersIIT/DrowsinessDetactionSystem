var heart =0;
var startHeart=0;
var bgcolor=document.body.style.backgroundColor = "green";

(function () {
	
	function onChangeHR(hrmInfo) {
		startHeart= hrmInfo.heartRate;
		console.log(startHeart);
		tizen.humanactivitymonitor.stop();
	}
	
	tizen.humanactivitymonitor.start('HRM', onChangeHR);
	
	window.addEventListener("tizenhwkey", function (ev) {
		if (ev.keyName === "back") {
		
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

function hrm() {
	console.log("test"); 
	
	function onChangeHR(hrmInfo) {
		heart.innerHTML = hrmInfo.heartRate;
		heart = document.getElementById('heart');
	}
	
	tizen.humanactivitymonitor.start('HRM', onChangeHR);
}