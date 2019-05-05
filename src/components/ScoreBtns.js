import React, { Component } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap'
import { API } from 'aws-amplify';
export default class ScoreBtns extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upvoted: false,
            downvoted: false,
            score: this.props.srcScore
        };

    }

    // update the item's score in the metadata DynamoDB table
    async updateScore(newScore) {
        await API.put('api', '/items',
            {
                body: { id: this.props.srcID, updatedScore: newScore }
            });
    }

    
    handleUpvote = () => {
        let oldScore = this.props.srcScore;
        let newScore = oldScore + 1;
        if (!this.state.upvoted) {
            this.setState({
                upvoted: true,
                downvoted: false,
                score: newScore
            });
            this.updateScore(newScore);
        }
        else {
            this.setState({
                upvoted: false,
                downvoted: false,
                score: oldScore
            });
            this.updateScore(oldScore);
        }
    }

    handleDownvote = () => {
        let oldScore = this.props.srcScore;
        let newScore = oldScore - 1;
        if (!this.state.downvoted) {
            this.setState({
                upvoted: false,
                downvoted: true,
                score: newScore
            });
            this.updateScore(newScore);
        }
        else {
            this.setState({
                upvoted: false,
                downvoted: false,
                score: oldScore
            });
            this.updateScore(oldScore);
        }
    }

    render() {
        return (
            <div className="mb-2 float-right">
                <span title="Score" className='font-weight-bold'>{this.state.score}</span>{' '}
                <ButtonGroup>
                    <Button title="Vote Up" active={this.state.upvoted} variant="light" onClick={this.handleUpvote}><i className="fas fa-chevron-up" /></Button>
                    <Button title="Vote Down" active={this.state.downvoted} variant="light" onClick={this.handleDownvote}><i className="fas fa-chevron-down" /></Button>
                </ButtonGroup>
            </div>
        )
    }
}
