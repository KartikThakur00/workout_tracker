import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';
import { User } from '../models/user.model';

describe('WorkoutService', () => {
    let service: WorkoutService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WorkoutService]
        });
        service = TestBed.inject(WorkoutService);
    });

    afterEach(() => {
        localStorage.removeItem('userData'); // Clear local storage after each test
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should retrieve users', () => {
        const users: User[] = service.getUsers();
        expect(users.length).toBeGreaterThan(0);
    });

    it('should add a new user', () => {
        const initialUsers = [...service.getUsers()];
        const newUser: User = {
            id: 4,
            name: 'Test User',
            workouts: [{ type: 'Running', minutes: 30 }]
        };
        
        service.addUser(newUser);

        const updatedUsers = service.getUsers();
        expect(updatedUsers.length).toBe(initialUsers.length + 1);
        expect(updatedUsers.find(u => u.id === 4)).toBeTruthy();
    });

    it('should add a workout to an existing user', () => {
        const existingUser = service.getUsers()[0];
        const initialWorkoutCount = existingUser.workouts.length;

        const newWorkout = { type: 'Swimming', minutes: 45 };
        const updatedUser: User = {
            ...existingUser,
            workouts: [...existingUser.workouts, newWorkout]
        };

        service.addUser(updatedUser);

        const usersAfterUpdate = service.getUsers();
        const updatedUserAfterUpdate = usersAfterUpdate.find(u => u.id === existingUser.id);
        expect(updatedUserAfterUpdate).toBeTruthy();
        expect(updatedUserAfterUpdate!.workouts.length).toBe(initialWorkoutCount + 1);
    });

    it('should persist user data in local storage', () => {
        const newUser: User = {
            id: 4,
            name: 'Test User',
            workouts: [{ type: 'Running', minutes: 30 }]
        };

        service.addUser(newUser);

        const storedUserData = localStorage.getItem('userData');
        expect(storedUserData).toBeTruthy();
    });


});