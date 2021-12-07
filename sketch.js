var w = window.innerWidth;
var h = window.innerHeight; 

//dictionary converting degrees to radian string
var deg_rad = {
    0: ['2π'],
    30: ['π',6,],
    45: ['π',4,],
    60: ['π',3,],
    90: ['π',2,],
    120: ['2π',3,],
    135: ['3π',4,],
    150: ['5π',6,],
    180: ['π',,],
    210: ['7π',6,],
    225: ['5π',4,],
    240: ['4π',3,],
    270: ['3π',2,],
    300: ['5π',3,],
    315: ['7π',4,],
    330: ['11π',6,],
    360: ['2π']
    }

//empty global array to hold on screen points
var points = []  

function polar_to_cartisian(r, theta, x_orgin, y_orgin){
    var x = r*Math.cos(theta) + x_orgin;
    var y = r*Math.sin(theta) + y_orgin;
    return[x,y]
}

function getRad(degrees){
    if(typeof deg_rad[degrees][1] === "undefined"){
        var inRadians = deg_rad[360-degrees][0];
    }else{
        var inRadians = deg_rad[360-degrees][0] + "/" + deg_rad[360-degrees][1];
    }
    return(inRadians);
}

function timeToRadian(){
    var h = hour() % 12;
    var m = minute();
    var s = second();

    var h_degrees = (h/12)*360;
    var h_radians = getRad(h_degrees)
    
    var m_degrees = (Math.trunc(m/5))/12*360;
    var m_radians = getRad(m_degrees);

    var s_degrees = (Math.trunc(s/5))/12*360;
    var s_radians = getRad(s_degrees);

    var time = [h_radians, m_radians, s_radians,h_degrees, m_degrees]
    return(time);
}

function setup() {
  canvas = createCanvas(w-20, h-20);
  angleMode(DEGREES);
  background(10);
}

function draw(){
    background(10);
    
    var min_cont_rad = ((second()+(Date.now() % 1000)/1000)/60)*(2*Math.PI);
    min_count_rad = min_cont_rad - (Math.PI/2)
    var hour_cont_rad = ((minute() + (second()+(Date.now() % 1000)/1000)/60)/60)*(2*Math.PI);
    var sec_cont_rad = (Date.now() % 1000)/1000*(2*Math.PI)
    sec_cont_rad = sec_cont_rad - (Math.PI/2)

    //drawing lines (by radians in unit circle)
    start = 250;
    end = 280;
    radian_measures =   [0,(Math.PI/6), (Math.PI/3),
                        (Math.PI/2),(Math.PI*2)/3, (Math.PI*5)/6,
                        (Math.PI),(Math.PI*7)/6, (Math.PI*4)/3,
                        (Math.PI*5)/3, (Math.PI*11)/6,(3*Math.PI)/2]

    stroke(204);
    strokeWeight(1);

    for(radian of radian_measures){
        line(polar_to_cartisian(start,radian,width/2,height/2)[0],polar_to_cartisian(start,radian,width/2, height/2)[1],polar_to_cartisian(end,radian,width/2,height/2)[0],polar_to_cartisian(end,radian,width/2,height/2)[1]);
    }

    //drawing the minute dot
    strokeWeight(17);
    stroke(143, 81, 214);
    var [min_x, min_y] = polar_to_cartisian(start, min_cont_rad, width/2, height/2);
    point(min_x, min_y);

    //drawing the hour dot
    strokeWeight(17);
    stroke(236, 110, 250)
    var [hour_x, hour_y] = polar_to_cartisian(start, hour_cont_rad,width/2,height/2)
    point(hour_x, hour_y)

    //drawing the second dots around the minute dot every frame, stores in array
    strokeWeight(2);
    stroke(255);

    var[sec_x, sec_y] = polar_to_cartisian(370, sec_cont_rad, min_x, min_y)
    points.push([sec_x, sec_y]);
    
    for(i in points){
        point(points[i][0], points[i][1]);

        if(i > 4000){
            //limits on screen dots to 4000
            points.shift();
        }
    }

    //drawing clock text
    fill(204);
    textSize(30);
    textFont('Georgia');
    strokeWeight(0.02);
    
    textAlign(RIGHT, CENTER); //hours
    text(timeToRadian()[0], width/2-60, height/2);

    textAlign(CENTER); //minutes
    text(": "+timeToRadian()[1]+" :", width/2, height/2);

    textAlign(LEFT); //seconds
    text(timeToRadian()[2], width/2+60, height/2);
}