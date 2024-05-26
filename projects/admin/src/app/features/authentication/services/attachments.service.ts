import { HttpClient, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable()
export class attachmentsService {
  constructor(private http: HttpClient) {}
  registerProgress = signal<number>(0);
  taxProgress = signal<number>(0);
  failUpload!: boolean;
  failBulk!: boolean;
  bulkProgress = signal<number>(0);
  ids: {
    tax: {
      id: number;
      path: string;
    };
    commercial: {
      id: number;
      path: string;
    };
    other: {
      id: number;
      files: { name: string; path: string }[];
    };
  } = {
    tax: {
      id: 0,
      path: '',
    },
    commercial: {
      id: 0,
      path: '',
    },
    other: {
      id: 0,
      files: [],
    },
  };

  // Get Document ID
  getDocId() {
    this.http
      .get(`${environment.baseAPI}/Documents/GetRequiredDocuments`)
      .subscribe((res: Array<any>) => {
        res.forEach((element) => {
          switch (element.type) {
            case 'Tax Card':
              this.ids.tax.id = element.id;
              break;
            case 'Commercial Certificate':
              this.ids.commercial.id = element.id;
              break;
            case 'Other':
              this.ids.other.id = element.id;
              break;
          }
        });
      });
  }

  // function to upload single file
  uploadFile(file: FormData, from: string) {
    this.failUpload = false;
    this.http
      .post(`${environment.attachments}/Attachments/Upload`, file, {
        observe: 'events',
      })
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.UploadProgress) {
          }
          // set progress value based on from parent
          if (from === 'tax') {
            this.fileBar(this.taxProgress);
          } else {
            this.fileBar(this.registerProgress);
          }
        }),
      )
      .subscribe(
        (res) => {
          if (res['body']) {
            if (from === 'tax') {
              this.ids.tax.path = res['body']['message'];
            } else {
              this.ids.commercial.path = res['body']['message'];
            }
          }
        },
        (err) => {
          this.failUpload = true;
        },
      );
  }

  // function to upload multiple files
  bulkFiles(files: FormData) {
    this.failBulk = false;
    this.bulkProgress.set(0);
    this.http
      .post(`${environment.attachments}/Attachments/Bulk`, files, {
        observe: 'events',
      })
      .pipe(
        tap((event) => {
          if (event.type === 0) {
            this.bulkBar(this.bulkProgress);
          }
        }),
      )
      .subscribe(
        (res) => {
          if (res['body']) {
            res['body'].forEach((element, i) => {
              this.ids.other.files.push({
                name: files.getAll('files')[i]['name'],
                path: element,
              });
            });
          }
        },
        (err) => {
          this.failBulk = true;
        },
      );
  }

  // send the final uploaded files
  sendDocuments(files: string[]) {
    // remove files that removed from the UI before sending
    this.ids.other.files = this.ids.other.files.filter((element) =>
      files.includes(element.name),
    );
    // destructure the ids object
    const {
      tax: { id: taxID, path: taxPath },
      commercial: { id: commercialID, path: commercialPath },
      other: { id: otherID, files: otherFiles },
    } = this.ids;
    // set the data at the body object
    let body: {
      registerationDocumentTypeId: number;
      path: string;
    }[] = [
      {
        registerationDocumentTypeId: taxID,
        path: taxPath,
      },
      {
        registerationDocumentTypeId: commercialID,
        path: commercialPath,
      },
    ];
    // add the other files to the body
    otherFiles.forEach((element) => {
      body.push({
        registerationDocumentTypeId: otherID,
        path: element.path,
      });
    });
    // send the request
    return this.http.post(`${environment.baseAPI}/Documents`, body);
  }

  // progress bar control for single file
  fileBar(ref) {
    if (ref() === 0) {
      let intervalRef = setInterval(() => {
        if (!this.failUpload) {
          ref.update((v) => v + 1);
        } else {
          ref.set(0);
        }
      }, 10);

      setTimeout(() => {
        clearInterval(intervalRef);
      }, 1002);
    }
  }

  // progress bar control for bulk
  bulkBar(ref) {
    let intervalRef = setInterval(() => {
      if (!this.failBulk) {
        ref.update((v) => v + 1);
      } else {
        ref.set(0);
      }
    }, 20);
    setTimeout(() => {
      clearInterval(intervalRef);
    }, 2002);
  }
}
