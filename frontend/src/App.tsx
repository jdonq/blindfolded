//import { render } from '@testing-library/react';
import React, { FC } from 'react';
import './App.css';
import {Vector2, getDistance, GameState, GameProps, ScoreboardState, ScoreBoardEntry, InfoProps} from './GameLogic';

const App:FC = () => {
  return (
    <div className='App bg-gradient-to-r from-red-300 to-green-300'>
      <div className='header'><h1 className="text-5xl font-bold underline ">Blindfolded</h1></div>
      <Game />
      <ScoreBoard />
    </div>
  )
};

class Game extends React.Component<GameProps, GameState> {

  constructor(props: GameProps) {
    super(props);
    this.state = {
      xpos: 0,
      ypos: 0,
      fields: this.initShootingFields(),
      targetField: {x: 0, y: 0},
      isDataLoaded: false,
      infoText: "",
      ammo: 10,
      score: 0,
      disableButton: false,
    };

    this.handleRangeChange = this.handleRangeChange.bind(this);
  }

  componentDidMount() {
    fetch("/api/GenValues")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                targetField: json,
                isDataLoaded: true
            });
        })
  }

  handleRangeChange(value: string, isX: boolean) {
    if(isX) this.setState({xpos: parseFloat(value)});
    else this.setState({ypos: parseFloat(value)});
  }

  updateGame(value: Number){

    let text = "";

    if(this.state.ammo <= 0){
      this.setState({disableButton: true});
      text = "No more ammo";
      this.setState({infoText: text});
    } else {

      let pos: number = this.state.xpos * 10 + this.state.xpos % 100 + this.state.ypos;
      let cfields = this.state.fields;

      if(cfields[pos] != "") {
        text = "You already shot at this position!";
        this.setState({infoText: text});
        return;
      } else {
        cfields[pos] = "bg-rose-800";
      }
      
      this.setState({ammo: this.state.ammo - 1});
      //this.setState({fields: 0});

      if(value <= 0) {
        text = "You hit a target!";
        this.setState({score: this.state.score + 5000});
      } else if(value <= 2) {
        text = "Close!, your target is " + value + " units away";
        this.setState({score: this.state.score + 500});
      } else {
        text = "Too far, your target is " + value + " units away";
        this.setState({score: this.state.score + 100});
      }
    }

    this.setState({infoText: text});
  }

  initShootingFields(): string[] {
    let vals: string[] = [];
    
    for (let i = 0; i < 122; i++) {
      vals.push("");
    }

    return vals;
  }

  render() {

    const initPos: Vector2 = {x: this.state.xpos, y: this.state.ypos};
    const targetPos: Vector2 = this.state.targetField;

    if(!this.state.isDataLoaded) {
      return <h1>Loading Data</h1>;
    }

    return (
      <div className='Game bg-gradient-to-r from-blue-400 to-green-500 mx-20 pb-32 pt-20 mt-10 border-2 rounded-md shadow-xl'>
        <div className='GameText pl-12 font-semibold text-2xl'>Ammo: {this.state.ammo}</div>
        <div className='GameText pl-12 font-semibold text-2xl'>Score: {this.state.score}</div>
        <h2 className='font-semibold'>{this.state.infoText}</h2>
        <InfoWindow vals={this.state.fields} />
        <input type="range" id="posX" name="posX"
           min="0" max="10" value={this.state.xpos} onChange={(rc: React.ChangeEvent<HTMLInputElement>) => {this.handleRangeChange(rc.target.value, true)}}/>
        <label>X{this.state.xpos}</label>
        <input type="range" id="posY" name="posY"
           min="0" max="10" value={this.state.ypos} onChange={(rc: React.ChangeEvent<HTMLInputElement>) => {this.handleRangeChange(rc.target.value, false)}}/>
        <label>Y{this.state.ypos}</label>
        <div className='mt-10'>
          <input type='button' disabled={this.state.disableButton} className='font-semibold bg-gradient-to-r from-red-400 to-yellow-500 border-2 hover:from-red-400 hover:to-red-800 rounded-md p-2 shadow-xl' value='Shoot!!!' onClick={() => this.updateGame(getDistance(initPos, targetPos))} />
        </div>
      </div>
    )
  }
}

class ScoreBoard extends React.Component<GameProps, ScoreboardState> {

  constructor(props: GameProps) {
    super(props);

    this.state = {
        items: [],
        isDataLoaded: false
    };
  }

  componentDidMount() {
    fetch("/api/Scoreboard")
        .then((res) => res.json())
        .then((json) => {
            this.setState({
                items: json,
                isDataLoaded: true
            });
        })
  }

  render() {

    const { isDataLoaded, items } = this.state;
        if (!isDataLoaded) return <div><h1> LoadingData.... </h1></div>;

    return (
      <div className='Scoreboard bg-gradient-to-r from-green-400 to-blue-500 mx-20 mt-20 border-2 rounded-md shadow-xl'>
        <h1 className='font-sans text-4xl font-semibold pt-6 pb-12'> Scoreboard </h1> <ol className='pb-12'> {
                
                items.map((item) => ( 
                    <li className='font-mono text-2xl'>
                      Player: <span className='text-rose-700'>{ item.name }</span>, 
                      Score: <span className='text-amber-200'>{ item.score }</span> 
                    </li>
                ))
            }</ol>
      </div>
    );
  }
}

class InfoWindow extends React.Component<InfoProps, ScoreboardState> {
  
  RenderTargetBox(row: number) {
    let cssString = "px-2 min-w-max border-2 ";
    
    return (
      <div>
          <span className={cssString + this.props.vals[row]}></span>
          <span className={cssString + this.props.vals[row + 1]}></span>
          <span className={cssString + this.props.vals[row + 2]}></span>
          <span className={cssString + this.props.vals[row + 3]}></span>
          <span className={cssString + this.props.vals[row + 4]}></span>
          <span className={cssString + this.props.vals[row + 5]}></span>
          <span className={cssString + this.props.vals[row + 6]}></span>
          <span className={cssString + this.props.vals[row + 7]}></span>
          <span className={cssString + this.props.vals[row + 8]}></span>
          <span className={cssString + this.props.vals[row + 9]}></span>
          <span className={cssString + this.props.vals[row + 10]}></span>
      </div>
    )
  }
  
  render() {
    return(
      <div className='InfoWindow w-80 h-80 mt-6 mb-6 mx-auto px-0 border-2 rounded-md'>
        <div className='mb-10'></div>
        { this.RenderTargetBox(0) }
        { this.RenderTargetBox(11) }
        { this.RenderTargetBox(22) }
        { this.RenderTargetBox(33) }
        { this.RenderTargetBox(44) }
        { this.RenderTargetBox(55) }
        { this.RenderTargetBox(66) }
        { this.RenderTargetBox(77) }
        { this.RenderTargetBox(88) }
        { this.RenderTargetBox(99) }
        { this.RenderTargetBox(110) }
      </div>
    )
  }
}

export default App;