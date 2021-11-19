import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
export class CustomValidators {

  static NoSpace(control: FormControl): ValidationErrors | null {
    if ((<string>control.value).indexOf(' ') >= 0)
      return { NoSpaceInValue: true };
    else return null;
  }

  static ShoudlBeUnique(control:AbstractControl) : Promise<ValidationErrors|null> | Observable<ValidationErrors|null>{
    return new Promise((resolve,rejects)=>{
      setTimeout(() => {
        if(control.value==='a@a.com')
          return resolve({'ShouldBeUnique':true})
        else
          return resolve(null);
        }, 2000);
    })
  }
}
