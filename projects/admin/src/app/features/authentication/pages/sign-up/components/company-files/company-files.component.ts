import { NgClass, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { attachmentsService } from '../../../../services/attachments.service';
import { UploadComponent } from './upload/upload.component';
import { LoadedComponent } from './loaded/loaded.component';
import { Router, RouterLink } from '@angular/router';
import { LoaderComponent } from '../../../../shared-components/loader/loader.component';
import { finalize } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-company-files',
  templateUrl: './company-files.component.html',
  styleUrls: ['./company-files.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgClass,
    NgStyle,
    UploadComponent,
    LoadedComponent,
    RouterLink,
    LoaderComponent,
    TranslateModule,
  ],
  providers: [attachmentsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyFilesComponent implements OnInit {
  constructor() {
    effect(() => {
      if (this.bulkProgress() >= 90) {
        this.filesLoaded = [...this.filesLoaded, ...this.filesUploaded];
        this.filesUploaded = [];
      }
    });
  }
  // injection
  private attachService = inject(attachmentsService);
  private router = inject(Router);

  filesForm: FormGroup;
  taxFile: any;
  registerFile: any;
  filesLoaded = [];
  filesUploaded = [];
  loading = signal<boolean>(false);

  // signals for each file to manage it's state
  registerProgress = this.attachService.registerProgress;
  taxProgress = this.attachService.taxProgress;
  bulkProgress = this.attachService.bulkProgress;

  ngOnInit(): void {
    // form group Initialization
    this.filesForm = new FormGroup({
      register: new FormControl('', Validators.required),
      tax: new FormControl('', Validators.required),
      more: new FormControl(''),
    });
    // call Get Document ID Function from attachment service
    this.attachService.getDocId();
  }

  uploadFile(e: any) {
    const formData = new FormData();
    let id = '';
    if (e.type === 'change') {
      id = (e.target as HTMLElement).id;
      id === 'tax'
        ? (this.taxFile = (e.target as HTMLInputElement).files[0])
        : (this.registerFile = (e.target as HTMLInputElement).files[0]);
    } else {
      e.preventDefault();
      id = (e.target as HTMLElement).firstElementChild.id;
      id === 'tax'
        ? (this.taxFile = (e.target as HTMLInputElement).files[0])
        : (this.registerFile = (e.target as HTMLInputElement).files[0]);
    }
    if (this.taxFile ?? this.registerFile) {
      this.filesForm.get(id)?.setValue(this.taxFile ?? this.registerFile);
      formData.append('file', this.taxFile ?? this.registerFile);
      this.attachService.uploadFile(formData, id);
    }
  }

  bulkFiles(e: any) {
    const formData = new FormData();
    if (e.type === 'change') {
      this.filesUploaded.push(
        ...Array.from((e.target as HTMLInputElement).files),
      );
    } else {
      // handle drag and drop
      e.preventDefault();
      this.filesUploaded.push(...e.dataTransfer.files);
    }

    this.filesForm.get('more')?.setValue([...this.filesUploaded]);
    for (let i = 0; i < this.filesUploaded.length; i++) {
      formData.append('files', this.filesUploaded[i]);
    }
    this.attachService.bulkFiles(formData);
  }

  // resend bulk files after handle not allowed extension files
  resendBulk() {
    const formData = new FormData();
    this.filesForm.get('more')?.setValue([...this.filesUploaded]);
    for (let i = 0; i < this.filesUploaded.length; i++) {
      formData.append('files', this.filesUploaded[i]);
    }
    this.attachService.bulkFiles(formData);
  }

  onNavigate() {
    // extract the names of the loaded files from the loaded files array
    const names = this.filesLoaded.map((file) => file.name);
    this.loading.set(true);
    this.attachService
      .sendDocuments(names)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe((res) => {
        this.router.navigate(['/verified/upAttach']);
      });
  }
}
