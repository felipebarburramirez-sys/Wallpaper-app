import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Loading as LoadingService } from '../../../core/loading/loading';
import { Toast as ToastService } from '../../../shared/services/toast/toast';
import { Auth as AuthService } from '../../../data/firebase/auth/auth';
import { Gallery as StorageGalleryService } from '../../../data/supabase/buckets/gallery/gallery';
import { Gallery as GalleryService } from '../../../data/firebase/gallery/gallery';

import { User } from '../../../data/firebase/user/entity/user.entity';
import { Credential } from '../../../../domain/models/credential.model';
import { BucketFile } from '../../../../domain/models/bucket-file.model';
import { SupabaseClient } from '@supabase/supabase-js';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  public constructor(
    private authService: AuthService,
    private toastService: ToastService,
    private loadingService: LoadingService,
    private storageGalleryService: StorageGalleryService,
    private galleryService: GalleryService,
    private router: Router,
    private supabase: SupabaseClient,
  ) {}

  public ngOnInit() {}


  public async onUserSubmit(account: { user: User; cred: Credential; image: File | null }): Promise<void> {
    try {
      this.loadingService.show();

      const email = (account.cred.email || '').trim().toLowerCase();
      const password = (account.cred.password || '').trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Por favor ingresa un correo válido.');
      }
      if (!password) throw new Error('La contraseña no puede estar vacía.');

      try {
        await this.authService.logup({ email, password }, account.user);
      } catch (e: any) {
        if (String(e.message || e).includes('auth/email-already-in-use')) {
          await this.authService.login({ email, password });
        } else {
          throw e;
        }
      }

      let user = this.authService.getUser() as User;

      let { data, error } = await this.supabase.auth.signUp({ email, password });

      if (error) {
        if (/registered/i.test(error.message) || /already/i.test(error.message)) {
          const { error: e2 } = await this.supabase.auth.signInWithPassword({ email, password });
          if (e2) throw e2;
        } else {
          throw error;
        }
      } else if (!data.session) {
        const { error: e3 } = await this.supabase.auth.signInWithPassword({ email, password });
        if (e3) throw new Error('Supabase: no hay sesión. Verifica que Confirm email esté desactivado.');
      }

      let bucket: BucketFile | null = null;
      if (account.image) {
        const orig = account.image.name || 'photo.jpg';
        const safeName = orig.replace(/[^\w.\-]+/g, '_');
        const nameWithExt = safeName.includes('.') ? safeName : `${safeName}.jpg`;

        const path = `${user.id}/${Date.now()}-${nameWithExt}`;
        bucket = await this.storageGalleryService.upload(account.image, path);
        user.picture = bucket.url;
      }

      this.galleryService.setSuperKey(user.id);
      if (bucket) {
        await this.galleryService.insert({
          createdat: Timestamp.now(),
          updatedat: Timestamp.now(),
          ...bucket,
        });
      }

      this.router.navigate(['/home']);
    } catch (e: any) {
      this.toastService.showError(e.message || String(e));
    } finally {
      this.loadingService.hide();
    }
  }


  public navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
