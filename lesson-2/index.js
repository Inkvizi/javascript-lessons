const media = [{
    name: 'Шерлок',
    type: 'tvshow',
    year: '2016',
    episodes: [{
        name: 'Знакомство с Шерлоком',
        episodeNumber: '10'
    }, {
        name: 'Собака Баскервили',
        episodeNumber: '1'
    }]
}, {
    name: 'Шрек',
    year: '2014',
    type: 'movie'
}, {
    name: 'Декстер',
    type: 'tvshow',
    year: '2010',
    episodes: [{
        name: 'Побег',
        episodeNumber: '2'
    }, {
        name: 'Жизнь после',
        episodeNumber: '3'
    }, {
        name: 'Первая история декстера',
        episodeNumber: '1'
    }]
}, 
];

const filteredMedia = media.filter(item => item.type === 'tvshow');
filteredMedia.sort(function (tvshowLeft, tvshowRight) {
    if (tvshowLeft.year > tvshowRight.year) {
      return 1;
    }
    if (tvshowLeft.year < tvshowRight.year) {
      return -1;
    }
    return 0;
  });
let episodesList = [];
filteredMedia.forEach(media => {
    sortedEpisodes = media.episodes.sort(function (episodeLeft, episodeRight) {
        if (episodeLeft.episodeNumber > episodeRight.episodeNumber) {
          return 1;
        }
        if (episodeLeft.episodeNumber < episodeRight.episodeNumber) {
          return -1;
        }
        return 0;
      });
      episodesList = episodesList.concat(sortedEpisodes.map(episode => {
        return episode.name;                                   
    }))
})

console.log(episodesList);
  

// список всех эпизодов по порядку
// 1 - получить все tv show
// 2 - episodes // sort
// 3 - ...
['Знакомство с Шерлоком', 'Собака Баскервили', 'Первая история декстера', 'Побег', 'Жизнь после']