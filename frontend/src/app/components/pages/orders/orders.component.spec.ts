import { ComponentFixture, TestBed } from '@angular/core/testing';

// 1. CORRECCIÓN: El nombre correcto es OrdersPageComponent
import { OrdersPageComponent } from './orders.component';

describe('OrdersPageComponent', () => {
  let component: OrdersPageComponent; // 2. Aquí también
  let fixture: ComponentFixture<OrdersPageComponent>; // 3. Y aquí

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersPageComponent] // 4. Y en los imports
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersPageComponent); // 5. Y al crear el componente
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});