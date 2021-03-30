//Задача. Написать map c помощью reduce

const sourceArray = [{
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

let mediaNames = myMap(sourceArray, (media) => {
    return media.name
});

console.log(mediaNames);

let allEpisodesCount = sourceArray.reduce((accumulator, media) => {
    let episodesCount = 0;
    if (media.type === 'tvshow') {
        episodesCount = media.episodes.length;
    }
    return accumulator + episodesCount;
}, 0);

console.log('allEpisodesCount = ' + allEpisodesCount); //будет выведено 5

let allEpisodesCountbyMap = myReduce(sourceArray, (media) => { 
    let episodesCount = 0;
    if (media.type === 'tvshow') {
        episodesCount = media.episodes.length;
    }
    return accumulator + episodesCount;
});

console.log('allEpisodesCountbyMap = ' + allEpisodesCountbyMap)

function myMap(array, func) {
    const resultArray = [];
    const reducer = (accumulator, currentValue) => accumulator.concat(func(currentValue));
    return array.reduce(reducer, resultArray);
}

function myReduce(array, func) {
    /*
        Думаю, что реализовать reduce через map невозможно, так как map обязательно 
        вернет массив с количеством элементов равным начальному массиву, в то время 
        как reduce должен вернуть один элемент.
        К тому же для работы reduce с массивом объектов обязательным условием являтся наличие 
        параметра initialValue, который не предполагается сигнатурой метода map и без которго 
        мы не можем знать какой тип значения ожидается на выходе предполагаемой работы reduce
    */
}