song1 = "";
song2 = "";
song1Status = "";
song2Status = "";
leftWristX = 0;
lefxtWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    song1 = loadSound("song1.mp3");
    song2 = loadSound("song2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function modelLoaded() {
    console.log("Model Loaded");
}

function gotPoses(results) {
    console.log(results);
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreWriRightWrist = results[0].pose.keypoints[10].score;    
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreLeftWrist>0.2){
        circle(leftWristX,leftWristY, 20);
        song1.stop();
        if(song2Status == false){
            song2.play();
            document.getElementById("song1").innerHTML = "Playing - Vaste Song"
        }
    }
}

function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}