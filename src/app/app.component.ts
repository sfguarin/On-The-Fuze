import { ApiService } from './services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

//Implementación del OnInit
export class AppComponent implements OnInit {
  title = 'frontendOnTheFuzeTest';

  //Componentes para la tabla
  displayedColumns: string[] = ['name', 'last_name', 'document_id', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog : MatDialog, private api : ApiService){

  }

  //Para tener el inicializador
  ngOnInit(): void {
    //Obtener usuarios al iniciar la pagina
    this.getAllUsers()
  }

  // llamado al componente del cuadro de dialogo
  openDialog() {
    this.dialog.open(DialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val=>{
      if(val === 'save'){
        this.getAllUsers();
      }
    })
  }

  getAllUsers(){

    this.api.getUser()
    .subscribe({
      next:(res)=>{
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err)=>{
        alert("Error while fetching the records")
      }
    })

  }

  //Cuadro de dialogo al editar el usuario
  editUser(row : any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe(val=>{
      if(val === 'update'){
        this.getAllUsers();
      }
    })
  }

  deleteUser(id:number){

    this.api.deleteUser(id)
    .subscribe({
      next:(res)=>{
        alert("User deleted successfully");
        this.getAllUsers();
      },
      error:()=>{
        alert("Error while deleting the user")
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
