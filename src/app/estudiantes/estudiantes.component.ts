import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent {

  estudianteForm: FormGroup;

  nombreControl = new FormControl(
  '',
  [
    Validators.required,
    Validators.minLength(3)
  ]
  );
  apellidoControl = new FormControl('', [
    Validators.required,
  ]);
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
    this.atSignValidator()
  ]);
  messageControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
    Validators.maxLength(30)
  ]);
  phoneControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(8),
    this.startsWithValidator()
  ])
  //grupos individuales y luego los agrupamos en un form group

  constructor() {
    this.estudianteForm = new FormGroup({
      //grupo de controles
      nombre: this.nombreControl,
      apellido: this.apellidoControl,
      email: this.emailControl,
      message: this.messageControl,
      phone: this.phoneControl,
    });
  }

  onSubmit(): void {
    console.log(this.estudianteForm.value);

    if (this.estudianteForm.valid){
      this.estudianteForm.reset();
      console.log(this.estudianteForm.value)
    } else {
      this.estudianteForm.markAllAsTouched();
      alert('Invalid');
    }
  }

   atSignValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value?.includes('@')) {
        return {
          atSign: true
        }
      }
      return null;
    }

  }

  startsWithValidator(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value?.startsWith('11')) {
        return {
          startsWith: true
        }
      }
      return null;
    }
  }


}
