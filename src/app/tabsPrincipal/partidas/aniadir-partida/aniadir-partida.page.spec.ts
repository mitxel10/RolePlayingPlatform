import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AniadirPartidaPage } from './aniadir-partida.page';

describe('AniadirPartidaPage', () => {
  let component: AniadirPartidaPage;
  let fixture: ComponentFixture<AniadirPartidaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniadirPartidaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AniadirPartidaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
