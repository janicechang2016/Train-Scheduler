// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDCQs3foBWby3JFvZ9rOy0igpefpN7O2tI",
    authDomain: "train-scheduler-d47a4.firebaseapp.com",
    databaseURL: "https://train-scheduler-d47a4.firebaseio.com",
    projectId: "train-scheduler-d47a4",
    storageBucket: "",
    messagingSenderId: "883415923061"
  };
  firebase.initializeApp(config);


var dataRef = firebase.database();
var currentTime = moment();

dataRef.ref().on("child_added", function(childSnap) {

	var name = childSnap.val().name;
	var destination = childSnap.val().firstTrain;
	var frequency = childSnap.val().frequency;
	var min = childSnap.val().min;
	var next = childSnap.val().next;

	$("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");

});

dataRef.ref().on("value", function(snapshot) {

});


$("#add-train-button").on("click", function() {

	var trainName = $("#train-name-input").val().trim();
	var destiantion = $("#destination-input").val().trim();
	var firstTrain = $("#first-input").val().trim();
	var frequency = $("#frequency-input").val().trim();


	var firstTrainAlter = moment(firstTrain, "hh:mm").subtract("1, years");

	var timeDifference = currentTime.diff(moment(firstTrainAlter), "minutes");

	var timeLeftOver = difference % frequency;

	var minutesUntilNextTrain = frequency - timeLeftOver;

	var nextTrain = moment().add(minutesUntilNextTrain, "minutes").format("hh:mm a");


	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency,
		min: minutesUntilNextTrain,
		next: nextTrain
	}

	console.log(newTrain);
	dataRef.ref().push(newTrain);

	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-input").val("");
	$("#frequency-input").val("");

	return false;
});