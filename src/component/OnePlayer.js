import React, { Component } from 'react'
import '../style/dashboard.css';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import StarIcon from '@material-ui/icons/Star';
import { ThreeSixty } from '@material-ui/icons';

export default class OnePlayer extends Component {
    constructor(props){
        super();
        this.state={
            guess_num : undefined,
            random_number : undefined,
            hint:'',
            history:[],
            lifeline:7,
            textboxmessage : 'visible',
            score:0
        }
        this.checkNumber = this.checkNumber.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.showLifeline = this.showLifeline.bind(this);
        
    }
    componentDidMount(){
        var random_n = Math.floor((Math.random()*100)+1);
        this.setState({
            random_number:random_n
        })
        
    }
    checkNumber() {
        if(this.state.guess_num==this.state.random_number)
        {
            this.setState({hint:'find'})
            var lifel = this.state.lifeline;
            if(lifel == 7)
            {
                this.setState({
                    score:this.state.score+50
                })
            }
            else if(lifel == 6)
            {
                this.setState({
                    score:this.state.score+45
                })
            }
            if(lifel == 5)
            {
                this.setState({
                    score:this.state.score+40
                })
            }
            else if(lifel == 4)
            {
                this.setState({
                    score:this.state.score+35
                })
            }
            else if(lifel == 3)
            {
                this.setState({
                    score:this.state.score+30
                })
            }
            else if(lifel == 2)
            {
                this.setState({
                    score:this.state.score+20
                })
            }
            else
            {
                this.setState({
                    score:this.state.score+10
                })
            }
            this.setState({
                textboxmessage : 'numberfind'
            })
        }
        else if(this.state.guess_num>=this.state.random_number)
        {
            this.setState({
                hint:'high',
                lifeline: this.state.lifeline-1
            })
            if(this.state.lifeline == 1)
            {
                this.setState({
                    textboxmessage:'lifelineover'
                })
            }
            console.log("number is -",this.state.random_number)
        }
        else
        {
            this.setState({
                hint:'low',
                lifeline:this.state.lifeline-1
            })
            if(this.state.lifeline == 1)
            {
                this.setState({
                    textboxmessage:'lifelineover'
                })
            }
        }
        this.setState({
            history:[...this.state.history,this.state.guess_num]
        })
    }
    restartGame()
    {
        var random_n = Math.floor((Math.random()*100)+1);
        this.setState({
            random_number:random_n
        })
        this.setState({
            hint:'',
            history:[],
            lifeline:7,
            textboxmessage:'visible'
        })
    }
    showLifeline()
    {
        var alllifeline = [];
        for (let i = 1; i <= this.state.lifeline; i++) {
            alllifeline.push(<StarIcon  fontSize="large" />)
        }
        return alllifeline;
    }
    render() {
        return (
            <div>
                <div className="perfomance">
                    <div className="in-perfo">
                        <div className="score">
                            <span>Score:-{this.state.score}</span> 
                        </div>
                        <div className="life-line">
                            <span>LifeLine:-</span>
                            <div className="star">
                               {this.showLifeline()}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='dashboard' >
                    <div className='top-content'> 
                        <span>Hello User Guess The Number 1 to 100;</span>
                    </div>
                    <div className='main-box'>
                        <div className='input-box'>
                            {this.state.textboxmessage == 'visible' &&
                                <input type="text" placeholder='Please guess the number....' onChange={(e)=>this.setState({guess_num:e.target.value})}  />
                            }
                            {this.state.textboxmessage == 'lifelineover' &&
                                <input type="text" placeholder='now you have not any lifeline click restart button....' readOnly />
                            }
                            {this.state.textboxmessage == 'numberfind' &&
                                <input type="text" placeholder='awesome job you find it.click restart button....' readOnly />
                            }
                        </div>
                        <div className='button-box'>
                            <div className='check-button'>
                                <button onClick={()=>this.checkNumber()}>Check</button>
                            </div>
                            <div className='restart-button'>
                                <button onClick={()=>this.restartGame()}>Restart</button>
                            </div>
                        </div>
                    </div>
                    <div className='hint-box'>
                        {this.state.hint == 'find' &&
                            <div className="find">
                                <div className="find-logo">
                                    <InsertEmoticonIcon color="white" fontSize="large"/>
                                </div>
                                <div className="find-text">
                                    <span>awesome job you find it.kindly click on restart button...</span>
                                </div>
                            </div>
                        }
                        {this.state.hint == 'high' &&
                            <div className="high">
                                <div className="high-logo">
                                    <SentimentVeryDissatisfiedIcon color="white" fontSize="large"/>
                                </div>
                                <div className="high-text">
                                    <span> soryy its to high try again...</span>
                                </div>
                            </div>
                        }
                        {this.state.hint == 'low' &&
                            <div className="low">
                                <div className="low-logo">
                                    <SentimentVeryDissatisfiedIcon color="white" fontSize="large"/>
                                </div>
                                <div className="low-text">
                                    <span> soryy its to low try again...</span>
                                </div>                        
                            </div>
                        }
                    </div>
                    <div className='history-box'>
                        <table class="table table-dark">
                            <tbody>
                                {this.state.history.map((num,index)=>{
                                    return(
                                        <tr>
                                            <td>You guess - {num}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>    
        )
    }
}
