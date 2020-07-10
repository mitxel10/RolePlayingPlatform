import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReglasPage } from './reglas.page';

describe('ReglasPage', () => {
  let component: ReglasPage;
  let fixture: ComponentFixture<ReglasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReglasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReglasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
