// --------------------------------------------------------------------------------
// Computational implementation of some aspects of
// *Poème cinématographique*, based on a scenario by Ilse Garnier
// Animation and montage: Albert Coma and Meritxell Martínez
// https://vimeo.com/183284925
// Millieon Hu, 2023
// Jérémie Wenger, 2023
// With Iris Colomb, in the context of *Machines poétiques*: exploring textual
// systems through experimental French poetry, Goldsmiths College
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// draw text along a sine wave
// ---------------------------
// (from 0'44)
// original inspiration by xinxin (Qianqian Ye?):
// - https://editor.p5js.org/xinxin/sketches/okGMvmxM
// - https://p5js.org/examples/math-sine-wave.html
// and GPT-4!
let laWave;
let laWaveBackward;
// --------------------------------------------------------------------------------

// --------------------------------------------------------------------------------
// a black circle with words in the circumference
// ----------------------------------------------
// (at 5'26 and after)
// words around a circle inspiration by:
// - Allison Parrish: https://editor.p5js.org/allison.parrish/sketches/ryoVAen0m
// - enickles: https://editor.p5js.org/enickles/sketches/WNSKWx0Ap
let leCircle;
// --------------------------------------------------------------------------------

let animationsIndex;
let subAnimationsIndex;
let routeIndex;
let routeList;
let refugeList;

let randomFlag;

//mic input
var mic;
var level;

const words=[];//store words objecy

let radius;//wordcircle radius

function setup() {
  createCanvas(800, 500);

  const str = 'refugio, refugium! refuge! refuge refug refugi refugio refúgio refut';
  const wordsStr = str.split(' ');

  textSize(24);
  // track word position
  let x = 20
  let y = 60
  fill(255)
  // iterate over each word
  for (let i = 0; i < wordsStr.length; i++) {
       const wordStr = wordsStr[i] // get current word
       const wordStrWidth = textWidth(wordStr) // get current word width
       const word = new Word(wordStr, x, y, i)
       words.push(word)
       x = x + wordStrWidth + textWidth(' ') // update x by word width + space character
      // // look ahead the next word - will it fit in the space? if not, line break
      if(i<=wordStr.length-1)
      {const nextWordStrWidth = textWidth(wordsStr[i+1])||0;
        if (x > width - nextWordStrWidth) {
          y += 40 // line height, sort of
          x = 20 // reset x position
      }
      }
      
  }


  
  //audio in
  mic = new p5.AudioIn();
	mic.start();
  level=50;
  

  randomFlag=true;
  animationsIndex = 0;
  subAnimationsIndex=0;
  routeIndex=0;
  routeList=["the route","the rote","the course (ca.1160)","the path","passageway(1170)","rupta"]
  refugeList=["refugio","refugium","refuge","refuge","refuge","refug","refugi","refugio","refúgio","refugio","refut"]
  laWave = new textWave('refugio ');

  //words.push(refugeList[0]);

  radius=150;

  laWaveBackward = new textWave('refugio ',
    amplitude = 80,
    period = 500,
    xSpacing = 30,
    speed = .3,
    mode = 'backward',
    tSize = 35,
  );
  leCircle = new wordsCircle('refuge ');
}

