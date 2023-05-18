import { CardModule } from './card/card.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    CardModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
