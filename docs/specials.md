# Special Validators

These are all the available special validators of the library.

> :bulb: The validator name is the value you must use in the attribute [`fieldValidateAttribute`](./types.md#fieldvalidateattribute).

## Table of contents

- [Dependant validation](#dependant-validation)
- [Optional validation](#optional-validation)
- [EC validators](#ec-validators)
  - [Cédula](#cédula)
  - [RUC](#ruc)

## Dependant validation

Makes the field validate only if the value of the target matches the specified value.
**Validator name**: is not a validator, has no name.
**Works on**: all the fields.
**Additional attributes**:

- `data-fv-depends-on`: the name of the target field. ***Is required***
- `data-fv-depends-on-value`: the value to match.
  *This attribute is optional; if omitted, only checks if a value is present.*

Form submission validation can ignore a field if it has an dependant validation and the condition is not met.

>:warning:Cannot be used with `optional validation`.

## Optional validation

Makes the field validate only if a value is present.

**Validator name**: is not a validator, has no name.
**Works on**: all the fields.
**Additional attributes**:

- `data-fv-optional`: a boolean value to set optional validation. (As lowercase string)

Form submission validation can ignore a field if it has an optional validation and has no value.

>:warning:Cannot be used with `dependant validation`.

## EC validators

These are validators related to Ecuador.

### Cédula

Checks if the field value has a real cédula number.
**Validator name**: `ec_cedula`
**Works on**: text fields.

### RUC

Checks if the field value has a real RUC number.
**Validator name**: `ec_ruc`
**Works on**: text fields.
