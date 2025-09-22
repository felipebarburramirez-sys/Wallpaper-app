import { Injectable } from '@angular/core';
import { Toast as ToastCapacitor } from '@capacitor/toast';

export type ToastPosition = 'top' | 'center' | 'bottom';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  public constructor() {}

  public async showError(
    message: string,
    duration: number = 4000,
    position: ToastPosition = 'bottom'
  ): Promise<void> {
    await this.showToast(message, 'error', duration, position);
  }

  public async showInfo(
    message: string,
    duration: number = 3000,
    position: ToastPosition = 'bottom'
  ): Promise<void> {
    await this.showToast(message, 'info', duration, position);
  }

  public async showWarning(
    message: string,
    duration: number = 3500,
    position: ToastPosition = 'bottom'
  ): Promise<void> {
    await this.showToast(message, 'warning', duration, position);
  }

  public async showSuccess(
    message: string,
    duration: number = 3000,
    position: ToastPosition = 'bottom'
  ): Promise<void> {
    await this.showToast(message, 'success', duration, position);
  }

  // 🔹 Alias cortos para poder usar this.toast.success(...)
  public success(message: string, duration = 3000, position: ToastPosition = 'bottom') {
    return this.showSuccess(message, duration, position);
  }

  public error(message: string, duration = 4000, position: ToastPosition = 'bottom') {
    return this.showError(message, duration, position);
  }

  public info(message: string, duration = 3000, position: ToastPosition = 'bottom') {
    return this.showInfo(message, duration, position);
  }

  public warning(message: string, duration = 3500, position: ToastPosition = 'bottom') {
    return this.showWarning(message, duration, position);
  }

  private async showToast(
    message: string,
    type: 'error' | 'info' | 'warning' | 'success',
    duration: number,
    position: ToastPosition
  ): Promise<void> {
    try {
      const durationMode = duration <= 2000 ? 'short' : 'long';

      await ToastCapacitor.show({
        text: message,
        duration: durationMode,
        position: position,
      });
    } catch (e) {
      console.log(e);

      if (typeof window !== 'undefined' && window.alert) {
        window.alert(`${type.toUpperCase()}: ${message}`);
      }
    }
  }
}
