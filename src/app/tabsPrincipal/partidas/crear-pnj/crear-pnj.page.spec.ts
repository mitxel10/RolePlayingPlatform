import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CrearPnjPage } from './crear-pnj.page';

describe('CrearPnjPage', () => {
  let component: CrearPnjPage;
  let fixture: ComponentFixture<CrearPnjPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPnjPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearPnjPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
