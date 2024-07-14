import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../../services/workout.service';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { User } from '../../models/user.model';

describe('WorkoutListComponent', () => {
    let component: WorkoutListComponent;
    let fixture: ComponentFixture<WorkoutListComponent>;
    let workoutServiceStub: Partial<WorkoutService>;
    let mockUsers: User[];

    beforeEach(async () => {
        mockUsers = [
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

        workoutServiceStub = {
            getUsers: () => mockUsers
        };

        await TestBed.configureTestingModule({
            imports: [
                FormsModule,
                MatTableModule,
                MatFormFieldModule,
                MatInputModule,
                MatPaginatorModule,
                MatSelectModule,
                NoopAnimationsModule,
                WorkoutListComponent
            ],
            providers: [
                { provide: WorkoutService, useValue: workoutServiceStub }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkoutListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should populate users on init', () => {
        expect(component.users.length).toBe(3);
        expect(component.dataSource.data.length).toBe(3);

    });

    it('should filter users based on search input', () => {
        component.searchName = 'john';
        component.searchUser();
        expect(component.dataSource.data.length).toBe(2);
        expect(component.dataSource.data[0].name).toBe('John Doe');
    });

    it('should filter users based on workout type', () => {
        component.filterType = 'Running';
        component.filterUsers();
        expect(component.dataSource.data.length).toBe(2);

    });

    it('should reset filter when workout type is set to All', () => {
        component.filterType = 'All';
        component.filterUsers();
        expect(component.dataSource.data.length).toBe(3);
    });

    it('should initialize paginator', () => {
        expect(component.dataSource.paginator).toBe(component.paginator);
    });

    it('should paginate the data correctly', () => {
        component.dataSource.paginator!.pageSize = 1;
        component.paginator.pageIndex = 1;        
        fixture.whenStable().then(() => {
            expect(component.paginator.length).toBe(3); // Total length of paginator should be 3
        });
        expect(component.dataSource.data.length).toBe(3); 
        expect(component.paginator.pageSize).toBe(1); // Page size should be set to 1
    });

});
