import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { CardComponent } from '../components/card/card.component';
import { WrestlerListComponent } from 'src/app/core/components/wrestler-list/wrestler-list.component';
import { WrestlerModalComponent } from 'src/app/features/roster/components/wrestler-modal/wrestler-modal.component';
import { SmallCardComponent } from 'src/app/core/components/wrestler-list/small-card/small-card.component';

@NgModule({
  declarations: [CardComponent, WrestlerListComponent, WrestlerModalComponent, SmallCardComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [CardComponent, WrestlerListComponent, SmallCardComponent],
})
export class SharedRosterModule {}
