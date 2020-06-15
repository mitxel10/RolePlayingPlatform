import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearPersonajePage } from './crear-personaje.page';

describe('CrearPersonajePage', () => {
  let component: CrearPersonajePage;
  let fixture: ComponentFixture<CrearPersonajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPersonajePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPersonajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
