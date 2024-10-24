
function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
}

let flashingHeartInterval; 
let flashingRectInterval;
let flashingStarInterval;

let rectWidth = 200;
let rectHeight = 300;
let circDiameter = 250;

let shape = ['rectangle', 'heart', 'star'];
let currentShape = 0;
let lastItem = shape.length;

let lensOn = false;
let currentPage = "index.html";

$(document).keydown(function(event) {
    if (event.keyCode === 39) {
        if (!$('.instructions').is(':visible')) {
            lensOn = !lensOn;

        if (!lensOn) {
            $('.heart-hide-content').show(); 
            $('.heart-stay-content').show();
            $('.rect-show-content').show();
            $('.rect-hide-content').show();
            $('.star-show-content').show();
            $('.star-hide-content').show(); 
            stopHeartFlashing();
            stopRectFlashing();
            stopStarFlashing();
        };
    };
};
});

$(document).ready(function() {
    $('.instructions').show(); 
  
    function hideInstructions() {
      $('.instructions').fadeOut(); 
    }
  
    $(document).on('click keydown', function() {
      hideInstructions();
    });
  });

// makes black cover and the window shape

function draw() {
    clear();
    if (lensOn) {
        // draw black rect cover
        fill(0);
        rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
        erase();
        // draw the window!
        drawShape();
        noErase();
    }
}

// cycles through the array and chooses what shape

function drawShape() {
    if (shape[currentShape] === 'rectangle') {
        $('.heart-stay-content').hide(); 
        $('.heart-hide-content').hide();
        $('.star-show-content').hide(); 
        $('.star-hide-content').hide();
        $('.rect-show-content').show(); 
        $('.rect-hide-content').show();
        stopStarFlashing();
        stopHeartFlashing();
        startRectFlashing();
        rect(mouseX, mouseY, rectWidth, rectHeight);
    }
    // else if (shape[currentShape] === 'circle') {
    //     circle(mouseX, mouseY, circDiameter);
    //     $('.heart-content').hide(); 
    // }
    else if (shape[currentShape] === 'heart') {
        $('.rect-show-content').hide(); 
        $('.rect-hide-content').hide();
        $('.star-show-content').hide(); 
        $('.star-hide-content').hide();
        $('.heart-stay-content').show(); 
        $('.heart-hide-content').show(); 
        stopRectFlashing();
        stopStarFlashing();
        startHeartFlashing();       
        drawHeart(mouseX, mouseY);
    }
    else if (shape[currentShape] === 'star') {
        $('.rect-show-content').hide(); 
        $('.rect-hide-content').hide();
        $('.heart-hide-content').hide();  
        $('.heart-stay-content').hide(); 
        $('.star-show-content').show(); 
        $('.star-hide-content').show();
        stopRectFlashing();
        stopHeartFlashing();
        startStarFlashing();
        drawStar(mouseX, mouseY, 90, 180, 5); 
    }
}

function startHeartFlashing() {
    if (!flashingHeartInterval && lensOn && shape[currentShape] === 'heart') {
        flashingHeartInterval = setInterval(function() {
            $('.heart-hide-content').fadeOut(2000).fadeIn(2000);
        }, 500);
    }
}

function stopHeartFlashing() {
    if (flashingHeartInterval) {
        clearInterval(flashingHeartInterval);
        flashingHeartInterval = null;
        $('.heart-hide-content').stop(true, true);
    }
}

function startRectFlashing() {
    if (!flashingRectInterval && lensOn && shape[currentShape] === 'rectangle') {
        flashingRectInterval = setInterval(function() {
            $('.rect-hide-content').fadeOut(2000).fadeIn(2000);
        }, 500);
    }
}

function stopRectFlashing() {
    if (flashingRectInterval) {
        clearInterval(flashingRectInterval);
        flashingRectInterval = null;
        $('.rect-hide-content').stop(true, true); 
    }
}

function startStarFlashing() {
    if (!flashingStarInterval && lensOn && shape[currentShape] === 'star') {
        flashingStarInterval = setInterval(function() {
            $('.star-hide-content').fadeOut(2000).fadeIn(2000);
        }, 500);
    }
}

function stopStarFlashing() {
    if (flashingStarInterval) {
        clearInterval(flashingStarInterval);
        flashingStarInterval = null;
        $('.star-hide-content').stop(true, true); 

    }
}

// for this heart shape, i used the code from this sketch: 
//https://editor.p5js.org/Supriyo/sketches/N2nRmPYL7
// for the star shape, i used the code from this sketch:
// https://editor.p5js.org/p5/sketches/Form:_Star
// i then used chat gpt to help me figure out where to adjust 
//the code so that the shapes follows mouseX and mouse Y because math is hard

function drawHeart(x,y) {
    beginShape(x, y);
    for (let a = 0; a < TWO_PI; a += 0.1) {
      const r = 10;
      const heartX = x + r * 16 * pow(sin(a), 3);
        const heartY = y - r * (13 * cos(a) - 5 * cos(2 * a) - 2 * cos(3 * a) - cos(4 * a)); // Subtract from mouseY
    
      vertex(heartX, heartY);
    }
    endShape();
}

function drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints; 
    let halfAngle = angle / 2.0; 
    
    beginShape(); // Start shape
    for (let a = 0; a < TWO_PI; a += angle) {
        // Outer vertex
        let sx = x + cos(a) * radius2;
        let sy = y + sin(a) * radius2;
        vertex(sx, sy);
        // Inner vertex
        sx = x + cos(a + halfAngle) * radius1;
        sy = y + sin(a + halfAngle) * radius1;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}

// press mouse so that the shape changes

function mousePressed() {
    if ($('.instructions').is(':visible')) {
        return; 
      }
    if (lensOn) {
        currentShape = currentShape + 1;
        if (currentShape == lastItem) {
            currentShape = 0;
            }
        }
}

