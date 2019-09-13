/*
Based on ml5 Example: Webcam Image Classification using MobileNet and p5.js.

Peiling Jiang 2019

Thanks to Daniel Shiffman.
*/

/*
Labels:
Escaped          - 0 Label starts from 0!
Left and Close   - 5
Left and Open    - 6
Center and Close - 3
Center and Open  - 4
Right and Close  - 1
Right and Open   - 2 Video flipped with no reason!
*/

let classifier;
let video;
let resultsP;
let label = '';
let imageModel = 'https://storage.googleapis.com/tm-mobilenet/applejpl2/model.json';
// let imageModel = 'model.json';

let weight = 160;
let mouthOpen = false;
let position = 0; // Left - 1, Center - 2, Right - 3, Not in - 0
let timeLeft = 100;

let labelIdentifier = true;

let labelBgColor; let c;

function preload() {
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
  classifier = ml5.imageClassifier(imageModel); 
  loadimg();
}

function setup() {
  var cnv = createCanvas(640, 480);
  cnv.style('display', 'block');
  background(255);
  // resultsP = createP('Waiting...');
  classifyVideo();

  labelBgColor = color(255, 255, 255);

}

function draw() {

  push();
  // Move image by the width of image to the left
  translate(video.width, 0);
  // Then scale it by -1 in the x-axis
  // to flip the image
  scale(-1, 1);
  image(video, 0, 0);
  pop();

  // Run the game 1 second by 1 second
  timestep();

}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(error, results) {
  console.log(results[0]);
  // The results are in an array ordered by confidence.
  // resultsP.html(results[0].label);
  label = results[0].label;
  classifyVideo();
}

function drawIdentifier() {
  if (labelIdentifier === true) {
    push();
    noStroke();
    labelBgColor.setAlpha(128);
    fill(labelBgColor);
    rect(16, height - 26, 40, 20, 10);
    pop();

    // Change identifier location
    if (position !== 0) {
      push();
      noStroke();
      fill(color(labelColor()));
      if (position == 1) {
        // Left
        ellipse(26, height - 16, 18, 18);
      } else if (position == 2) {
        // Center
        ellipse(36, height - 16, 18, 18);
      } else if (position == 3) {
        // Right
        ellipse(46, height - 16, 18, 18);
      }
      pop();
    } 
  } else {

  }
}

function labelColor() {
  if (mouthOpen) {
    return '#fb0091';
  } else if (!mouthOpen) {
    return '#537d91';
  }
}
