import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { WorkoutService } from "../../services/workout.service";
import { User } from '../../models/user.model';

@Component({
    selector: 'app-add-workout',
    standalone: true,
    templateUrl: './add-workout.component.html',
    imports: [ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule],
})
export class AddWorkoutComponent {
    workoutForm: FormGroup;

    constructor(private fb: FormBuilder, private workoutService: WorkoutService) {
        this.workoutForm = this.fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required],
            minutes: ['', [Validators.required, Validators.min(1)]]
        })
    }

    onSubmit() {
        if (this.workoutForm.invalid) {
            this.workoutForm.markAllAsTouched();
        }else{
            const { name, type, minutes } = this.workoutForm.value;
            const user: User = {
                id: Date.now(),
                name,
                workouts: [{ type, minutes }]
            }
            this.workoutService.addUser(user);
            this.workoutForm.reset();
        }
    }

}