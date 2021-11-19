import { CustomValidators } from './../../validators';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css'],
})
export class ReactiveFormComponent implements OnInit {
  constructor() {}

  // variables
  ErrorInForm = false;

  form = new FormGroup({
    personalInfo: new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
    }),
    email: new FormControl(
      '',
      Validators.required,
      CustomValidators.ShoudlBeUnique
    ),
    password: new FormControl('', [
      Validators.required,
      CustomValidators.NoSpace,
    ]),
    skills: new FormArray([]),
    subscribe: new FormControl(false),
  });
  get Email() {
    return this.form.get('email');
  }
  get Password() {
    return this.form.get('password');
  }
  onSubmit() {
    this.ErrorInForm = this.form.invalid;
    this.form.setErrors({
      ErrorInEmail: this.form.get('email')?.errors ? true : false,
      ErrorInPassword: this.form.get('password')?.errors ? true : false,
    });
    console.log(this.form);
    console.log(this.form.errors);
    console.log(this.form.value);
  }
  skills = (<FormArray>this.form.get('skills')).controls;
  onSkillEnter(e: HTMLInputElement) {
    (<FormArray>this.form.get('skills')).controls.push(
      new FormControl(e.value)
    );
    console.log((<FormArray>this.form.get('skills')).controls);
    e.value = '';
  }
  onSkillClick(skill: any) {
    console.log(skill);
    (<FormArray>this.form.get('skills')).controls.splice(
      this.skills.indexOf(new FormControl(skill)),
      1
    );
  }
  ngOnInit(): void {}
}
