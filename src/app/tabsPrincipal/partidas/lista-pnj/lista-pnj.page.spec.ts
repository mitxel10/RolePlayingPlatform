import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaPnjPage } from './lista-pnj.page';

describe('ListaPnjPage', () => {
  let component: ListaPnjPage;
  let fixture: ComponentFixture<ListaPnjPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPnjPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPnjPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
