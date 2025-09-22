// src/app/core/core-module.ts
import { NgModule } from '@angular/core';

import { firebaseConfig, supabaseConfig } from './config/env.config';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { Auth } from '../data/firebase/auth/auth';
import { User } from '../data/firebase/user/user';
import { Gallery } from '../data/firebase/gallery/gallery';
import { Gallery as StorageGallery } from '../data/supabase/buckets/gallery/gallery';
import { Token } from './storage/token/token';
import { Loading } from './loading/loading';
import { Auth as AuthGuard } from './guards/auth/auth';

import { capStorage } from '../data/supabase/supabase.storage';

@NgModule({
  declarations: [],
  exports: [],
  imports: [],
  providers: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),

    {
      provide: SupabaseClient,
      useFactory: () =>
        createClient(supabaseConfig.url, supabaseConfig.key, {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: false,
            storage: capStorage,
            storageKey: 'sb-wallify-auth',
          },
        }),
    },

    Auth,
    User,
    Gallery,
    StorageGallery,
    Loading,
    Token,
    AuthGuard,
  ],
})
export class CoreModule {}
