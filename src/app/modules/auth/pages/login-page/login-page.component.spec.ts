import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, RouterTestingModule, LoginPageComponent],
}).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deberia retornar invalido el formulario', () => {
    const mockCredentials = {
      email: 'test000vc000',
      password: '1231111111111111111111',
    };
    const emailForm = component.formLogin.get('email');
    const passwordForm = component.formLogin.get('password');

    emailForm?.setValue(mockCredentials.email);
    passwordForm?.setValue(mockCredentials.password);

    expect(component.formLogin.invalid).toEqual(false);
  });
});