function draw() {
  background(0);
  level = mic.getLevel();
  console.log("level",level);
  laWave.setParam(level*400);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i] // retrieve word object
    word.update()
    //word.display();
}
  
  //console.log(level);
  // helper lines
  // push();
  // stroke(255);
  // line(width/2,0, width/2, height);
  // line(0,height/2, width, height/2);
  // pop();

  if (animationsIndex === 0) {
    laWave.draw(30, width/3);
    //ellipse(width/2,height/2,30,30);
    fill(255);
    
    push();
    textSize(40);
    fill('red');
    textStyle(ITALIC);
   text(routeList[routeIndex%5],width/2, height/2+10,200,120);
    
    pop();

    push();
    textSize(20);
    if(routeIndex==0)
    {text('refuge thrown on to',width/2, height/2-10,200,110);}
    else{text('thrown on to',width/2, height/2-10,200,110);}
    pop();
  } else if (animationsIndex === 1) {

    laWave.draw(30, width/3); 
    push();
    textSize(20);
    //adding boids;
    switch (subAnimationsIndex) {
      case 0:
        text('with no end in sight',width/2, height/2-20,200,110);
        break;
      case 1:
        text('from this here to',100, height/2-20,200,110);
        break;
      case 2:
        text('where',width/2,height/2-20,200,110);
        break;
      case 3:
        text('seeking refuge',2* width/3,height/2-20,200,110);
        //words.push(refugeList[1]);
        laWave.setText("refugium refugio ");
        break;
      default:
        //  
    }0
   
    pop();

    
  } else if (animationsIndex === 2) {
    subAnimationsIndex=0;
    laWave.draw(30, width/3); 
    push();
    textSize(20);
    
    pop();

    //laWaveBackward.draw(width-30, height -50 );
  } else if (animationsIndex === 3)
  {
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i] // retrieve word object
      word.update()
      word.display();
    //leCircle.draw(width/2, height/2, true);0

    switch (subAnimationsIndex) {
      case 0:
        push();
        textSize(40);
        fill('red');
        textStyle(ITALIC);
        text('refugium',width/2, height/2-20,200,110);
        pop();
        break;
      case 1:
        push();
        textSize(20);
        text('a place or means of',width/2, height/2-20,250,110);
        pop();
        push();
        textSize(40);
        fill('red');
        textStyle(ITALIC);
        text('shelter',width/2+20, height/2,200,110);
        pop();
        break;
      case 2:
        push();
        textSize(20);
        text('concealed chamber,protector,',width/2, height/2-20,300,110);
        text('latin rupta,via',width/2, height/2,200,110);
        pop();
        push();
        textSize(40);
        fill('red');
        textStyle(ITALIC);
        text('rupta',width/2+130, height/2,200,110);
        pop();
        break;
      case 3:
        push();
        textSize(20);
        text('broken way',width/2, height/2-20,250,110);
        pop();
        push();
        textSize(40);
        fill('red');
        textStyle(ITALIC);
        text('rumpere',width/2, height/2,200,110);
        pop();
        break;
      case 4:
        push();
        textSize(20);
        text('Anglo-Norman Middle French',width/2, height/2-20,250,110);
        pop();
        push();
        textSize(40);
        fill('red');
        textStyle(ITALIC);
        text('rufuge',width/2+70, height/2,200,110);
        pop();
        break;// Anglo-Norman Middle French

      default:
        //  
    }

  }
  }else if(animationsIndex==4)
  {
    leCircle.draw(width/2, height/2, true);
  }else if(animationsIndex==5)
  {
    laWaveBackward.draw(width, height/2, true);
  }
}


function keyPressed() {
  if (key === ' ') {
    animationsIndex = (animationsIndex + 1) % 6;
  }
  if (key ==='0')
  {
    routeIndex+=1;
    subAnimationsIndex=0;
    console.log(routeIndex);
  }
  if(key=='1')
  {
    //sub animation index
    if(animationsIndex==1)
    {subAnimationsIndex+=1;}
    else if(animationsIndex==3)
    {
      subAnimationsIndex+=1;
    }
  }
  if(key=='9')
  {
    randomFlag=!randomFlag;
    console.log(randomFlag);
    if(!randomFlag)
    {laWave.setMode('random');}
    else{
      laWave.setMode('forward');
    }

    
  }
}

function mousePressed()
{if(animationsIndex==3)
  {for (let word of words) word.spread();}
  else if(animationsIndex==4)
  {
    radius+=10;
    leCircle.setRadius(radius);
    
  }

}

class Word {
  constructor(word, x, y, idx) {
      this.word = word
      this.x = x
      this.y = y
      // target position is the same as current position at start
      this.tx = this.x
      this.ty = this.y
      // original position
      this.origx = this.x
      this.origy = this.y
      this.idx = idx
      this.fcolor = color(255)
  }

  reset() {
      this.tx = this.origx
      this.ty = this.origy
  }

  spread() {
      this.tx = random(width)
      this.ty = random(height)
  }

  update() {
      // move towards the target by 10% each time
      this.x = lerp(this.x, this.tx, 0.1)
      this.y = lerp(this.y, this.ty, 0.1)
  }

  display() {
      fill(this.fcolor)
      noStroke()
      text(this.word, this.x, this.y)
  }
}

// --------------------------------------------------------------------------------
// Text displayed along a sine wave

class textWave {

