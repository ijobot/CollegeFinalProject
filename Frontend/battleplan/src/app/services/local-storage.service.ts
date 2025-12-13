import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // A simple service to pass data to and from LocalStorage easily.
  // It is only used to store the currentUser object, but is scalable to allow for much more functionality.
  private readonly platformId = inject(PLATFORM_ID);

  saveData(key: string, value: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, value);
    }
  }

  getData(key: string): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(key);
    } else {
      return '';
    }
  }

  clearData() {
    localStorage.clear();
  }
}
