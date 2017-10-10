import {Component, OnInit} from "@angular/core";
import {VotingService} from "../../core/services/voting.service";
import {SKTweet} from "../../model/tweet.model";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'sk-vote',
    templateUrl: 'vote.component.html',
    styleUrls: ['vote.component.scss']
})
export class VoteComponent implements OnInit {

    /**
     * The tweet that should be voted on.
     */
    tweetForVoting: SKTweet;

    /**
     * True if the cool-down (de-bounce) is enabled.
     * Used to prevent accidental clicks.
     */
    coolDown: boolean = false;

    constructor(private votingService: VotingService) {

    }

    ngOnInit(): void {
        this.loadNewTweet();
    }

    /**
     * Loads a new tweet from the backend to be voted on.
     */
    private loadNewTweet(): void {
        this.votingService.getTweetForVoting()
            .then(tweet => {
                this.tweetForVoting = tweet;

                // Enable cool-down for 600ms.
                this.coolDown = true;
                Observable.timer(600).subscribe(() => this.coolDown = false)
            })
            .catch(err => console.error(err))
    }

    /**
     * Votes for shill.
     */
    public voteShill(): void {
        this.votingService.castVote({shill: true}, this.tweetForVoting.id)
            .then(() => this.loadNewTweet())
            .catch(err => console.error(err))
    }

    /**
     * Votes for kill.
     */
    public voteKill(): void {
        this.votingService.castVote({kill: true}, this.tweetForVoting.id)
            .then(() => this.loadNewTweet())
            .catch(err => console.error(err))
    }

    /**
     * Votes for wrong coin.
     */
    public voteWrong(): void {
        this.votingService.castVote({wrong: true}, this.tweetForVoting.id)
            .then(() => this.loadNewTweet())
            .catch(err => console.error(err))
    }

}