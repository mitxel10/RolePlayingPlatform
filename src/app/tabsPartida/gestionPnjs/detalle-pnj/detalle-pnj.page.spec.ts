import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetallePnjPage } from './detalle-pnj.page';

describe('DetallePnjPage', () => {
  let component: DetallePnjPage;
  let fixture: ComponentFixture<DetallePnjPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePnjPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePnjPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
