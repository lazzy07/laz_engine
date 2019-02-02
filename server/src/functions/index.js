export const ballInitial = () => {
  return {
    runs: "?",
    extra: "No extras",
    wicket: "No wicket",
    bowler: null,
    batsman: null,
    batsmen: [],
    inning: "0",
    over: "0",
    ball: "0",
    out: null,
    catcher: "not selected",
    shot: { x: 0, y: 0 }
  }
}

export const initialOver = () => {
  return {
    over: "0",
    inning: "1",
    bowlingEnd: "Bottom",
    balls: []
  }
}

export const addInningInitialData = ({overs, inning, ballsPerOver}) => {
    let inningData = [];

    for(let i=0; i < parseInt(overs);i++){
      let over = initialOver();
      over.over = i.toString();
      over.inning = inning.toString();
      
      for(let j=0; j<parseInt(ballsPerOver);j++){
        let ball = ballInitial();
        ball.ball = j.toString();
        ball.over = i.toString();
        ball.inning = inning;
        over.balls.push(ball);
      }
      inningData.push(over);
    }

  return inningData;
}