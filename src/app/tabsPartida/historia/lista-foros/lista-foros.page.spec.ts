import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaForosPage } from './lista-foros.page';

describe('ListaForosPage', () => {
  let component: ListaForosPage;
  let fixture: ComponentFixture<ListaForosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaForosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaForosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
