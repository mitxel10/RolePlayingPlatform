import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListaAmigosPage } from './lista-amigos.page';

describe('ListaAmigosPage', () => {
  let component: ListaAmigosPage;
  let fixture: ComponentFixture<ListaAmigosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAmigosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAmigosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
