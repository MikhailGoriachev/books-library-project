import { NgModule } from '@angular/core';
import { MainComponent } from "./components/user/main/main.component";
import { RouterModule, Routes } from "@angular/router";
import { UserComponent } from "./components/user/user.component";

const routes: Routes = [
    { path: "", loadChildren: () => import("./components/user/user.module").then(m => m.UserModule) },
    { path: "**", redirectTo: "" }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
