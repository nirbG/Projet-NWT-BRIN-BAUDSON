import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material";
import {DialogComicsComponent} from "../../shared/dialog/dialog-comics/dialog-comics.component";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, flatMap, map} from "rxjs/operators";
import {COMICS, Comics} from "../../shared/interfaces/Comics";
import {ServiceComicsService} from "../../services/service-comics.service";

@Component({
  selector: 'app-update',
  templateUrl: './update-comics.component.html',
  styleUrls: ['./update-comics.component.css']
})
export class UpdateComicsComponent implements OnInit {
  // private property to store dialog reference
  private _peopleDialog: MatDialogRef<DialogComicsComponent>;

  /**
   * Component constructor
   */
  constructor(private _route: ActivatedRoute, private _router: Router,
              private _comicsService: ServiceComicsService, private _dialog: MatDialog) {
  }

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._route.params
        .pipe(
            map((params: any) => params.isbn),
            flatMap((isbn: string) => this._comicsService.fetchOne(isbn))
        )
        .subscribe((comics: Comics) => {
          this._peopleDialog = this._dialog.open(DialogComicsComponent, {
            width: '500px',
            disableClose: true,
            data: comics,
            panelClass: 'col-lg-12',
          });

          // subscribe to afterClosed observable to set dialog status and do process
          this._peopleDialog.afterClosed()
              .pipe(
                  filter(_ => !!_),
                  flatMap(_ => this._comicsService.update(_))
              )
              .subscribe(() => undefined, () => undefined, () => this._router.navigate([ '/comics/' ]));
        });
  }
    image(): string {
        return '../../assets/baroom-comic-book--wallpaper.jpg';
    }
}