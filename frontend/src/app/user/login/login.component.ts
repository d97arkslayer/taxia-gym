import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  private formSubmitAttempt: boolean;
  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService, public router: Router, private __service: UserService) { }

  ngOnInit() {
    sessionStorage.clear();
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  isValidForm() {
    return this.form.valid;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  getErrorMessagePass() {
    return this.form.get('password').hasError('required') ? 'Debe escribir su contraseña' :
      '';
  }

  getErrorMessageEmail() {
    return this.form.get('email').hasError('required') ? 'Debe escribir su usuario' :
      this.form.get('email').hasError('invalidEmailAddress') ? 'Usuario incorrecto' :
        '';
  }

  onSubmit() {
    this.spinner.show();
    this.__service.signIn(this.form.value).subscribe(result => {
      sessionStorage.setItem('token', result['token']);
      this.router.navigateByUrl('home');
      this.spinner.hide();
    }, error => {
      console.log('error', error);
      this.spinner.hide();
    });
  }

}
