import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { IonicModule } from "@ionic/angular"
import { TranslateModule } from "@ngx-translate/core"

import { UserInfoPageRoutingModule } from "./user-info-routing.module"
import { UserInfoPage } from "./user-info.page"
import { SharedModule } from "src/app/shared/shared-module"

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule, UserInfoPageRoutingModule, SharedModule],
  declarations: [UserInfoPage],
})
export class UserInfoPageModule {}
