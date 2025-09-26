import { AbstractControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

type FieldErrorMessages = {
  [field: string]: {
    [errorKey: string]: string;
  };
};

/**
 * Helper para validar campos
 * @param form FormGroup
 * @param fieldName string
 * @return boolean
 */
export function isInvalidField(form: FormGroup, fieldName: string): boolean {
  const control = form.get(fieldName);
  return !!(control && control.invalid && (control.dirty || control.touched));
}


/**
 * Helper para mostrar errores de validación
 * @param form FormGroup
 * @param fieldName string
 * @param customMessages FieldErrorMessages
 * @return string
 */
export function getValidationMessage(form: FormGroup, fieldName: string, customMessages?: FieldErrorMessages): string {

  const control = form.get(fieldName);
  if (!control || !control.errors) return '';

  for (const errorKey in control.errors) {
    const fieldMessages = customMessages?.[fieldName];

    if (fieldMessages && fieldMessages[errorKey]) {
      return fieldMessages[errorKey];
    }


    switch (errorKey) {
      case 'required':
        return '*Este campo es requerido';
      case 'pattern':
        return '*Formato no válido';
      case 'min':
        return `*El valor mínimo permitido es ${control.errors['min']?.min}`;
      // case 'max':
      //   return `El valor máximo permitido es ${control.errors['max']?.max}`;
      // case 'maxlength':
      //   return `Máximo ${control.errors['maxlength']?.requiredLength} caracteres`;
      // case 'minlength':
      //   return `Mínimo ${control.errors['minlength']?.requiredLength} caracteres`;
    }
  }

  return '';
}

/**
 * Helper para activar o desactivar campos en especifico
 * @param form FormGroup
 * @param enabledFields string[]
 * @param enable boolean
 * @return void
 */
export function toggleFields(
  form: FormGroup,
  fields: string | string[],
  enable: boolean
): void {
  const fieldList = Array.isArray(fields) ? fields : [fields];

  fieldList.forEach(fieldName => {
    const control = form.get(fieldName);

    if (!control) return;

    enable ? control.enable() : control.disable();
  });
}


/**
 * Resetear ciertos campos del formulario
 * @param form FormGroup
 * @param fields string[] | string
 * @return void
 */
export function resetFieldsForm(form: FormGroup, fields: string | string[]): void {

  const fieldList = Array.isArray(fields) ? fields : [fields];
  fieldList.forEach(fieldName => {
    const control = form.get(fieldName);

    if (!control) return;

    control.reset();
  });
}


/**
 * Eliminar valiudaciones del formulario
 * @param form FormGroup
 * @param fields string[] | string
 * @param validatorToRemove
 * @return void
 */
export function toggleValidators(
  form: FormGroup,
  fields: string | string[],
  validatorsToToggle: ValidatorFn | ValidatorFn[],
  remove: boolean = true
): void {
  const fieldList = [fields].flat();
  const validatorsList = [validatorsToToggle].flat();

  fieldList.forEach(fieldName => {
    const control: AbstractControl | null = form.get(fieldName);
    if (!control) return;

    // Obtener lista actual de validadores (Angular los guarda en _rawValidators)
    const currentValidators: ValidatorFn[] = (control as any)._rawValidators || [];

    let newValidators: ValidatorFn[];

    if (remove) {
      // Eliminar todos los especificados
      newValidators = currentValidators.filter(v => !validatorsList.includes(v));

      // Si quitamos required, resetear el valor del control
      if (validatorsList.includes(Validators.required)) {
        control.reset();
      }
    } else {
      // Agregar evitando duplicados
      const toAdd = validatorsList.filter(v => !currentValidators.includes(v));
      newValidators = [...currentValidators, ...toAdd];
    }

    control.setValidators(newValidators);
    control.updateValueAndValidity();
  });
}

/**
 * Previene que se ingresen valores negativos (signo "-")
 * @param event KeyboardEvent
 * @return void
 */
export function restrictNegativeValues(event: KeyboardEvent): void {
  if (event.key === '-' || event.key.toLowerCase() === 'e') {
    event.preventDefault();
  }
}
