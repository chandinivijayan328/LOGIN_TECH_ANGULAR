import { Component, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  forgotFform :  FormGroup;
  loading = false;
  submitted = false;
  blnForgot =false;
  formInput = ['input1', 'input2', 'input3', 'input4'];
  nextClicked = false;
  @ViewChildren('formRow') rows: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serverService: ServerService,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  this.forgotFform = this.toFormGroup(this.formInput);

  }
  get f() { return this.form.controls; }
  get fp() { return this.forgotFform.controls; }


  toFormGroup(elements) {
    const group: any = {};
    elements.forEach(key => {
      group[key] = new FormControl('', Validators.required);
    });
    group['email'] = new FormControl('', Validators.required)

    return new FormGroup(group);
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    // this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.loading = true;
    var data = {
      "username": this.f.email.value,
      "password" : this.f.password.value

    }
    this.serverService.loginCheck('https://crm.adluge.com/adluge-interview/angular/login.php', data)
        .pipe(first())
        .subscribe({
            next: (res) => {
                if(res['success']){
                  localStorage.setItem("email",this.f.email.value)
                  this.router.navigate(['/user'], { relativeTo: this.route });

                }
                else{
                  Swal.fire("Warning","Please Enter correct credentials","error");                
                }
            },
            error: error => {
                Swal.fire("Error!",error,"error")
                this.loading = false;
            }
        });
  }

  keyUpEvent(event, index) {
    let pos = index;
    if (event.keyCode === 8 && event.which === 8) {
     pos = index - 1 ;
    } else {
     pos = index + 1 ;
    }
    if (pos > -1 && pos < this.formInput.length ) {
     this.rows._results[pos].nativeElement.focus();
    }
   }
   resetForm(){
     this.form.reset();
     this.loading=false;
   }

}
