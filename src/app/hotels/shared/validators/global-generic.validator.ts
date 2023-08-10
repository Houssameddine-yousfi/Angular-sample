import { FormGroup } from "@angular/forms";

export class GlobalGenericValidator {
  constructor(
    private validatorMessages: { [key: string]: { [key: string]: string; }; }
  ){  }


  public createErrorMessage(container: FormGroup,isFormSubmitted?:  boolean): {[key:string] : string} {
    const errorMessage :{[key:string] : string} = {};

    for (const controlName in container.controls) {

      /* not sure what this is does */
      if (!container.controls.hasOwnProperty(controlName))
        continue;

      const selectedControl = container.controls[controlName];
      errorMessage[controlName] = '';

      // if no errors for the current control, go to the next
      if(!selectedControl.errors)
        continue;

      // if the user didn't change anything, the errors are old
      // no need to display them go to the next control
      if (!(selectedControl.dirty || selectedControl.touched || isFormSubmitted))
        continue;

      Object.keys(selectedControl.errors).map((errorMessageKey: string) => {
        if (this.validatorMessages[controlName][errorMessageKey]) {
          errorMessage[controlName] += this.validatorMessages[controlName][errorMessageKey] + ' ';
        }
      })

    }

    return errorMessage;
  }
}
