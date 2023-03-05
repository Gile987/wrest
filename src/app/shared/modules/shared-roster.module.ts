import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from '../components/card/card.component';
import { WrestlerListComponent } from 'src/app/core/components/wrestler-list/wrestler-list.component';
import { WrestlerModalComponent } from 'src/app/features/roster/components/wrestler-modal/wrestler-modal.component';

@NgModule({
  declarations: [CardComponent, WrestlerListComponent, WrestlerModalComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [CardComponent, WrestlerListComponent],
})
export class SharedRosterModule {}
