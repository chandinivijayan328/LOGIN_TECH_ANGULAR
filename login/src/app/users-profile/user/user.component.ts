import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

lstProfileData = []
dctProfileData = {}

  constructor(
    private serverService : ServerService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.loadProfileData();
  }
  loadProfileData(){
    var email = localStorage.getItem('email')

    var data = { 'email' : email}

    this.serverService.loginCheck('https://crm.adluge.com/adluge-interview/angular/get-registration.php',data)
    .pipe(first())
    .subscribe({
        next: (res) => {
          if(res['success'] && res['data'].length > 0){
            this.lstProfileData =res['data'];
            this.dctProfileData = res['data'][0]

          }
          // Swal.fire("Success!","Registration successful","success")
            // this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
            Swal.fire("Error!",error,"error")
        }
    });

  }

  logout () {
    localStorage.removeItem('email')
    this.router.navigate(['/login/login']);
  }

}
