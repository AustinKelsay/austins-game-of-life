import React, {useState} from "react"
import {Button, ButtonGroup, ButtonToolbar} from "reactstrap"
import "./components.css"

const Nav = (props) => {

    return(
        <div className='nav'>
            <h1 className='header'>Austin's game of life</h1>
            <div className='button-container'>
                  <button className="glow-on-hover"
                    onClick={() => {
                        props.setRunning(!props.running)
                        if(!props.running) {
                            props.runningRef.current = true;
                            props.runSimulation()
                        }
                    }}>
                        {props.running ? 'stop' : 'start'}
                    </button>

                    <button className="glow-on-hover"
                    onClick={() => {
                        props.setGrid(props.generateEmptyGrid())
                    }}
                    >
                        clear
                    </button>

                    <button className="glow-on-hover"
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

                    <button className="glow-on-hover" onClick={() => props.setSimulationSpeed(1200)}>Slow</button>
                    <button className="glow-on-hover" onClick={() => props.setSimulationSpeed(600)}>Medium</button>
                    <button className="glow-on-hover" onClick={() => props.setSimulationSpeed(200)}>Fast</button>

                <button className="glow-on-hover" 
                    onClick={() => {
                        if(!props.running) {
                            props.setSimulationSpeed(1)
                            props.runningRef.current = true;
                            props.runSimulation()
                        }
                    }}>Step</button>
                    <p>Generation count: {props.count}</p>
                    <p>At the heart of this game are four rules that determine if a cell is live or dead. All depend on how many of that cell's neighbors are alive.
                        <br />
                        Births: Each dead cell adjacent to exactly three live neighbors will become live in the next generation.
                        <br />
                        Death by isolation: Each live cell with one or fewer live neighbors will die in the next generation.
                        <br />
                        Death by overcrowding: Each live cell with four or more live neighbors will die in the next generation.
                        <br />
                        Survival: Each live cell with either two or three live neighbors will remain alive for the next generation.
                        </p>

            </div>
        </div>
    )
}

export default Nav