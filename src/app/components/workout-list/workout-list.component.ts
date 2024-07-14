import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { WorkoutService } from "../../services/workout.service";
import { User } from '../../models/user.model';
import { MatSelectModule } from "@angular/material/select";

interface WorkoutList {
  name: string;
  workouts: string[];
  numberOfWorkouts: number;
  totalWorkoutMinutes: number;
}

@Component({
  selector: 'app-workout-list',
  standalone: true,
  templateUrl: './workout-list.component.html',
  imports: [
    FormsModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule
  ],
})
export class WorkoutListComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  searchName: string = '';
  filterType: string = '';
  displayedColumns: string[] = ['name', 'workouts', 'numberOfWorkouts', 'totalWorkoutMinutes'];
  dataSource = new MatTableDataSource<WorkoutList>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit(): void {
    this.users = this.workoutService.getUsers();
    this.dataSource.data = this.formatWorkouts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  formatWorkouts(): WorkoutList[] {
    return this.users.map(user => {
      return {
        name: user.name,
        workouts: user.workouts.map(workout => workout.type),
        numberOfWorkouts: user.workouts.length,
        totalWorkoutMinutes: user.workouts.reduce((acc, workout) => acc + workout.minutes, 0)
      };
    });
  }

  searchUser() {
    this.users = this.workoutService.getUsers().filter(user => user.name.toLowerCase().includes(this.searchName.toLowerCase()));
    this.dataSource.data = this.formatWorkouts();
  }

  filterUsers() {
    if (this.filterType === 'All') {
      this.users = this.workoutService.getUsers();
    } else {
      this.users = this.workoutService.getUsers().filter(user =>
        user.workouts.some(workout =>
          workout.type.toLowerCase().includes(this.filterType.toLowerCase())
        )
      );
    }
    this.dataSource.data = this.formatWorkouts();
  }
}
