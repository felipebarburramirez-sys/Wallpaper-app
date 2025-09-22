import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { TranslateService } from "@ngx-translate/core"
import { Toast } from "src/app/shared/services/toast/toast"

@Component({
  selector: "app-user-info",
  templateUrl: "./user-info.page.html",
  styleUrls: ["./user-info.page.scss"],
  standalone: false,
})
export class UserInfoPage implements OnInit {
  user = {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    bio: "Amante de la fotografía y los diseños minimalistas.",
    joinedDate: new Date("2023-01-15"),
    totalPhotos: 42,
    favoritePhotos: 8,
    profilePicture: "/diverse-profile-avatars.png",
  }

  currentLanguage = "es"
  availableLanguages = [
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ]

  constructor(
    private router: Router,
    private translate: TranslateService,
    private toast: Toast,
  ) {}

  ngOnInit() {
    this.currentLanguage = this.translate.currentLang || "es"
  }

  editProfile() {
    this.router.navigate(["/profile"])
  }

  changeLanguage(languageCode: string) {
    this.currentLanguage = languageCode
    this.translate.use(languageCode)
    localStorage.setItem("wallify-language", languageCode)
    this.toast.success(this.translate.instant("toast.languageChanged"))
  }

  getCurrentLanguageName(): string {
    const lang = this.availableLanguages.find((l) => l.code === this.currentLanguage)
    return lang ? lang.name : "Español"
  }

  goBack() {
    this.router.navigate(["/home"])
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString(this.currentLanguage === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }
}

export default UserInfoPage
