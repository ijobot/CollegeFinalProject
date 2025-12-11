import { Component, inject, OnInit } from '@angular/core';
import { BackendServerService } from '../../services/backend-server.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { Observable } from 'rxjs';
import { CombatantType, ModalText, ModalContent } from '../../models';

@Component({
  selector: 'app-Login',
  imports: [ReactiveFormsModule, CommonModule, ModalComponent],
  template: `<div>
      <div class="main-nav"></div>
      <div class="page-container">
        <div class="login-container">
          <div class="content-container login-text extra-padding">
            <h1 class="title-text center-text">Battle Plan</h1>
            <div class="line-break"></div>
            <p>
              Please click "Log In" if you are a returning user, or click "Sign Up" to try Battle
              Plan for the first time!
            </p>
            <div class="button-group">
              <button (click)="this.handleLogIn(combatantType.default, modalText.signIn)">
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
export class LoginComponent implements OnInit {
  private backendServerService = inject(BackendServerService);
  modalService = inject(ModalService);

  combatantType = CombatantType;
  modalText = ModalText;

  showModal$: Observable<boolean> = this.modalService.modal$;
  constructor() {}

  ngOnInit(): void {
    this.backendServerService.getLogin().subscribe((data) => console.log(data));
  }

  handleLogIn(type: CombatantType, modalText: ModalText): void {
    this.modalService.setModalAppearance(type, modalText, ModalContent.logIn);
    this.modalService.openModal();
  }

  handleSignUp(type: CombatantType, modalText: ModalText): void {
    this.modalService.setModalAppearance(type, modalText, ModalContent.signUp);
    this.modalService.openModal();
  }
}
