isTuesday(new Date(1958, 8, 2));
countMillisecondsBetweenTwoDates(new Date(2021, 03, 31), new Date(2021, 03, 31, 17, 20));

function isTuesday(dateForTest) {
    let dayOfWeek = dateForTest.getDay();
    if (dayOfWeek === 2) { 
        console.log("2 сентября 1958 года - вторник")
    }
    else {
        console.log("2 сентября 1958 года - НЕ вторник")
    }
}

function countMillisecondsBetweenTwoDates(dateLeft, dateRight) {
  console.log("Количество миллисекунд равно = " + (dateRight - dateLeft));
}