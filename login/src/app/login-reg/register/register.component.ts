import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  lstFields=[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private serverService : ServerService,
  ) { }

  ngOnInit(): void {
    this.loadFormFields();
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  loadFormFields () {
    this.serverService.getLoginData('https://crm.adluge.com/adluge-interview/angular/get-registration-fields.php')
    .pipe(first())
    .subscribe({
        next: (res) => {
          if(res['success']){
          this.lstFields = res['data']
          this.form = this.toFormGroup(this.lstFields);
          this.form.controls['user_gender'].setValue('Male');


          }
          // Swal.fire("Success!","Registration successful","success")
        },
        error: error => {
            Swal.fire("Error!",error,"error")
            this.loading = false;
        }
    });

  }

    onSubmit() {

      // this.router.navigate(['/user'], { relativeTo: this.route });

        this.submitted = true;

        // reset alerts on submit
        // this.alertService.clear();
        console.log(this.form)

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.serverService.loginCheck('https://crm.adluge.com/adluge-interview/angular/save-registration.php',this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                  Swal.fire("Success!","Registration successful","success")

                  localStorage.setItem("email",this.form.controls.email.value)
                  this.router.navigate(['/user'], { relativeTo: this.route });
                },
                error: error => {
                    Swal.fire("Error!",error,"error")
                    this.loading = false;
                }
            });
    }




    toFormGroup(lstFields ) { // for adding form fields dynamically
      const group: any = {};
  
      lstFields.forEach(question => {
          if(question.validations.length > 0){
            var validators = []

            question.validations.forEach(valdtn => {
              if (valdtn.name == 'required')
              validators.push(Validators.required) //required validation
              if(valdtn.name == 'pattern')
              validators.push(Validators.pattern(valdtn.validator)) // pattern validation
              console.log(validators,"validation",question.name);
            });
            group[question.name] = new FormControl('',validators)


          }
          else{
            group[question.name] = new FormControl('')
          }
        
      });
      console.log(group);
      return new FormGroup(group);
    }
  
  

}
