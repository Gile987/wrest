import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './components/card/card.component';
import { WrestlerListComponent } from 'src/app/core/components/wrestler-list/wrestler-list.component';
import { WrestlerModalComponent } from 'src/app/features/roster/components/wrestler-modal/wrestler-modal.component';
import { SmallCardComponent } from 'src/app/core/components/wrestler-list/small-card/small-card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    CardComponent,
    WrestlerListComponent,
    WrestlerModalComponent,
    SmallCardComponent,
    PaginatorComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    CardComponent,
    WrestlerListComponent,
    SmallCardComponent,
    PaginatorComponent,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    NotFoundComponent,
  ],
})
export class SharedModule {}
