import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StEgeo, StRequired } from '../decorators/require-decorators';

@Component({
  selector: 'st-spinner',
  templateUrl: './st-spinner.component.html',
  styleUrls: ['./st-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
@StEgeo()
export class StSpinnerComponent {
  @Input() @StRequired() imageUrl: string;
}
