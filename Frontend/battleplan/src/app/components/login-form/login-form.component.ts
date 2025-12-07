import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { BackendServerService } from '../../services/backend-server.service';
import { CombatantType, ModalContent, ModalText } from '../../models';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<form
    [formGroup]="loginForm"
    (ngSubmit)="entryType === 'logIn' ? onLoginSubmit() : onSignUpSubmit()"
    cdkTrapFocus
  >
    <div class="field">
      <div class="label-and-input">
        <label for="username">Username:</label
        ><input
          formFocus
          class="large-field"
          id="username"
          type="text"
          [placeholder]="'Enter username'"
          formControlName="username"
        />
      </div>
      <div class="label-and-input">
        <label for="password">Password:</label
        ><input
          formFocus
          class="large-field"
          id="password"
          type="password"
          [placeholder]="'Enter password'"
          formControlName="password"
        />
      </div>
    </div>
    <div class="buttons">
      <button type="submit" [disabled]="!loginForm.valid">Submit</button>
      <button type="button" (click)="handleCloseModal()">Cancel</button>
    </div>
  </form>`,
  styles: `form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-l);
  font-size: 2rem;

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-l);

    .label-and-input {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    label {
      margin-right: var(--spacing-l);
    }

    input {
      height: 40px;
      width: 250px;
      font-size: 2rem;
    }
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    gap: var(--spacing-l);
  }

  button {
    max-width: fit-content;
  }
}
`,
})
export class LoginFormComponent {
  private modalService = inject(ModalService);
  private backendServerService = inject(BackendServerService);
  private router = inject(Router);
  loginForm: FormGroup;

  @Input() entryType: string = '';

  constructor() {
    this.loginForm = new FormGroup({
      username: new FormControl<string>('', [Validators.required]),
      password: new FormControl<string>('', [Validators.required]),
    });
  }

  get username() {
    return this.loginForm.get('username')?.value;
  }

  get password() {
    return this.loginForm.get('password')?.value;
  }

  onLoginSubmit(): void {
    this.backendServerService
      .checkLogInCredentials(this.username, this.password)
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (data.status == 'SUCCESS') {
          this.modalService.setModalAppearance(
            CombatantType.default,
            ModalText.logInSuccess,
            ModalContent.success
          );
          setTimeout(() => {
            this.handleCloseModal();
            this.redirectToHome();
          }, 2000);
        }
        if (data.status == 'FAILED') {
          alert(data.message);
        }
        console.log(data);
      });
  }

  onSignUpSubmit(): void {
    this.backendServerService
      .checkSignUpCredentials(this.username, this.password)
      .pipe(takeUntilDestroyed())
      .subscribe((data) => {
        if (data.status == 'SUCCESS') {
          this.modalService.setModalAppearance(
            CombatantType.default,
            ModalText.signUpSuccess,
            ModalContent.success
          );
          setTimeout(() => {
            this.handleCloseModal();
            this.redirectToHome();
          }, 2000);
        }
        if (data.status == 'FAILED') {
          alert(data.message);
        }
        console.log(data);
      });
  }

  handleCloseModal(): void {
    this.modalService.closeModal();
  }

  redirectToHome(): void {
    this.router.navigate(['/home']);
  }
}
