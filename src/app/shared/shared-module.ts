import { NgModule } from "@angular/core"

import { CommonModule } from "@angular/common"
import { IonicModule } from "@ionic/angular"
import { FormsModule } from "@angular/forms"
import { ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"

import { ButtonComponent } from "./components/buttons/button/button.component"
import { FloatingButtonComponent } from "./components/buttons/floating-button/floating-button.component"
import { ToggleTranslateComponent } from "./components/buttons/toggle-translate/toggle-translate.component"
import { CardComponent } from "./components/card/card.component"
import { GalleryComponent } from "./components/gallery/gallery.component"
import { HeaderComponent } from "./components/header/header.component"
import { InputComponent } from "./components/input/input.component"
import { LinkComponent } from "./components/link/link.component"
import { LoadingComponent } from "./components/loading/loading.component"
import { PictureComponent } from "./components/picture/picture.component"
import { UserFormComponent } from "./components/user-form/user-form.component"
import { LanguageSelectorComponent } from "./components/language-selector/language-selector.component"

import { Toast } from "./services/toast/toast"

import { TranslateModule } from "@ngx-translate/core"

@NgModule({
  declarations: [
    ButtonComponent,
    FloatingButtonComponent,
    ToggleTranslateComponent,
    CardComponent,
    GalleryComponent,
    HeaderComponent,
    InputComponent,
    LinkComponent,
    LoadingComponent,
    PictureComponent,
    UserFormComponent,
    LanguageSelectorComponent,
  ],
  imports: [CommonModule, FormsModule, IonicModule.forRoot(), ReactiveFormsModule, RouterModule, TranslateModule],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule,
    ButtonComponent,
    FloatingButtonComponent,
    ToggleTranslateComponent,
    CardComponent,
    GalleryComponent,
    HeaderComponent,
    InputComponent,
    LinkComponent,
    PictureComponent,
    LoadingComponent,
    UserFormComponent,
    LanguageSelectorComponent,
    TranslateModule,
  ],
  providers: [Toast],
})
export class SharedModule {}
