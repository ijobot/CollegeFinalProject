import { Component, inject, OnInit } from '@angular/core';
import { MonsterService } from '../../services/monster.service';
import { BackendServerService } from '../../services/backend-server.service';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFocusDirective } from '../../utils/autofocus.directive';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { Observable } from 'rxjs';
import { CombatantType, ModalText, ModalContent } from '../../models';

@Component({
  selector: 'app-Login',
  imports: [ReactiveFormsModule, CommonModule, ModalComponent],
  template: `<div>
      <button (click)="getLoginRouter()">Get LoginRouter</button>
      <div class="page-container">
        <div class="login-container">
          <div class="content-container login-text">
            <h1 class="title-text center-text">Battle Plan</h1>
            <p>Please log in or sign up</p>
            <div class="button-group">
              <button (click)="this.handleSignIn(combatantType.default, modalText.signIn)">
                Log In
              </button>
              <button (click)="this.handleSignUp(combatantType.default, modalText.signUp)">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    @if (showModal$ | async) {
    <app-modal></app-modal>
    }`,
  styles: ``,
})
export class LoginComponent {
  private backendServer = inject(BackendServerService);
  modalService = inject(ModalService);

  combatantType = CombatantType;
  modalText = ModalText;

  showModal$: Observable<boolean> = this.modalService.modal$;
  userSigninForm: FormGroup;

  constructor() {
    this.userSigninForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  getLoginRouter() {
    this.backendServer.getLogin().subscribe((data) => console.log(data));
  }

  handleSignIn(type: CombatantType, modalText: ModalText): void {
    this.modalService.setModalAppearance(type, modalText, ModalContent.signIn);
    this.modalService.openModal();
  }

  handleSignUp(type: CombatantType, modalText: ModalText): void {
    this.modalService.setModalAppearance(type, modalText, ModalContent.signIn);
    this.modalService.openModal();
  }
}
