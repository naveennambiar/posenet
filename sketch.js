let capture;
let posenet;
let singlePose; //in this model we are only taking one skeleton therefore singelpose
let skeleton;
let filter_img;

function setup(){    // used to setup and config // runs one time
    var cnv = createCanvas(630, 450); // 
    var x = (windowWidth - width) / 2; //postioning 
    var y = (windowHeight - height) / 2; //postioing
    cnv.position(x, y);  //to center the canvas
    background(255, 0, 200)

    capture = createCapture(VIDEO);
    capture.hide();  //to hide the actual footage , as it is being already played in canvas.

    posenet = ml5.poseNet(capture,modelLoaded); //ouickstart basic code of mlj5
    posenet.on('pose',receivedposes) //iss jitne bhi poses (sekelton postioning data ) h voh milenge or agar mil gye then it will go to rercived poses fn which will log the poses.

    filter_img=loadImage('images/shahrukh.png');
}

function receivedposes(poses){
    console.log(poses);
    if(poses.length > 0){ //that is atleast one skelton should be there.
        singlePose=poses[0].pose;  //to extract first skeleton information from the array 0 - first skelteon , 1 - 2 skeleton so on..
        skeleton = poses[0].skeleton;
    }
}

function modelLoaded() {
    console.log('model has loaded');
}

function draw(){               // used to draw , images , videos etc. // runs infitne time 

    //image and webcam
    //image(img , x, y , w , h);
    image(capture , 0 , 0);
    fill(0,255,0);
    if(singlePose){ //if statement coz for the first time keypoints wont be awavilable , when it is available then we have to enter in for loop.
        strokeWeight(1);
        for(let i =0 ; i < singlePose.keypoints.length ; i++){
            ellipse(singlePose.keypoints[i].position.x , singlePose.keypoints[i].position.y , 30)
        }
        stroke(0 , 0 , 255);
        strokeWeight(5);
        for(let j = 0 ; j < skeleton.length ; j++){
            line(skeleton[j][0].position.x , skeleton[j][0].position.y , skeleton[j][1].position.x, skeleton[j][1].position.y);
        }
    }

    //image(filter_img,singlePose.nose.x,singlePose.nose.y,10,10);

}