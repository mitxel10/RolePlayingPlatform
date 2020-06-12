import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AniadirAmigoPage } from './aniadir-amigo.page';

describe('AniadirAmigoPage', () => {
  let component: AniadirAmigoPage;
  let fixture: ComponentFixture<AniadirAmigoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AniadirAmigoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AniadirAmigoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
