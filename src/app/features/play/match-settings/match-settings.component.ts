import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
    this.matchSettingsForm = this.formBuilder.group({
      minRounds: [10, [Validators.required, Validators.min(1)]],
      maxRounds: [20, [Validators.required, Validators.min(1)]],
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
