var axios = require('axios');

function searchSuggestions(input){
  return axios.get('https://suggest.svc.nhl.com/svc/suggest/v1/minactiveplayers/' + input + '/99999' );
}

function playerDetails(id){
  return axios.get('http://statsapi.web.nhl.com/api/v1/people/' + id + '?expand=person.stats&stats=yearByYear' );
}

function getTeamGameLog(id) {
  return axios.get('https://statsapi.web.nhl.com/api/v1/schedule?site=en_nhlCA&startDate=2018-03-05&endDate=2018-05-30&teamId=' + id + '&expand=schedule');
}

var helpers = {
  getPlayersFromSearchSuggestions: function(input){
    return axios.all( [searchSuggestions(input)] )
      .then(
        (response) => { console.log(response); return {suggestions: response[0]['data']['suggestions']} },
        //(error) => { console.log(error) }
       )
  },
  getPlayerDetails: function(id){
    return axios.all( [playerDetails(id)] )
      .then(
          (response) => {
            //console.log(response);
            return {
                id: response[0]['data']['people'][0]['id'],
                fullName: response[0]['data']['people'][0]['fullName'],
                primaryPosition: response[0]['data']['people'][0]['primaryPosition']['code'],
                primaryNumber: response[0]['data']['people'][0]['primaryNumber'],
                currentTeamName: response[0]['data']['people'][0]['currentTeam']['name'],
                currentTeamId: response[0]['data']['people'][0]['currentTeam']['id'],
                stats: response[0]['data']['people'][0]['stats'][0]['splits']
            } 

          }
       )
  },
  getTeamSchedule: function(id){
    return axios.all( [getTeamGameLog(id)] )
      .then(
          (response) => {
            //console.log(response);
            return {
                dates: response[0]['data']['dates']
            } 

          }
       )
  }
}

module.exports = helpers;