import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Comics} from "../shared/interfaces/Comics";
import {ServiceComicsService} from "../services/service-comics.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogComicsComponent} from "../shared/dialog/dialog-comics/dialog-comics.component";
import {filter, flatMap} from "rxjs/operators";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  // etat du dialog
  private _dialogStatus: string;
  // private property to store dialog reference
  private _comicsDialog: MatDialogRef<DialogComicsComponent>;
  // liste de comics
  private _comics: Comics[];
  // lindice de depart pour l'affichage
  private _nbstart = 0;
  // boolean qui permet d'afficher une barre de chargement
  private _isLoadMore: boolean;
  // etat de l'affichage
  private _isList: boolean;
  // nbComics
  private _nbComics: number;
  // indice
  private _indice: number[];


  /**
   *
   * @param _snackBar
   * @param _service
   * @param _dialog
   * @param _router
   */
  constructor(private _snackBar: MatSnackBar, private _service: ServiceComicsService,
              private _dialog: MatDialog, private _router: Router) {
    this._dialogStatus = 'inactive';
    this._isList = false;
    this._nbComics = 10;
    this._indice = [5,10,20];
    this._service.some(this._nbstart, this. _nbComics).subscribe((_: Comics[]) =>  {this._comics = _,
        this._nbstart=this._nbstart+this._nbComics});
  }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   * load des comics et les ajoute a la liste
   */
  Load() {
    this._service.some(this._nbstart , this._nbComics )
        .subscribe((comics: Comics[]) => {this._comics = this._comics.concat(comics),
            this._nbstart=this._nbstart+this._nbComics});
  }

  /**
   * affiche plus de comics
   */
  seeMore() {
    this._isLoadMore = true;
    setTimeout(
        () => {
          this._isLoadMore = false;
          this.Load();
        }, 2000
    );
  }

  /**
   * supprime le comics passer en parametre
   * @param data
   */
  delete(data: Comics) {
    this._comics = this._comics.filter(__ => __._id !== data._id);
    this._service.delete(data._id).subscribe(
        (_: string) => this._comics = this._comics.filter((__: Comics) => __._id !== _ )
    );
  }

  /**
   * Function to display modal
   */
  showDialog() {
    // set dialog status
    this._dialogStatus = 'active';

    // open modal
    this._comicsDialog = this._dialog.open(DialogComicsComponent, {
      width: '500px',
      disableClose: true
    });

    // subscribe to afterClosed observable to set dialog status and do process
    this._comicsDialog.afterClosed()
        .pipe(
            filter(_ => !!_),
            flatMap(_ => this._add(_))
        )
        .subscribe(
            (_: Comics) =>this._router.navigate(
                [ '/comics/'+ _._id]),
            _ => this._dialogStatus = 'inactive',
            () => this._dialogStatus = 'inactive',
        );
  }

  /**
   * Add new person and fetch all people to refresh the list
   */
  private _add(comics: Comics): Observable<Comics> {
    return this._service
        .create(comics);
  }

  /************************************************************GET & SET **********************************/

  get dialogStatus(): string {
    return this._dialogStatus;
  }
  get comics(): any[] {
    return this._comics;
  }
  get isLoadMore(): boolean {
    return this._isLoadMore;
  }
  get isList(): boolean {
    return this._isList;
  }
  changeAffichage(value: boolean) {
    this._isList = value;
  }
  setInidce(newIndice: number){
    this._nbComics=newIndice;
  }
  get indice(): number[] {
    return this._indice;
  }
}
