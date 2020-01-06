// call p5.js explicitly as per
//  https://github.com/processing/p5.js/wiki/p5.js-overview#why-cant-i-assign-variables-using-p5-functions-and-variables-before-setup
new p5();

// the board defined as a list of lists
let board = [
    ['','','','','','','',],
    ['','','','','','','',],
    ['','','','','','','',],
    ['','','','','','','',],
    ['','','','','','','',],
    ['','','','','','','',],
];

// height and width of each square to be defined in setup()
// but needs to be global
let w;
let h;

// the players
// Human will be red
let human = 'R';
let ai = 'Y';

// Human to start
let currentPlayer = human;

// array of available squares on the board
let available = [];

function setup(){
    createCanvas(400,400);

       //  w and h are the width and height of a square
        w = floor(width/7);
        h = floor(height/6);
};

// click to play
function mousePressed(){
    if (currentPlayer == human){
        // human to play

        // detect which column the human clicked in.
        // floor() calculates the closest int value that is less than or equal to 
        // the value of the parameter.
        let j = floor(mouseX/w);
        
        // detect which is the lowest available square in that column
        // drop a red coin in that column
        // i.e. assign 'R' to the position on the board and let 
        // draw() draw a red ellipse in that position
        for (let i = 5; i>=0; i--){
            if (board[i][j] == ''){
                board[i][j] = human;
                // once the human has played, check for a winner
                checkWinner(i,j);
                i=0;
            };
        };
        // human has played switch to ai
        currentPlayer = ai;

        // ai plays randomly at this stage
        j = floor(random(6));
        
        for (i = 5; i>=0; i--){
            if (board[i][j] == ''){
                board[i][j] = ai;
                checkWinner(i,j);
                i=0;
                // once the ai has played, check for a yellow winner from the position just played
                // pass the position to check winnner
                
            };
        };
        // ai has played switch back to human
        currentPlayer = human;
    }; 
}

function nextTurn(){
}

