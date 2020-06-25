import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AniadirForoPage } from './aniadir-foro.page';

describe('AniadirForoPage', () => {
  let component: AniadirForoPage;
  let fixture: ComponentFixture<AniadirForoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniadirForoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AniadirForoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
