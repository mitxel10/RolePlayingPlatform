import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ItemsPersonajePage } from './items-personaje.page';

describe('ItemsPersonajePage', () => {
  let component: ItemsPersonajePage;
  let fixture: ComponentFixture<ItemsPersonajePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsPersonajePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsPersonajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
