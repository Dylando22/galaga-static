let Butterfly = {
    type: 'butterfly',
    x: 500,
    returnX: 300,
    returnY: 300,
    y: 300,
    width: 25,
    height: 25,
    isAlive: true,
    isDiving: false,
    inFormation: false,
    fire: false,
    fireCount: 0,
    flightPath: [],
    flightIdx: 0,
    rotation: 0,
    entranceTime: 0,



    shoot: function shoot(){
            let newBullet = Object.assign({}, enemyBullet); // create a new bullet object
            newBullet.x = this.x + 8 ; // set the starting position
            newBullet.y = this.y - 10;
            enemyBullets.push(newBullet); // add the bullet to the array of active bullets
            playSound('shoot');
        
    },

    checkShot: function checkShot(elapsedTime){
        if(this.isAlive && this.inFormation){
            if(this.x > Player.x - 5 && this.x < Player.x + 5 && !this.fire){
                // get random number for shot
                let num = Math.floor(Math.random * 100);
                if(num > 75){
                    this.shoot();
                    this.fire = true;
                    this.fireCount = 0;
                }

            }
            else if(this.fire){
                this.fireCount += elapsedTime;
            }
            if(this.fireCount > 3000){
                this.fire = false;
            }
        }
        else if(this.isDiving && (this.flightPath.length == 25 || this.flightPath.length == 60)){
            this.shoot();
        }
    },

    getDivePath: function getDivePath(){
        this.isDiving = true;
        this.inFormation = false;
          // Calculate the control point for the Bezier curve
        let Start = {x:this.x,y:this.y};
        let End = { x: Player.x, y: Player.y};
        let size = Math.floor(Math.random() * 200 + 50);
        path = this.getPath(Start,End,size);
        console.log(path);
        this.flightPath = path;
    },

    getPath: function generatePath(startPoint, endPoint, loopSize) {
        // Calculate the control points for the Bezier curve
        const controlPoint1 = {
          x: (startPoint.x + endPoint.x) / 2,
          y: startPoint.y - loopSize,
        };
        const controlPoint2 = {
          x: (startPoint.x + endPoint.x) / 2,
          y: endPoint.y - loopSize,
        };
      
        // Calculate the points on the curve
        const points = [];
        for (let t = 0; t <= 1; t += 0.01) {
          const x =
            (1 - t) ** 3 * startPoint.x +
            3 * (1 - t) ** 2 * t * controlPoint1.x +
            3 * (1 - t) * t ** 2 * controlPoint2.x +
            t ** 3 * endPoint.x;
          const y =
            (1 - t) ** 3 * startPoint.y +
            3 * (1 - t) ** 2 * t * controlPoint1.y +
            3 * (1 - t) * t ** 2 * controlPoint2.y +
            t ** 3 * endPoint.y;
          points.push({ x, y });
        }
      
        return points;
      },

      updateReturnPath: function updateReturnPath(path, newEndpoint){
            const startPoint = path[0];
            const pathLength = path.length;
            const endPoint = path[pathLength - 1];
          
            // Calculate the vector from the start point to the end point
            const pathVector = {
              x: endPoint.x - startPoint.x,
              y: endPoint.y - startPoint.y,
            };
          
            // Calculate the vector from the start point to the new endpoint
            const newVector = {
              x: newEndpoint.x - startPoint.x,
              y: newEndpoint.y - startPoint.y,
            };
          
            // Calculate the scaling factor for the new vector to match the length of the path vector
            const scale = Math.sqrt(
              (pathVector.x ** 2 + pathVector.y ** 2) /
                (newVector.x ** 2 + newVector.y ** 2)
            );
          
            // Scale the new vector to match the length of the path vector
            const scaledVector = {
              x: newVector.x * scale,
              y: newVector.y * scale,
            };
          
            // Calculate the new endpoint by adding the scaled vector to the start point
            const adjustedEndpoint = {
              x: startPoint.x + scaledVector.x,
              y: startPoint.y + scaledVector.y,
            };
          
            // Generate a new path with the same shape as the original path, but adjusted to end at the new endpoint
            const adjustedPath = this.getPath(startPoint, adjustedEndpoint, 0);
          
            // Replace the last point in the adjusted path with the new endpoint
            adjustedPath[pathLength - 1] = newEndpoint;
          
            return adjustedPath;    

      },

      getRotation: function getRotationAngle(currentPoint, nextPoint) {
        const deltaX = nextPoint.x - currentPoint.x;
        const deltaY = nextPoint.y - currentPoint.y;
        const angleRadians = Math.atan2(deltaY, deltaX);
        const angleDegrees = angleRadians * 180 / Math.PI;
        return angleDegrees;
      },

      getEntrancePathLeft: function getEntrancePathLeft(yCoord, Xend){
        const startPoint = { x: 0, y: yCoord };
        path = [startPoint];
        for(let i = 1; i < 51; i++){
            //go to the middle
            let point = {
                x: (Xend/50) * i,
                y: yCoord,
            }
            path.push(point);
        }
        let Start = {x: Xend, y:yCoord};
        let End = {x: this.returnX, y: this.returnY};
        let toStart = this.getPath(Start,End,0);
        for(let i = 0; i < toStart.length; i++){
            path.push(toStart[i]);
        }
        return path;
      },

      getEntrancePathRight: function getEntrancePathRight(yCoord, Xend){
        const startPoint = { x: 600, y: yCoord };
        path = [startPoint];
        for(let i = 50; i > 0; i--){
            //go to the middle
            let point = {
                x: ((Xend/50) * i) + Xend,
                y: yCoord,
            }
            path.push(point);
        }
        let Start = {x: Xend, y:yCoord};
        let End = {x: this.returnX, y: this.returnY};
        let toStart = this.getPath(Start,End,0);
        for(let i = 0; i < toStart.length; i++){
            path.push(toStart[i]);
        }
        return path;
      },


      ChallengePathTopLeft: function ChallengePathTopLeft(){
        const startPoint = { x: 150, y: 0 };
        const path = [startPoint]
        for(let i = 1; i < 25; i += .25){
            let point = {
                x: (i * 4) + 150,
                y: (i * 15),
            }   
            path.push(point);
        }
        for(let i = 1; i < 25; i+= .5){
            let point = {
                x: 250 + (i*6),
                y: 365,
            } 
            path.push(point); 
        }
        for(let i = 1; i< 25;i += .25){
            let point = {
                x: 400 + (i * 8),
                y: 365 - (i * 15),
            }
            path.push(point);
        }
        path.push({x: -50, y:-50});
        return path;
      },

      ChallengePathTopRight: function ChallengePathTopLeft(){
        const startPoint = { x: 450, y: 0 };
        const path = [startPoint]
        for(let i = 1; i < 25; i += .25){
            let point = {
                x: 450 - (i * 4),
                y: (i * 15),
            }   
            path.push(point);
        }
        for(let i = 1; i < 25; i+= .5){
            let point = {
                x: 350 - (i*6),
                y: 365,
            } 
            path.push(point); 
        }
        for(let i = 1; i< 25;i += .25){
            let point = {
                x: 200 - (i*8),
                y: 365 - (i * 15),
            }
            path.push(point);
        }
        path.push({x: -50, y:-50});
        return path;
      },

      ChallengePathLeftLoop: function ChallengePathLeftLoop(){
        const startPoint = { x: 0, y: 100 };
        const startPath = [startPoint]
        for(let i = 1; i < 25; i += .25){
            let point = {
                x: (i * 18),
                y: 100 + (i * 8),
            }   
            startPath.push(point);
        }
        // Define the center of the circle in pixels
        let center_x = 435;
        let center_y = 300;
            
        // Define the radius of the circle in pixels
        let radius = 50;
            
        // Define the number of points to generate around the circle
        let num_points = 50;
            
        // Generate an array of angles from 0 to 2*pi, with num_points points
        let angles = Array.from({length: num_points}, (_, i) => (i / num_points) * 2 * Math.PI);
            
        // Generate x and y coordinates for each angle, using sin and cos functions
        let coords = angles.map(angle => ({x : Math.floor(center_x + radius * Math.cos(angle)), y:  Math.floor(center_y + radius * Math.sin(angle))}));
            
        let path = startPath.concat(coords);
        for(let i = 1; i < 25; i += 1){
            let point = {
                x: 450 + (i*2),
                y: 300 - (i*5),
            } 
            path.push(point); 
        }
        for(let i = 1; i< 25;i += .25){
            let point = {
                x: 500 - (i * 21),
                y: 175 - (i * 2),
            }
            path.push(point);
        }
        path.push({x: -50, y:-50});
        return path;
      },

      ChallengePathRightLoop: function ChallengePathRightLoop(){
        const startPoint = { x: 600, y: 100 };
        const startPath = [startPoint]
        for(let i = 1; i < 25; i += .25){
            let point = {
                x: 600 - (i * 18),
                y: 100 + (i * 8),
            }   
            startPath.push(point);
        }
        // Define the center of the circle in pixels
        let center_x = 118;
        let center_y = 290;
            
        // Define the radius of the circle in pixels
        let radius = 50;
            
        // Define the number of points to generate around the circle
        let num_points = 50;
            
        // Generate an array of angles from 0 to 2*pi, with num_points points
        let angles = Array.from({length: num_points}, (_, i) => (i / num_points) * 2 * Math.PI);
            
        // Generate x and y coordinates for each angle, using sin and cos functions
        let coords = angles.map(angle => ({x : Math.floor(center_x + radius * Math.cos(angle)), y:  Math.floor(center_y + radius * Math.sin(angle))}));
        coords.reverse();
        let path = startPath.concat(coords);
        for(let i = 1; i < 25; i += 1){
            let point = {
                x: 160 - (i*2),
                y: 300 - (i*5),
            } 
            path.push(point); 
        }
        for(let i = 1; i< 25;i += .25){
            let point = {
                x: 110 + (i * 21),
                y: 175 - (i * 2),
            }
            path.push(point);
        }
        path.push({x: -50, y:-50});
        return path;
      }
}