  constructor(
    sentence,
    amplitude=50,
    period = 300,
    xSpacing = 20,
    speed = .8,
    mode = 'forward',
    tSize = 24,
  ) {
    this.sentence = sentence;
    this.amplitude = amplitude;
    this.period = period;
    this.frequency = TWO_PI / period;
    this.xSpacing = xSpacing;
    this.speed = speed;
    this.mode = mode;
    this.offset = 0;
    this.textSize = tSize;
  }

 
  setParam(amp)
  {
    this.amplitude=amp;
  }
  setText(text)
  {this.sentence=text;}
  setMode(mod)
  {this.mode=mod;}
  // TODO: for efficiency's sake, it might be good to consider a mechanism
  // that prevents these loops from drawing beyond a certain width (e.g. the screen)?
  draw(x, y) {

    push();

    // // helper lines
    // noFill();
    // stroke(255);
    // line(x,y - this.amplitude, x + this.offset, y - this.amplitude);
    // line(x,y + this.amplitude, x + this.offset, y + this.amplitude);
    // ellipse(x, y, 5, 5);

    textSize(this.textSize);
    textFont('Georgia');
    textAlign(CENTER, CENTER);

    fill(255);
    noStroke();

    if (this.mode === 'backward') {

      let xPos = x + this.offset;
      let yPos = sin(this.frequency * xPos) * this.amplitude;

      let i = 0;
      const xStart = x - this.xSpacing;
      while (xPos < xStart) {
        text(this.sentence[mod(i, this.sentence.length)], xPos, y + yPos); // TODO: here we display the text character by character: one could imagine
        xPos += this.xSpacing;                                             // adding transformations, like color/brightness, pepperWithRandom, or simply
        yPos = sin(this.frequency * xPos) * this.amplitude;                // randomly remove a character every so often
        i++;
      }
      this.offset -= this.speed;


    } else if(this.mode==='forward'){

      let xPos = x + this.offset;
      let yPos = sin(this.frequency * xPos) * this.amplitude;

      let i = this.sentence.length - 1;
      const xStart = x - this.xSpacing;
      while (xPos > xStart) {
        text(this.sentence[mod(i, this.sentence.length)], x + xPos, y + yPos);  // TODO: same comment as above
        xPos -= this.xSpacing;
        yPos = sin(this.frequency * xPos) * this.amplitude;
        i--;
      }
      this.offset += this.speed;
      console.log(this.amplitude);
    } else if(this.mode==='random')
    {
      let xPos = x + this.offset;

      let yPos = 0;
      let i = this.sentence.length - 1;
      const xStart = x - this.xSpacing;
      let start=0;
      while(xPos > xStart+start) {
        
        
        text(this.sentence[mod(i, this.sentence.length)], x + xPos, y + yPos);  // TODO: same comment as above
        xPos -= this.xSpacing;
        yPos = sin(this.frequency * xPos) * this.amplitude+random(-40,40);
        
        i--;
        start+=this.sentence.length;
      }
      this.offset += this.speed;

    }

 
    pop();
  }

}


// --------------------------------------------------------------------------------
// The black circle with words, 5'26 and after

class wordsCircle {
  constructor(
    sentence,
    numWords=100,
    radius =200,
    randomTextRepeat = 3,
    randomCapsThreshold = .8,
    randomTextShuffleThreshold = .6
  ) {
    this.sentence = sentence;
    this.modifiedSentences = [];
    this.polarXs = [];
    this.polarYs = [];
    this.numWords = numWords;
    this.radius = radius;
    this.randomTextRepeat = randomTextRepeat;
    this.randomCapsThreshold = randomCapsThreshold;
    this.randomTextShuffleThreshold = randomTextShuffleThreshold;

    // calculate positions once
    let theta, polarX, polarY, isCaps;
    for (let i = 0; i < numWords; i++) {
      theta = map(i, 0, numWords, 0, TWO_PI);
      // if you want rotation, use something like this
      // theta = map(i + frameCount * 0.01, 0, numWords, 0, TWO_PI);
      polarX = radius * cos(theta);
      polarY = radius * sin(theta);

      // add random to the x (horizontal) dimension
      polarX = pepperWithRandom(polarX, 0.05);

      this.polarXs.push(polarX);
      this.polarYs.push(polarY);

      // modify the text in various ways
      // -------------------------------
      // repeat the text
      let s = sentence;
      if (this.randomTextRepeat > 1) {
        s = s.repeat(Math.ceil(Math.random() * this.randomTextRepeat)); // minimum of one
      }
      // sometimes change it to upper case
      if (Math.random() > this.randomCapsThreshold) {
        s = this.sentence.toUpperCase();
      }
      // sometimes shuffle the letters
      if (Math.random() > this.randomTextShuffleThreshold) {
       s = shuffle(this.sentence.split('')).join('');
      }
      this.modifiedSentences.push(s);

    }
    // console.log(this.polarXs, this.polarYs, this.capsSwitches);
    // console.log(this.modifiedSentences);
  }

  setRadius(rad)
  {
    this.radius=rad;
  }
  draw(x, y) {

    push();

    fill(255);
    textSize(10);
    textFont('Courier New');
    textAlign(CENTER, CENTER);

    translate(x, y);

    // first draw the words around the circle
    for (let i = 0; i < this.numWords; i++) {
      push();
      translate(this.polarXs[i], this.polarYs[i]);
      text(this.modifiedSentences[i], 0, 0);
      pop();
    }

    // then draw the circle on top
    fill(0);
    ellipseMode(RADIUS);
    ellipse(0,0, this.radius - 5);
    pop();
  }

}

// --------------------------------------------------------------------------------
// utils

function pepperWithRandom(x, wiggleFactor) {
  /*
   * pepperWithRandom(10, .2) yields numbers between 8.0 and 12.0
   * pepperWithRandom(10, .5) yields numbers between 5.0 and 15.0
  */
  const maxWiggle = x * wiggleFactor;
  const randomWiggle = (Math.random() - .5) * maxWiggle * 2; // from -maxWiggle to maxWiggle
  return x + randomWiggle;
}

// Fisher-Yates (aka Knuth) Shuffle: https://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// fix for the modulo (%) annoyance with negative numbers
// from: https://stackoverflow.com/a/17323608
function mod(n, m) {
  return ((n % m) + m) % m;
}