function checkWinner(wi,wj){

    // Winner can only happen once at least 8 coins (10 for diagonal)/4 rounds have been played
    // MAYBE SET UP A COUNTER FOR ROUNDS AND PUT checkWinner in an If then conditional sutructure 

    // let winner = null;

    // CHECK HORIZONTAL
    let Rconnect = 0;
    let Lconnect  = 0;
    let i = 0;
    // check to the right of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (Rconnect)
    try {
        do { 
            console.log(`checking ${board[wi][wj]} for horizontal connect`);
            Rconnect++;
            i++;
        }
        while (board[wi][wj] == board[wi][wj+i]);
        
        i = 0;
        
        // check to the left of the coin just played
        // as long as coins are the same colour
        // save the number of consecutive coins of the same colour (Lconnect)
        do { 
            Lconnect++;
            i++;
        }
        while (board[wi][wj] == board[wi][wj-i]);
        
        // once Right and left have been checked add the scores
        // substract 1 as the coin being played is effectively counted twice
        // If the score is equal or superior to 4
        // 4 coins of the same colour have been connected horizontally.
        // we have a winner
        if (Rconnect+Lconnect-1 >= 4){
            console.log(`${board[wi][wj]} wins`);
            // winner = board[wi][wj];
            // return winner
        }
    } catch {console.log('ERROR: checking out of range')}
    
    // CHECK VERTICAL.
    // only need to check below the coin that has just been played
    // only need to do this check if j=2 i.e. the coin is on the 
    //  fourth row from the bottom
    try {
        if (wi <= 2){
            console.log(`checking ${board[wi][wj]} for vertical connect`);
            
            let Bconnect = 1;
            let j = 1;
            // check to the right of the coin just played
            // as long as coins are the same colour
            // save the number of consecutive coins of the same colour (Rconnect)
            do {
                console.log("Bconnect entering the do loop ", Bconnect)
                console.log("j entering the do loop ", j)
                
                if (board[wi][wj] == board[wi+j][wj]){
                    Bconnect++;
                    j++;
                    console.log("Bconnect after match has been found ", Bconnect)
                    console.log("j after match has been found and j has been incremented ", j)
                    if (Bconnect == 4){
                        console.log("Bconnect if == 4 ", Bconnect)
                        console.log("j if Bconnect == 4 ", j)
                        console.log(`${board[wi][wj]} wins`);
                        // winner = board[wi][wj];
                        // return winner
                    };
                    console.log(`AFTER SCORE HAS BEEN TESTED. j: ${j}, Bconnect score: ${Bconnect} for ${board[wi][wj]} `);
                };            
            }
            // CHECK THAT wi+j DOES NOT GET OFF THE BOARD OTHERWISE ERROR
            // MAYBE GET THE WHOLEcheckWinner() IN A TRAY CATCH
            while (board[wi][wj] == board[wi+j][wj] && [wi+j] < 6);
            
            console.log("Bconnect once checks are finished", Bconnect)
        };
    } catch {console.log("ERROR: Checking out of range")}
    
    // CHECK TOP RIGHT TO BOTTOM LEFT DIAGONAL
    // Combines vertical and horizontal checks 
    let LBconnect = 0;
    let RTconnect  = 0;
    
    let k = 0;
    let l = 0;
    let m = 0;
    let n = 0;
    // check one to the left and one to the bottom of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (LBconnect)
    try {
        do { 
            console.log(`checking ${board[wi][wj]} at position ${wi}, ${wj} for bottom left diagonal connect `);
            LBconnect++;
            console.log("TCL: checkWinner -> LBconnect", LBconnect)
            // the vertical index have to be substracted as top row is 0 and bottom row is 5
            k++;
            l--;
            console.log(`next check at versus position ${wi+k}, ${wj+l}`)
        }
        while (board[wi][wj] == board[wi+k][wj+l]);
        
        k = 0;
        l = 0;
    } catch {console.log('ERROR: checking out of range')};


    // check one to the right and one to the top of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (LBconnect)
    try {
        do { 
            console.log(`checking ${board[wi][wj]} at position ${wi}, ${wj} for top right diagonal connect `);
            RTconnect++;
            console.log("TCL: checkWinner -> RTconnect", RTconnect)
            // the vertical index have to be substracted as top row is 0 and bottom row is 5
            m--;
            n++;
            console.log(`next check versus position ${wi+m}, ${wj+n}`)
        }
        while (board[wi][wj] == board[wi+m][wj+n]);
        
        m = 0;
        n = 0;
    } catch {console.log('ERROR: checking out of range')};

    // Once bottom left and top right directions have been checked, 
    // substract 1 as the coin being played is effectively counted twice
    // If the score is equal or superior to 4
    // 4 coins of the same colour have been connected horizontally.
    // we have a winner
    if (LBconnect+RTconnect-1 >= 4){
        console.log(`${board[wi][wj]} wins`);
    //     // winner = board[wi][wj];
    //     // return winner
    }

    // CHECK TOP LEFT TO BOTTOM RIGHT DIAGONAL

    let RBconnect = 0;
    let LTconnect  = 0;
    
    let o = 0;
    let p = 0;
    let q = 0;
    let r = 0;
    // check one to the left and one to the bottom of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (LBconnect)
    try {
        do { 
            console.log(`checking ${board[wi][wj]} at position ${wi}, ${wj} for bottom right diagonal connect `);
            RBconnect++;
            console.log("TCL: checkWinner -> RBconnect", RBconnect)
            // the vertical index have to be substracted as top row is 0 and bottom row is 5
            o++;
            p++;
            console.log(`next check at versus position ${wi+o}, ${wj+p}`)
        }
        while (board[wi][wj] == board[wi+o][wj+p]);
        
        o = 0;
        p = 0;
    } catch {console.log('ERROR: checking out of range')};


    // check one to the right and one to the top of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (LBconnect)
    try {
        do { 
            console.log(`checking ${board[wi][wj]} at position ${wi}, ${wj} for top left diagonal connect `);
            LTconnect++;
            console.log("TCL: checkWinner -> LTconnect", LTconnect)
            // the vertical index have to be substracted as top row is 0 and bottom row is 5
            q--;
            r--;
            console.log(`next check versus position ${wi+q}, ${wj+r}`)
        }
        while (board[wi][wj] == board[wi+q][wj+r]);
        
        q = 0;
        r = 0;
    } catch {console.log('ERROR: checking out of range')};

    // Once bottom left and top right directions have been checked, 
    // substract 1 as the coin being played is effectively counted twice
    // If the score is equal or superior to 4
    // 4 coins of the same colour have been connected horizontally.
    // we have a winner
    if (RBconnect+LTconnect-1 >= 4){
        console.log(`${board[wi][wj]} wins`);
    //     // winner = board[wi][wj];
    //     // return winner
    }

    // check one to the left and one to the bottom of the coin just played
    // as long as coins are the same colour
    // save the number of consecutive coins of the same colour (Lconnect)
    // do { 
    //     LDconnect++;
    //     i++;
    // }
    // while (board[wi][wj] == board[wi][wj-i]);
    
    // // once Right and left have been checked add the scores
    // // substract 1 as the coin being played is effectively counted twice
    // // If the score is equal or superior to 4
    // // 4 coins of the same colour have been connected horizontally.
    // // we have a winner
    // if (Rconnect+Lconnect-1 >= 4){
    //     console.log(`${board[wi][wj]} wins`);
    //     // winner = board[wi][wj];
    //     // return winner
    // };


    // if there are no more available squares
    // It's a tie
    // console.log('just checking');
}


function draw(){
    background(220);
    strokeWeight(4);
    fill('blue');


    let posx = 0;
    let posy = 0;

    // additions and substractions offste the strokeWeight(4)
    rect(posx+2, posy+2, width-4, height-4);

    // draw 7 horizontal lines
    for (x = 0; x < 5; x++) {
        line(posx, posy+h, posx+width, posy+h);
        posy = posy+h;
    };

    posx = 0;
    posy = 0;

    // draw 8 vertical lines
    for (y = 0; y < 6; y++){        
        line(posx+w, posy, posx+height/7, posy+height);
        posx = posx+w
    }; 


    // render the board with coins
    // check per colum, stop when you get to a blank 
    // or to the top of the column
    
    for (let i=0; i<7; i++){
        for (let j=0; j<6; j++){
            let x = w * i + w/2;
            let y = h *j +h/2;

            let spot = board[j][i];
            if (spot=='R'){
                fill('red');
                ellipse(x,y,w/1.2);
            } else if (spot=='Y') {
                fill('yellow');
                ellipse(x,y,w/1.2);
            } else {
                fill('white');
                ellipse(x,y,w/1.2);
            };
        };
    };

    // // display winner
    // let result = checkWinner();
    // // if the result is not null i.e. has been assigned

    // if (winner !== null) {
    // console.log("TCL: draw -> and the winner is winner", winner);
    // }
}