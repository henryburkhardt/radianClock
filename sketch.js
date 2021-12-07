
var w = window.innerWidth;
var h = window.innerHeight; 
var min_cont_radStart;

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

var points = []  

function polar_to_cartisian(r, theta, x_orgin, y_orgin){
    var x = r*Math.cos(theta) + x_orgin;
    var y = r*Math.sin(theta) + y_orgin;
    return[x,y]
}


function setup() {
  canvas = createCanvas(w-20, h-20);
  angleMode(DEGREES);
  background(10);
  console.log(min_cont_radStart)
  min_cont_radStart = ((second()+(Date.now() % 1000)/1000)/60)*(2*Math.PI);


  

}




function draw(){
    
    background(10);

    stroke(204);
    strokeWeight(1)
    fill(10);
    //ellipse(width/2, height/2, 500)
    strokeWeight(5);
    
    
    
    var min_cont_rad = ((second()+(Date.now() % 1000)/1000)/60)*(2*Math.PI);
    min_count_rad = min_cont_rad - (Math.PI/2)
    var hour_cont_rad = ((minute() + (second()+(Date.now() % 1000)/1000)/60)/60)*(2*Math.PI);
    var sec_cont_rad = (Date.now() % 1000)/1000*(2*Math.PI)
    sec_cont_rad = sec_cont_rad - (Math.PI/2)


    strokeWeight(1);
    start = 400;
    end = 430;
    radian_measures = [0,(Math.PI/6), (Math.PI/3),(Math.PI/2),(Math.PI*2)/3, (Math.PI*5)/6,(Math.PI),(Math.PI*7)/6, (Math.PI*4)/3,(Math.PI*5)/3, (Math.PI*11)/6,(3*Math.PI)/2]

    for(radian of radian_measures){
        line(polar_to_cartisian(start,radian,width/2,height/2)[0],polar_to_cartisian(start,radian,width/2, height/2)[1],polar_to_cartisian(end,radian,width/2,height/2)[0],polar_to_cartisian(end,radian,width/2,height/2)[1])

    }

    // line(polar_to_cartisian(start,(Math.PI/2),width/2,height/2)[0],polar_to_cartisian(start,(Math.PI/2),width/2, height/2)[1],polar_to_cartisian(end,(Math.PI/2),width/2,height/2)[0],polar_to_cartisian(end,(Math.PI/2),width/2,height/2)[1])
    // line(polar_to_cartisian(start,0,width/2,height/2)[0],polar_to_cartisian(start,0,width/2, height/2)[1],polar_to_cartisian(end,0,width/2,height/2)[0],polar_to_cartisian(end,0,width/2,height/2)[1])
    // line(polar_to_cartisian(start,(Math.PI),width/2,height/2)[0],polar_to_cartisian(start,(Math.PI),width/2, height/2)[1],polar_to_cartisian(end,(Math.PI),width/2,height/2)[0],polar_to_cartisian(end,(Math.PI),width/2,height/2)[1])
    // line(polar_to_cartisian(start,(3*Math.PI)/2,width/2,height/2)[0],polar_to_cartisian(start,(3*Math.PI)/2,width/2, height/2)[1],polar_to_cartisian(end,(3*Math.PI)/2,width/2,height/2)[0],polar_to_cartisian(end,(3*Math.PI)/2,width/2,height/2)[1])

    // var [hour_x, hour_y] = polar_to_cartisian(100, hour_cont_rad,width/2,height/2)
    // point(hour_x, hour_y)
    // line(width/2,height/2, hour_x, hour_y)

    strokeWeight(6);
    stroke(143, 81, 214);
    var [min_x, min_y] = polar_to_cartisian(400, min_cont_rad, width/2, height/2)
    point(min_x, min_y)

    // line(hour_x, hour_y, min_x, min_y)
    strokeWeight(1);
    
    var[sec_x, sec_y] = polar_to_cartisian(500, sec_cont_rad, min_x, min_y)
    points.push([sec_x, sec_y]);

    

    stroke(255);
    for(i in points){
        point(points[i][0], points[i][1]);
        // if(i>100){
        //     line(points[i][0], points[i][1], points[i-100][0], points[i-100][1])
        // }

        if(i > 4000){
            points.shift();
            print('run one minutes');
        }
    }



    // line(sec_x, sec_y, min_x, min_y)

    

    
    // // arc(width/2, height/2, 500, 500, 0, mill_cont);
    // // arc(width/2, height/2, 700, 700, 0, timeToRadian()[4]);
    // // arc(width/2, height/2, 600, 600, 0, timeToRadian()[3]);

    // //hour counter
    // point(  width/2+(300*Math.cos(hour_cont_rad)), 
    //         (height/2+(300*Math.sin(hour_cont_rad)))
            
    //         )

    // //minute counter
    // point(  width/2+(300*Math.cos(min_cont_rad)), 
    //         (height/2+(300*Math.sin(min_cont_rad)))
            
    //     )

    // //second counter
    // point( (width/2+(300*Math.cos(min_cont_rad)))+((60*Math.cos(sec_cont_rad))),
    //         ((height/2+(300*Math.sin(min_cont_rad)))+(60*Math.sin(sec_cont_rad)))
    //     )











    fill(204);
    textSize(40);
    textFont('Georgia');
    
    textStyle();
    strokeWeight(0.02);
    // text("π/2 : π/3 : 2π/4", width/2, height/2);
    textAlign(RIGHT, CENTER);
    text(timeToRadian()[0], width/2-90, height/2);
    textAlign(CENTER);
    text(": "+timeToRadian()[1]+" :", width/2, height/2);
    textAlign(LEFT);
    text(timeToRadian()[2], width/2+90, height/2);
    

    
}

function getRad(degrees){
    if(typeof deg_rad[degrees][1] === "undefined"){
        radians = deg_rad[360-degrees][0];

    }else{

        radians = deg_rad[360-degrees][0] + "/" + deg_rad[360-degrees][1];
    }

    return(radians);
}

function timeToRadian(){
    var h = hour() % 12;
    console
    var m = minute();
    var s = second();

    var h_degrees = (h/12)*360;
    var h_radians = getRad(h_degrees)
    
    var m_degrees = (Math.trunc(m/5))/12*360;
    var m_radians = getRad(m_degrees);

    var s_degrees = (Math.trunc(s/5))/12*360;
    var s_cont = (s/5)/12*360;
    var s_radians = getRad(s_degrees);

    
    
    

    //var time = (h_radians+" : "+m_radians+" : "+s_radians);
    var time = [h_radians, m_radians, s_radians,h_degrees, m_degrees, s_cont]


    return(time);

    
}

window.onresize = function() {
    // assigns new values for width and height variables
    w = window.innerWidth;
    h = window.innerHeight;  
    canvas.size(w,h);
  }