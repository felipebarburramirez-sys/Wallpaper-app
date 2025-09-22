import { Component, type OnInit } from "@angular/core"
import { TranslateService } from "@ngx-translate/core"

@Component({
  selector: "app-language-selector",
  templateUrl: "./language-selector.component.html",
  styleUrls: ["./language-selector.component.scss"],
  standalone: false,
})
export class LanguageSelectorComponent implements OnInit {
  currentLanguage = "es"
  languages = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ]
  isOpen = false

  constructor(private translate: TranslateService) {}

  ngOnInit() {
    this.currentLanguage = this.translate.currentLang || this.translate.defaultLang || "es"
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen
  }

  selectLanguage(languageCode: string) {
    this.currentLanguage = languageCode
    this.translate.use(languageCode)
    this.isOpen = false

    // Guardar preferencia en localStorage
    localStorage.setItem("wallify-language", languageCode)
  }

  getCurrentLanguage() {
    return this.languages.find((lang) => lang.code === this.currentLanguage)
  }

  closeDropdown() {
    setTimeout(() => {
      this.isOpen = false
    }, 150)
  }
}
