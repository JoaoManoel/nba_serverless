const axios = require('axios');

const URL = 'http://global.nba.com/wp-content/themes/nba-global/lib/proxy.php?url=http%3A//stats.nba.com/stats/internationalbroadcasterschedule?LeagueID=00&Season=2016&RegionID=11';

function getFutureGames() {
  return new Promise((resolve, reject) => {
    axios.get(URL)
      .then((response) => {
        const games = response.data.resultSets[1].CompleteGameList;
        const futureGames = games.filter((game) => {
          const gameDate = new Date(`${game.date} ${game.time}`).getTime();
          const today = new Date().getTime();
          return gameDate >= today;
        });

        resolve (futureGames)
      })
      .catch((err) => reject(err));
  });
}

module.exports.futureGames = (event, context, callback) => {
  getFutureGames()
    .then((games) => callback(null, games))
    .catch((err)   => callback(err));
};
