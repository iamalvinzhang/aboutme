/*
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
*/



const btn = document.getElementById("dark-mode-btn");
const body = document.body;
const box = document.querySelector(".box");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const darkbtn = document.querySelector(".darkbtn");



btn.addEventListener("click", () => {
    darkbtn.classList.toggle("dark-mode")
  body.classList.toggle("dark-mode");
  box.classList.toggle("dark-mode");
  box1.classList.toggle("dark-mode");
  box2.classList.toggle("dark-mode");
  id.classLight.toggle("dark-mode");
});







window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
};



var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var settings = {

    'basic': {

        'emission_rate': 650,
        'min_life': 5,
        'life_range': 1,
        'min_angle': 0,
        'angle_range': 360,
        'min_speed': 10,
        'speed_range': 100,
        'min_size': 2,
        'size_range': 4,
        'start_colours': [
            [130, 196, 245, 0.8],
            [69, 152, 212, 0.8],
            [179, 166, 250, 0.8]
        ],
        'end_colours': [
            [130, 196, 245, 0],
            [155, 119, 253, 0],
            [244, 121, 201, 0]
        ],
        'gravity': {
            x: 0,
            y: 0
        },
        'min_position': {
            x: -30,
            y: -30
        },
        'position_range': {
            x: 60,
            y: 60
        }
    }
}



var Particle = function(x, y, angle, speed, life, size, start_colour, colour_step) {

    /* the particle's position */

    this.pos = {

        x: x || 0,
        y: y || 0
    };

    /* set specified or default values */

    this.speed = speed || 5;

    this.life = life || 1;

    this.size = size || 2;

    this.lived = 0;

    /* the particle's velocity */

    var radians = angle * Math.PI / 180;

    this.vel = {

        x: Math.cos(radians) * speed,
        y: -Math.sin(radians) * speed
    };

    /* the particle's colour values */
    this.colour = start_colour;
    this.colour_step = colour_step;
};

var Emitter = function(x, y, settings) {

    /* the emitter's position */

    this.pos = {

        x: x,
        y: y
    };

    /* set specified values */

    this.settings = settings;

    /* How often the emitter needs to create a particle in milliseconds */

    this.emission_delay = 1000 / settings.emission_rate;

    /* we'll get to these later */

    this.last_update = 0;

    this.last_emission = 0;

    /* the emitter's particle objects */

    this.particles = [];
};

Emitter.prototype.update = function() {

    /* set the last_update variable to now if it's the first update */

    if (!this.last_update) {

        this.last_update = Date.now();

        return;
    }

    /* get the current time */

    var time = Date.now();

    /* work out the milliseconds since the last update */

    var dt = time - this.last_update;

    /* add them to the milliseconds since the last particle emission */

    this.last_emission += dt;

    /* set last_update to now */

    this.last_update = time;

    /* check if we need to emit a new particle */

    if (this.last_emission > this.emission_delay) {

        /* find out how many particles we need to emit */

        var i = Math.floor(this.last_emission / this.emission_delay);

        /* subtract the appropriate amount of milliseconds from last_emission */

        this.last_emission -= i * this.emission_delay;

        while (i--) {

            /* calculate the particle's properties based on the emitter's settings */

            var start_colour = this.settings.start_colours[Math.floor(this.settings.start_colours.length * Math.random())];

            var end_colour = this.settings.end_colours[Math.floor(this.settings.end_colours.length * Math.random())];

            var life = this.settings.min_life + Math.random() * this.settings.life_range;

            var colour_step = [
                (end_colour[0] - start_colour[0]) / life, /* red */
                (end_colour[1] - start_colour[1]) / life, /* green */
                (end_colour[2] - start_colour[2]) / life, /* blue */
                (end_colour[3] - start_colour[3]) / life  /* alpha */
            ];

            this.particles.push(
                new Particle(
                    0,
                    0,
                    this.settings.min_angle + Math.random() * this.settings.angle_range,
                    this.settings.min_speed + Math.random() * this.settings.speed_range,
                    life,
                    this.settings.min_size + Math.random() * this.settings.size_range,
                    start_colour.slice(),
                    colour_step
                )
            );
        }
    }

    /* convert dt to seconds */

    dt /= 1000;

    /* loop through the existing particles */

    var i = this.particles.length;

    while (i--) {

        var particle = this.particles[i];

        /* skip if the particle is dead */

        if (particle.dead) {

            /* remove the particle from the array */

            this.particles.splice(i, 1);

            continue;
        }

        /* add the seconds passed to the particle's life */

        particle.lived += dt;

        /* check if the particle should be dead */

        if (particle.lived >= particle.life) {

            particle.dead = true;

            continue;
        }

        /* calculate the particle's new position based on the seconds passed */

        particle.pos.x += particle.vel.x * dt;
        particle.pos.y += particle.vel.y * dt;

        /* draw the particle */

        particle.colour[0] += particle.colour_step[0] * dt;
        particle.colour[1] += particle.colour_step[1] * dt;
        particle.colour[2] += particle.colour_step[2] * dt;
        particle.colour[3] += particle.colour_step[3] * dt;

        ctx.fillStyle = 'rgba(' +
            Math.round(particle.colour[0]) + ',' +
            Math.round(particle.colour[1]) + ',' +
            Math.round(particle.colour[2]) + ',' +
            particle.colour[3] + ')';

        var x = this.pos.x + particle.pos.x;
        var y = this.pos.y + particle.pos.y;

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }
};

var emitter = new Emitter(canvas.width / 2, canvas.height / 2, settings.basic);

var isPaused = false;

canvas.addEventListener('click', function() {
    isPaused = !isPaused; // toggle pause state
});

function loop() {

    if (!isPaused) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    emitter.update();
    }
    requestAnimFrame(loop);
    

}

window.addEventListener('resize', () => {
    // Update the canvas dimensions to the new window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reset the emitter's position to the center of the canvas
    emitter.pos.x = canvas.width / 2;
    emitter.pos.y = canvas.height / 2;
  });

loop();
