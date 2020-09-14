import React, {useState} from "react"
import {Button, ButtonGroup, ButtonToolbar} from "reactstrap"
import "./components.css"

const Nav = (props) => {

    return(
        <div className='nav'>
            <h1 className='header'>Austin's game of life</h1>
            <div className='frame'>
                  <button class="custom-btn btn-3"
                    onClick={() => {
                        props.setRunning(!props.running)
                        if(!props.running) {
                            props.runningRef.current = true;
                            props.runSimulation()
                        }
                    }}>
                        {props.running ? 'stop' : 'start'}
                    </button>

                    <button class="custom-btn btn-3"
                    onClick={() => {
                        props.setGrid(props.generateEmptyGrid())
                    }}
                    >
                        clear
                    </button>

                    <button class="custom-btn btn-3"
                    onClick={() => {
                        const rows = [];
                        for (let i = 0; i < props.numRows; i++) {
                            rows.push(
                                Array.from(Array(props.numCols), () => Math.random() > 0.7 ? 1 : 0)
                                );
                            }
                            props.setGrid(rows);
                        }}
                        >
                        random
                    </button>

                    <button class="custom-btn btn-3" onClick={() => props.setSimulationSpeed(1200)}>Slow</button>
                    <button class="custom-btn btn-3" onClick={() => props.setSimulationSpeed(600)}>Medium</button>
                    <button class="custom-btn btn-3" onClick={() => props.setSimulationSpeed(200)}>Fast</button>

                <button class="custom-btn btn-3" 
                    onClick={() => {
                        if(!props.running) {
                            props.setSimulationSpeed(1)
                            props.runningRef.current = true;
                            props.runSimulation()
                        }
                    }}>Step</button>

            </div>
        </div>
    )
}

export default Nav