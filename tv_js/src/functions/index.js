/**
 * Get actual team members data
 * @param {Object} team Team object that needed to be populated with team members
 * @param {Array} players array of all the players
 * @returns {Object} object injected teamMembers key with actual player data
 */
export const getTeamMembers = (team, players) => {
  let teamMembers = [];
  for (let i = 0; i < team.players.length; i++) {
    for (let j = 0; j < players.length; j++) {
      if (team.players[i] === players[j]._id) {
        teamMembers.push(players[j]);
      }
    }
  }

  return {
    ...team,
    teamMembers
  };
};

/**
 * Returns the first search object found according to search parameters in the array
 * @param {String} key key of the element used to search
 * @param {*} value value of the key
 * @param {*} dataArr array of datato be searched
 */
export const getRealData = (key, value, dataArr) => {
  for (let i = 0; i < dataArr.length; i++) {
    if (dataArr[i][key] === value) {
      return dataArr[i];
    }
  }
  return null;
};
