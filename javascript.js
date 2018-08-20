$(document).ready(function () {

    var config = {
        apiKey: "AIzaSyAWzjhvlaIlAjTHT5keL9USeANBqqSsORA",
        authDomain: "trainscheduler-91abf.firebaseapp.com",
        databaseURL: "https://trainscheduler-91abf.firebaseio.com",
        projectId: "trainscheduler-91abf",
        storageBucket: "trainscheduler-91abf.appspot.com",
        messagingSenderId: "321952819994"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("#add-train").on("click", function(event) {
        event.preventDefault();

        var train = $("#train-name").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrainTime = $("#first-train-time").val().trim();
        var frequency = $("#frequency").val().trim();

        var newTrain = {
            train: train,
            destination: destination,
            firstTrainTime: firstTrainTime,
            frequency: frequency
        };

        database.ref().push(newTrain);

        console.log(newTrain.train);
        console.log(newTrain.destination);
        console.log(newTrain.firstTrainTime);
        console.log(newTrain.frequency);


        alert("Train added successfully.");

        $("#train-name").val("");
        $("#destination").val("");
        $("#first-train-time").val("");
        $("#frequency").val("");

    })

    database.ref().on("child_added", function(childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        var newTrainName = childSnapshot.val().train;
        var newTrainDest = childSnapshot.val().destination;
        var newFirstTrainTime = childSnapshot.val().firstTrainTime;
        var newTrainFreq = childSnapshot.val().frequency;

        console.log(newTrainName);
        console.log(newTrainDest);
        console.log(newFirstTrainTime);
        console.log(newTrainFreq);

        var firstTrainTimeConverted = moment(newFirstTrainTime, "HH:mm").subtract(1, "years");
        console.log(firstTrainTimeConverted)

        var currentTime = moment();
        console.log("Current Time: " + moment(currentTime).format("hh:mm"));

        var diffTime = moment().diff(moment(firstTrainTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        var tRemainder = diffTime % newTrainFreq;
        console.log(tRemainder);

        var minutesUntilTrain = newTrainFreq = tRemainder;
        console.log("min to next train: " + minutesUntilTrain);

        var nextTrain = moment().add(minutesUntilTrain, "minutes");
        console.log("next arrival: " + moment(nextTrain).format("hh:mm"));
        console.log("next arrival: " + nextTrain);

        $("#train-table > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newTrainDest + "</td><td>" + moment(nextTrain).format("hh:mm") + "</td><td>" + minutesUntilTrain + "</td></tr>");

    })

})