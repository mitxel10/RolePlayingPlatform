import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AniadirPnjPage } from './aniadir-pnj.page';

describe('AniadirPnjPage', () => {
  let component: AniadirPnjPage;
  let fixture: ComponentFixture<AniadirPnjPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniadirPnjPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AniadirPnjPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
