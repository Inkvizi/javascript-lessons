import styles from './Window.module.css';
import {Button} from '../Button/Button';
import { Component } from 'react';
import React from 'react';

export class Window extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mouseX: 0,
            mouseY: 0,
            x: 0,
            y: 0,
            width: 0,
            height: 0
        }
        this.myRef = React.createRef();    
    }

    handleMouseMove(event) {
        event.preventDefault();
        this.setState({
            mouseX: event.clientX,
            mouseY: event.clientY,
            x: this.myRef.current.offsetLeft,
            y: this.myRef.current.offsetTop,
            width: this.myRef.current.clientWidth,
            height: this.myRef.current.clientHeight
        })
    }

    render() {
        return (
            <div onMouseMove={(event) => this.handleMouseMove(event)} className={styles._} ref={this.myRef}>
                <div className={styles.label}>Вам нравится курс по JavaScript?</div>
                <div className={styles.bottomGroup}>
                    <Button 
                        isTrue="true" 
                        x={this.state.mouseX} 
                        y={this.state.mouseY} 
                        parentX={this.state.x}
                        parentY={this.state.y}
                        parentWidth={this.state.width}
                        parentHeigth={this.state.height}
                    ></Button>
                    <Button
                        isTrue="" 
                        x={this.state.mouseX} 
                        y={this.state.mouseY} 
                        parentX={this.state.x}
                        parentY={this.state.y}
                        parentWidth={this.state.width}
                        parentHeigth={this.state.height} 
                    ></Button>
                </div>
            </div>
        ) 
    }
} 