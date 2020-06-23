import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PersonajePage } from './personaje.page';

describe('PersonajePage', () => {
  let component: PersonajePage;
  let fixture: ComponentFixture<PersonajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonajePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
