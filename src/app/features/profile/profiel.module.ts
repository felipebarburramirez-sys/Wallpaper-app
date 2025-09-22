import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { profilePageRoutingModule } from './profiel-routing.module';

import profilePage from './profile.page';

import { SharedModule } from '../../shared/shared-module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    profilePageRoutingModule,
		SharedModule,
  ],
  declarations: [profilePage]
})
export class profilePageModule {}
