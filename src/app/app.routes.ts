import { Routes } from '@angular/router';
import { AddWorkoutComponent } from './components/add-workout/add-workout.component';
import { WorkoutListComponent } from './components/workout-list/workout-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'add',
        pathMatch: 'full'
    },
    {
        path: 'add',
        component:AddWorkoutComponent,
    },
    {
        path:'workouts',
        component:WorkoutListComponent,
    }
];
