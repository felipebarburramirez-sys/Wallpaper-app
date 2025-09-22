import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import { Picture } from '../../../data/firebase/gallery/entity/picture.entity';

import { Auth as AuthService } from '../../../data/firebase/auth/auth';
import { Gallery as GalleryService } from '../../../data/firebase/gallery/gallery';
import { Gallery as StorageGalleryService } from '../../../data/supabase/buckets/gallery/gallery';
import { Loading as LoadingService } from '../../../core/loading/loading';
import { Toast as ToastService } from '../../services/toast/toast';

import { User } from '../../../data/firebase/user/entity/user.entity';
import { BucketFile } from '../../../../domain/models/bucket-file.model';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { v4 as uuidv4 } from 'uuid';
import { SupabaseClient } from '@supabase/supabase-js';

import { Timestamp } from '@angular/fire/firestore';

interface PictureGroup {
  date: Date;
  pictures: Picture[];
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  standalone: false,
})
export class GalleryComponent implements OnInit {
  public pictures: Array<Picture> = [];
  public groupedPictures: Array<PictureGroup> = [];

  public selectedImageFile: File | null = null;

  public constructor(
    private authService: AuthService,
    private galleryService: GalleryService,
    private storageGalleryService: StorageGalleryService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private supabase: SupabaseClient,
  ) {}

  ngOnInit(): void {
    this.loadingService.show();

    this.findAll();
  }

  private findAll(): void {
    const user: User | undefined = this.authService.getUser();

    if (user) {
      this.galleryService.setSuperKey(user.id);

      this.galleryService.findAll().subscribe({
        next: (t) => {
          this.pictures = t;
          this.groupPictures();
        },
        error: (e: any) => this.toastService.showError(e.message),
      });
    }
  }

  public async takePicture(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
      });

      const user: User | undefined = this.authService.getUser();
      if (image.dataUrl && user) {
        this.loadingService.show();

        const { data: s } = await this.supabase.auth.getUser();
        if (!s.user) {
          this.toastService.showError('No hay sesión de Supabase. Vuelve a iniciar sesión.');
          return;
        }

        const res = await fetch(image.dataUrl);
        const blob = await res.blob();

        const filename = `${uuidv4()}.jpg`;
        const file = new File([blob], filename, { type: 'image/jpeg' });

        const path = `${user.id}/${Date.now()}-${file.name}`;

        const bucket: BucketFile = await this.storageGalleryService.upload(file, path);

        this.galleryService.setSuperKey(user.id);

        await this.galleryService.insert({
          createdat: Timestamp.now(),
          updatedat: Timestamp.now(),
          ...bucket,
        });
      }
    } catch (e: any) {
      this.toastService.showError(e.message);
    } finally {
      this.loadingService.hide();
    }
  }

  private groupPictures(): void {
    const groups: { [key: string]: Picture[] } = {};

    this.pictures.forEach((picture) => {
      if (picture.createdat) {
        const date = new Date(picture.createdat.toDate());
        date.setHours(0, 0, 0, 0);

        const dateKey = date.toISOString();

        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }

        groups[dateKey].push(picture);
      }
    });

    this.groupedPictures = Object.keys(groups)
      .map((key) => ({
        date: new Date(key),
        pictures: groups[key],
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    this.loadingService.hide();
  }
}
