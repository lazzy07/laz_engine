import { getRealData } from ".";

let overCal = () => {
  return {
    total: 0,
    extras: 0
  };
};

export const getInningScore = (
  match,
  inning,
  pointsPerWide,
  pointsPerNoball
) => {
  let inn = "inning" + inning;

  let inningData = match.matchData[inn];
  let overData = [];
  let total = 0;
  let extras = 0;
  for (let i = 0; i < inningData.length; i++) {
    let overTotal = overCal();
    for (let j = 0; j < inningData[i].balls.length; j++) {
      let ball = inningData[i].balls[j];
      if (ball.runs !== "?") {
        total += parseInt(ball.runs);
        overTotal.total += parseInt(ball.runs);

        if (ball.extra === "Wd") {
          total += parseInt(pointsPerWide);
          extras += parseInt(pointsPerWide);
          overTotal.total += parseInt(pointsPerWide);
          overTotal.extras += parseInt(pointsPerWide);
        } else if (ball.extra === "nb") {
          total += parseInt(pointsPerNoball);
          extras += parseInt(pointsPerNoball);
          overTotal.total += parseInt(pointsPerNoball);
          overTotal.extras += parseInt(pointsPerNoball);
        } else {
          extras += parseInt(ball.runs);
          overTotal.extras += parseInt(ball.runs);
        }
      }
    }
    overData.push(overTotal);
  }
  return { total, extras, overData };
};

export const getBatsmenScore = (match, teamId) => {
  if (match.config) {
    let inning = match.config.firstInnningBat === teamId ? 1 : 2;
    let score = {};
    let shots = {};
    let boundaries = {};
    let sixes = {};
    let balls = {};
    let inningData = match.matchData["inning" + inning];
    for (let i = 0; i < inningData.length; i++) {
      for (let j = 0; j < inningData[i].balls.length; j++) {
        let ball = inningData[i].balls[j];
        if (ball.runs !== "?") {
          if (ball.extra === "No extras" && ball.extra !== "b") {
            if (ball.batsman) {
              if (balls[ball.batsman]) {
                balls[ball.batsman] += 1;
              } else {
                balls[ball.batsman] = 1;
              }
            }
          }
          if (ball.extra === "No extras") {
            if (ball.batsman) {
              if (score[ball.batsman]) {
                score[ball.batsman] += parseInt(ball.runs);
                if (ball.runs === "4") {
                  if (boundaries[ball.batsman]) {
                    boundaries[ball.batsman] += 1;
                  } else {
                    boundaries[ball.batsman] = 1;
                  }
                }
                if (ball.runs === "6") {
                  if (sixes[ball.batsman]) {
                    sixes[ball.batsman] += 1;
                  } else {
                    sixes[ball.batsman] = 1;
                  }
                }
              } else {
                score[ball.batsman] = parseInt(ball.runs);
              }
            }
          }
          if (ball.shot.x !== 0 && ball.shot.y !== 0) {
            if (ball.batsman) {
              if (shots[ball.batsman]) {
                score[ball.batsman].push(ball.shot);
              } else {
                score[ball.batsman] = [];
                score[ball.batsman].push(ball.shot);
              }
            }
          }
        }
      }
    }
    return { score, shots, boundaries, sixes, balls };
  } else {
    return null;
  }
};

export const getTotalShots = (match, inning) => {
  let inn = "inning" + inning;
  let shots = [];
  let inningData = match.matchData[inn];
  for (let i = 0; i < inningData.length; i++) {
    for (let j = 0; j < inningData[i].balls.length; j++) {
      let ball = inningData[i].balls[j];
      if (ball.runs !== "?") {
        if (ball.shot.x !== 0 && ball.shot.y !== 0) {
          shots.push(ball.shot);
        }
      }
    }
  }
};

export const getBowlerStat = (
  match,
  inning,
  pointsPerWide,
  pointsPerNoball
) => {
  let inn = "inning" + inning;

  let inningData = match.matchData[inn];
  for (let i = 0; i < inningData.length; i++) {
    for (let j = 0; j < inningData[i].balls.length; j++) {
      let ball = inningData[i].balls[j];
      let res = [];
      if (ball.runs !== "?") {
        if (ball.bowler) {
          let b = {};
          if (!res[ball.bowler]) {
            res[ball.bowler] = {
              runs: 0,
              wickets: 0,
              extras: 0,
              balls: 0
            };
          }
          res[ball.bowler].runs += parseInt(ball.runs);
          res[ball.bowler].balls += 1;

          if (ball.extra === "Wd") {
            res[ball.bowler].runs += pointsPerWide;
            res[ball.bowler].extras += pointsPerWide;
          }
          if (ball.extra === "nb") {
            res[ball.bowler].runs += pointsPerNoball;
            res[ball.bowler].extras += pointsPerWide;
          }
          if (ball.extra === "b") {
            res[ball.bowler].extras += pointsPerWide;
          }

          if (ball.wicket !== "No wicket" && ball.wicket !== "Run Out") {
            res[ball.bowler].extras += 1;
          }
        }
      }
    }
  }
};

export const getWickets = (match, inning) => {
  let inn = "inning" + inning;
  let inningData = match.matchData[inn];
  let wicketData = [];
  for (let i = 0; i < inningData.length; i++) {
    for (let j = 0; j < inningData[i].balls.length; j++) {
      let ball = inningData[i].balls[j];

      if (ball.runs !== "?") {
        if (ball.wicket !== "No wicket") {
          wicketData.push(ball);
        }
      }
    }
  }
  return wicketData;
};

export const totalBalls = match => {
  let info = {
    inning1: 0,
    inning2: 0
  };
  for (let m = 1; m < 3; m++) {
    let inningData = match.matchData["inning" + m];
    for (let i = 0; i < inningData.length; i++) {
      for (let j = 0; j < inningData[i].balls.length; j++) {
        let ball = inningData[i].balls[j];
        if (ball.runs !== "?") {
          if (ball.extra !== "Wd" && ball.extra !== "nb") {
            info["inning" + m] += 1;
          }
        }
      }
    }
  }
  return info;
};

export const getWinner = (
  match,
  playersPlaying,
  pointsPerWide,
  pointsPerNoball
) => {
  let inning2Wickets = getWickets(match, 2).length;
  let totalWickets = parseInt(playersPlaying) - 1;

  let firstInnningBat = match.config.firstInnningBat;
  let secondInningBat = match.teams[0];

  if (firstInnningBat === match.teams[0]) {
    secondInningBat = match.teams[1];
  }

  let inning1Score = getInningScore(match, 1, pointsPerWide, pointsPerNoball)
    .total;
  let inning2Score = getInningScore(match, 2, pointsPerWide, pointsPerNoball)
    .total;
  let totBalls = totalBalls(match);

  if (inning2Wickets >= totalWickets) {
    return firstInnningBat;
  }
  if (inning1Score > inning2Score) {
    if (
      totBalls.inning2 ===
      parseInt(match.config.ballsPerOver) * parseInt(match.config.overs)
    ) {
      return firstInnningBat;
    }
  }
  if (inning2Score > inning1Score) {
    return secondInningBat;
  }

  if (inning2Score === inning1Score) {
    if (
      totBalls.inning2 ===
      parseInt(match.config.ballsPerOver) * parseInt(match.config.overs)
    ) {
      return -1;
    }
  }

  return null;
};

export const renderPlayers = (teamId, teams, players) => {
  let team = getRealData("_id", teamId, teams);

  return team.players.map(ele => {
    return getRealData("_id", ele, players);
  });
};
