import { Injectable } from "@angular/core";
import { User } from '../models/user.model'

@Injectable({
    providedIn: 'root',
})
export class WorkoutService {
    private userData: User[] = JSON.parse(localStorage.getItem('userData')!) || [
        {
            id: 1,
            name: 'John Doe',
            workouts: [
                { type: 'Running', minutes: 30 },
                { type: 'Cycling', minutes: 45 }
            ]
        },
        {
            id: 2,
            name: 'Jane Smith',
            workouts: [
                { type: 'Swimming', minutes: 60 },
                { type: 'Running', minutes: 20 }
            ]
        },
        {
            id: 3,
            name: 'Mike Johnson',
            workouts: [
                { type: 'Yoga', minutes: 50 },
                { type: 'Cycling', minutes: 40 }
            ]
        },
    ];


    constructor() {
        this.saveToLocalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem('userData', JSON.stringify(this.userData));
    }

    getUsers() {
        return this.userData;
    }

    addUser(user: User) {
        let index = this.userData.findIndex(u => u.name === user.name);
        if (index !== -1) {
            this.userData[index].workouts.push(user.workouts[0]);
            this.saveToLocalStorage();
            return;
        } else {
            this.userData.push(user);
        }
        this.saveToLocalStorage();
    }

}