import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Game} from 'src/app/model/Game';
import {GameService} from 'src/app/services/game.service';
import {Router, ActivatedRoute} from '@angular/router';
import {RatingService} from 'src/app/services/rating.service';
import {Rating} from 'src/app/model/Rating';
import {AuthenticationService} from 'src/app/services/authentication.service';
import {UserService} from 'src/app/services/user.service';
import * as jwt_decode from 'jwt-decode';
import {UserGameService} from 'src/app/services/user-game.service';
import {User} from 'src/app/model/User';
import {empty} from 'rxjs';
import {ResponsePageList} from 'src/app/model/ResponsePageList';
import {UserData} from 'src/app/model/UserData';
import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {
    id: string;
    game: Game;
    developers: any;
    averageStars: number;
    title: any;
    rating: Rating;
    decoded: any;
    currentUser: UserData;
    ratingValue: any;
    descriptionValue: any;
    paginatedRatings: ResponsePageList<Rating>;
    paginatedGames: ResponsePageList<Game>;
    ratings: any;
    suggestedGames: any;
    p: any;
    private pg: any;
    private loading: boolean;
    @Output() showRented: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private route: ActivatedRoute, private router: Router,
                private gameService: GameService, private ratingService: RatingService,
                private authenticationService: AuthenticationService, private userGameService: UserGameService,
                private userService: UserService, private notifications: ToastrService) {
        // this.id = this.router.getCurrentNavigation().extras.state;
        this.route.queryParams.subscribe(params => {
            this.id = params.gameId;
        });
    }

    ngOnInit(): void {
        // this.id = history.state;
        this.gameService.getGameById(this.id).subscribe(p => {
            this.game = p;
        });

        const token = this.authenticationService.getToken();
        this.decoded = jwt_decode(token);
        this.userService.getUserByEmail(this.decoded.sub).toPromise()
            .then(t => {
                this.currentUser = t;
            });
        this.descriptionValue = '';
        this.initListOfGames();
        this.initListOfRatings();

    }

    changeGame(id: string) {
        this.id = id;
        this.router.navigate(['/game-details'], {queryParams: {gameId: id}});
        this.gameService.getGameById(id).toPromise().then(p => {
            this.game = p;
        });
        this.initListOfGames();
        this.initListOfRatings();

    }

    printValue() {
        const today = new Date();
        const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.rating = new Rating(this.ratingValue, this.descriptionValue, this.currentUser, new Date());
        this.ratingService.addRatings(this.rating, this.id).subscribe(t => {
            this.gameService.getGameById(this.id).subscribe(p => {
                this.game = p;
                this.initListOfRatings();
            });
            this.initListOfRatings();
        });
    }

    initListOfRatings() {
        this.ratingService.getPaginatedRatings('id', 'ASC', '0', '3', this.id).subscribe(p => {
            this.paginatedRatings = p;
            this.ratings = this.paginatedRatings.pageList;
        });
    }

    pageGridChanged(event) {
        this.p = event;
        this.ratingService.getPaginatedRatings('id', 'ASC', (this.p - 1).toString(), '3', this.id).subscribe(p => {

            this.paginatedRatings = p;
            this.ratings = this.paginatedRatings.pageList;
        });
    }

    initListOfGames() {

        this.gameService.getSameCategoryGames('id', 'ASC', '0', '4', this.id).subscribe(p => {
            this.paginatedGames = p;
            this.suggestedGames = this.paginatedGames.pageList;
        });
    }

    async rent() {
        this.loading = true;
        const token = this.authenticationService.getToken();
        this.decoded = jwt_decode(token);
        const currentUser = await this.userService.getUserByEmail(this.decoded.sub).toPromise();

        // get current date and add maximum-period days
        const today = new Date();
        const maxRentDays = 10;

        today.setDate(today.getDate() + maxRentDays);

        this.userGameService.addUserGame(currentUser, this.game, today.toISOString().slice(0, 10)).subscribe(
            value => {
                this.showSuccess();
                this.showRented.emit(true);
                this.loading = false;

            }, error => {
                this.showError(error);
                this.loading = false;
            }
        );
    }

    showSuccess() {
        this.notifications.success(this.game.title + ' was rented successfully!', 'Enjoy!');
    }

    showError(error: string) {
        this.notifications.error(error, 'Error!');
    }

}
