import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaPnjsPage } from './lista-pnjs.page';

describe('ListaPnjsPage', () => {
  let component: ListaPnjsPage;
  let fixture: ComponentFixture<ListaPnjsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPnjsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPnjsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
