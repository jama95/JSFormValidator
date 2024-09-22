# Special validators examples

The examples use the Bootstrap CSS classes and the default options.

## Table of contents

- [Dependant validation](#dependant-validation)
- [Optional validation](#optional-validation)
- [EC validators](#ec-validators)
  - [Cédula](#cédula)
  - [RUC](#ruc)

## Dependant validation

Read more about the validator [here](/docs/specials.md#dependant-validation).

```html
<div class="fv-group">
  <label class="form-label">Target</label>
  <input type="text" name="t" class="form-control" data-fv-validators="required">
</div>
<div class="fv-group">
  <label class="form-label">Dependant</label>
  <input type="text" name="d" class="form-control" data-fv-validators="required" data-fv-depends-on="t" data-fv-depends-on-value="anything">
</div>
```

## Optional validation

Read more about the validator [here](/docs/specials.md#optional-validation).

```html
<div class="fv-group">
  <label class="form-label">Optional</label>
  <input type="text" name="o" class="form-control" data-fv-validators="required" data-fv-optional="true">
</div>
```

## EC validators

### Cédula

Read more about the validator [here](/docs/specials.md#cédula).

```html
<div class="fv-group">
  <label class="form-label">Cédula</label>
  <input type="text" name="c" class="form-control" data-fv-validators="ec_cedula">
</div>
```

### RUC

Read more about the validator [here](/docs/specials.md#rucvalidation).

```html
<div class="fv-group">
  <label class="form-label">RUC</label>
  <input type="text" name="r" class="form-control" data-fv-validators="ec_ruc">
</div>
```
