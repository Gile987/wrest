import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatchSettingsService } from 'src/app/core/services/match-settings.service';

@Component({
  selector: 'app-match-settings',
  templateUrl: './match-settings.component.html',
  styleUrls: ['./match-settings.component.scss'],
})
export class MatchSettingsComponent implements OnInit {
  matchSettingsForm: FormGroup;
  @Output() settingsSaved: EventEmitter<{
    minRounds: number;
    maxRounds: number;
  }> = new EventEmitter<{ minRounds: number; maxRounds: number }>();

  constructor(
    private formBuilder: FormBuilder,
    private matchSettingsService: MatchSettingsService
  ) {
    this.matchSettingsForm = this.formBuilder.group({
      minRounds: [
        this.matchSettingsService.getMinRounds(),
        [Validators.required, Validators.min(1)],
      ],
      maxRounds: [
        this.matchSettingsService.getMaxRounds(),
        [Validators.required, Validators.min(1)],
      ],
    });
  }

  ngOnInit(): void {}

  public saveSettings(): void {
    const minRoundsControl = this.matchSettingsForm.get('minRounds');
    const maxRoundsControl = this.matchSettingsForm.get('maxRounds');

    if (minRoundsControl && maxRoundsControl && this.matchSettingsForm.valid) {
      const selectedSettings = {
        minRounds: minRoundsControl.value,
        maxRounds: maxRoundsControl.value,
      };
      this.settingsSaved.emit(selectedSettings);
    }
  }
}
