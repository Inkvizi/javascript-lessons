let windowWidth = window.innerWidth;
window.onresize = function () {
    if (this.innerWidth !== windowWidth) {
        windowWidth = this.innerWidth;
        initScroll();
    }
}

class PageModel {
    _houses;
    _houseList;
    _scrollCurrent;
    _housesCurrentLeft
    constructor () {
        this._houses = document.getElementsByClassName('houses')[0];
        this._scrollCurrent = document.getElementsByClassName('navigation__scroll__current')[0];
        this._houseList = document.getElementsByClassName('house');
    }
    setScrollCurrentWidth(width) {
        this._scrollCurrent.style.width = width;
    }
    getHousesPaddingLeft () {
        return parseInt(window.getComputedStyle(this._houses, null).getPropertyValue('padding-left'), 10);
    }
    getHousesWidth () {
        return parseInt(window.getComputedStyle(this._houses, null).getPropertyValue('width'), 10);
    }
    getHousesCurrentLeftPosition() {
        return parseInt(window.getComputedStyle(this._houses, null).getPropertyValue('left'), 10)
    }
    getHouseWidth() {
        return parseInt(window.getComputedStyle(this._houseList[0], null).getPropertyValue('width'), 10);
    }
    getHouseCount() {
        return this._houseList.length;
    }
    setHousesLeft(leftValue) {
        this._houses.style.left = leftValue; 
    }
}

class Carousel {
    _visibleAreaWidth;
    _maxTernCounter;
    _ternCounter;

    ternLeft() {
        this._housesCurrentLeftPosition = this._housesCurrentLeftPosition - this._visibleAreaWidth;
        pageModel.setHousesLeft(this._housesCurrentLeftPosition);
        this._ternCounter = this._ternCounter + 1;
    }

    ternRight() {
        this._housesCurrentLeftPosition = this._housesCurrentLeftPosition + this._visibleAreaWidth;
        pageModel.setHousesLeft(this._housesCurrentLeftPosition);
        this._ternCounter = this._ternCounter - 1;
    }
    canTernLeft() {
        return this._ternCounter > 0;
    }
    canTernRight() {
        return (this._maxTernCounter > this._ternCounter);
    }

    getScrollCurrentWidth() {
        return this._scrollCurrentWidth;
    }
    getHouses() {
        return this._houses;
    }
    getVisibleAreaWidth() {
        return this._visibleAreaWidth;
    }
    setScrollCurrentWidth(width) {
        this._scrollCurrentWidth = width;
    }
    initHousesCurrentLeftPosition(position) {
        this._housesCurrentLeftPosition = position; 
    }
    initvisibleAreaWidth(width) {
        this._visibleAreaWidth = width;
    }
    initHouses(houses) {
        this._houses = houses;
    }
    initMaxTernCounter(value) {
        this._maxTernCounter = value;
        this._ternCounter = 0;
    }
};

let carousel = new Carousel();
let pageModel = new PageModel(); 

initScroll();
initButtons();

function initScroll() {
    fillScrollParams();
    pageModel.setScrollCurrentWidth(carousel.getScrollCurrentWidth());
}

function fillScrollParams() { 
    let housesCount = pageModel.getHouseCount();
    let houseWidth = pageModel.getHouseWidth();
    carousel.initHouses(); 
    let housesPaddingLeft = pageModel.getHousesPaddingLeft();
    let housesWidth = pageModel.getHousesWidth();
    carousel.initHousesCurrentLeftPosition(pageModel.getHousesCurrentLeftPosition());
    carousel.initvisibleAreaWidth(housesWidth - housesPaddingLeft);
    let housesOnPageCount = (carousel.getVisibleAreaWidth()) / houseWidth;
    let scrollWidth = document.getElementsByClassName('navigation__scroll')[0].clientWidth;
    carousel.setScrollCurrentWidth(Math.round(scrollWidth / housesCount * housesOnPageCount));
    carousel.initMaxTernCounter(Math.round(housesCount / housesOnPageCount) + 1);
}

function initButtons() {
    let buttonNext = document.getElementsByClassName('navigation__button-next')[0];
    let buttonPrev = document.getElementsByClassName('navigation__button-prev')[0];
    checkButtonEnabled(buttonNext, carousel.canTernRight());
    checkButtonEnabled(buttonPrev, carousel.canTernLeft());
    buttonNext.addEventListener('click', (event) => {
        carousel.ternLeft();
        checkButtonEnabled(buttonNext, carousel.canTernRight());
        checkButtonEnabled(buttonPrev, carousel.canTernLeft());
        console.log('click buttonNext');
    });
    buttonPrev.addEventListener('click', (event) => {
        carousel.ternRight();
        checkButtonEnabled(buttonNext, carousel.canTernRight());
        checkButtonEnabled(buttonPrev, carousel.canTernLeft());
        console.log('click buttonPrev');
    });
}

function checkButtonEnabled(button, condition) {
    if (condition) {
        button.removeAttribute('disabled');
    }
    else {
        button.setAttribute('disabled', 'disabled');
    }
}