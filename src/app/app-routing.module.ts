import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from './pages/paginated-games/homepage.component';
import {GameService} from './services/game.service';
import {AdminDashboardComponent} from './admin-dashboard/admin-dashboard.component';
import {AuthGuard} from './security/auth.guard';
import {GamePageComponent} from './pages/game-page/game-page.component';
import {FrontpageComponent} from './frontpage/Frontpage.component';
import {RentedGamesComponent} from './pages/rented-games/rented-games.component';
import {NotFoundPageComponent} from './pages/not-found-page/not-found-page.component';
import {paths} from './app-paths';
import {PathResolveServiceService} from './services/path-resolve-service.service';
import {AdminGuard} from './security/admin.guard';
import {RecommendedCategoriesComponent} from './pages/recommended-categories-page/recommended-categories.component';
import {TopRatedComponent} from './pages/top-rated/top-rated.component';
import {TopRentedComponent} from './pages/top-rented-games/top-rented.component';
import {RentChartComponent} from './admin-dashboard/rent-chart/rent-chart.component';
import {GameChartComponent} from './admin-dashboard/game-chart/game-chart.component';
import {PartnersComponent} from './pages/partners/partners.component';

const routes: Routes = [
  {path: paths.homepage, component: HomepageComponent, canActivate: [AuthGuard]},
  {path: paths.gamePage, component: GamePageComponent, canActivate: [AuthGuard]},
  {path: '', component: FrontpageComponent},
  {path: paths.adminTable, component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: paths.rentChart, component: RentChartComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: paths.gameStatus, component: GameChartComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: paths.rentedGames, component: RentedGamesComponent, canActivate: [AuthGuard]},
  {path: paths.topRatedGames, component: TopRatedComponent, canActivate: [AuthGuard]},
  {path: paths.topRentedGames, component: TopRentedComponent, canActivate: [AuthGuard]},
  {path: paths.favoriteCategories, component: RecommendedCategoriesComponent},
  {path: paths.partners, component: PartnersComponent},
  {path: '**', resolve: {path: PathResolveServiceService}, component: NotFoundPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [GameService]
})
export class AppRoutingModule {
}
