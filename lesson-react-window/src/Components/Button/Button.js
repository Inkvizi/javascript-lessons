import { Component } from 'react';
import React from 'react';
import styles from './Button.module.css';

const minDistanceForRun = 30;

export class Button extends Component {
    constructor (props) {
        super(props);
        this.parent = {
            parentX: 0,
            parentY: 0,
            parentWidth: 0,
            parentHeight: 0
        }
        this.myRef = React.createRef();
        this.handleMouseMove = this.handleMouseMove.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        this.parent = {
            parentX: nextProps.parentX,
            parentY: nextProps.parentY,
            parentWidth: nextProps.parentWidth,
            parentHeight: nextProps.parentHeight
        };
        return this.handleMouseMove(nextProps.x, nextProps.y);
    }

    handleMouseMove(x, y) {
        if (this.props.isTrue === "true") {
            let button = this.myRef.current;
            return false;
        }
        
        if (this.checkRunCondition(x, y)) {  
            let newPosition = this.calculateNewCoordinates(x, y);
            let button = this.myRef.current;
            button.style.offsetLeft = newPosition.newX;
            button.style.offsetTop = newPosition.newY;
            //console.log(button.style);
            return true;
        } 
        return false;
    }

    checkRunCondition (x, y) {
        if ((Math.abs(x - this.myRef.current.offsetLeft) < minDistanceForRun) && 
            (Math.abs(y - this.myRef.current.offsetTop) < minDistanceForRun)
        ) {
            return true;
        }
        return false;
    }

    calculateNewCoordinates(x, y) {
        let differenceDistanceX = this.myRef.current.offsetLeft - x;
        let newX = differenceDistanceX > 0 ? 
          this.myRef.current.offsetLeft + minDistanceForRun + differenceDistanceX : 
          this.myRef.current.offsetLeft - minDistanceForRun + differenceDistanceX;
        if (newX < this.parent.parentX) {
            newX = this.parent.parentX + this.parent.parentWidth - this.myRef.current.clientWidth;
        } else if (newX >  this.parent.parentX + this.parent.parentWidth - this.myRef.current.clientWidth) {
            newX = this.parent.parentX;
        }
        let differenceDistanceY = this.myRef.current.offsetTop - y;
        let newY = differenceDistanceY > 0 ? 
          this.myRef.current.offsetTop + minDistanceForRun + differenceDistanceY : 
          this.myRef.current.offsetTop - minDistanceForRun + differenceDistanceY;
        if (newY < this.parent.parentY) {
            newY = this.parent.parentY + this.parent.parentTop - this.myRef.current.clientHeight;
        } else if (newY >  this.parent.parentY + this.parent.parentTop - this.myRef.current.clientHeight) {
            newY = this.parent.parentY;
        }
        return {newX, newY};
    }
    
    getCaption (isTrue) {
        if (isTrue === "true") {
            return "Да, конечно!";
        }
        else {
            return "Не очень";
        }
    }

    render () {
        // if (this.myRef!==null&&this.myRef.current!==null) {
        //     return (
        //         <div className={styles._} ref={this.myRef} style={this.myRef.current.style}>
        //             <button className={styles.button} type="button">{this.getCaption(this.props.isTrue)}</button>
        //         </div>
        //     );    
        // }
        return (
            <div className={styles._} ref={this.myRef}>
                <button className={styles.button} type="button">{this.getCaption(this.props.isTrue)}</button>
            </div>
        );
    }
}