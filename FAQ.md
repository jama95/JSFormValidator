# F.A.Q

>:memo:If something is wrong and you do not know what it is, check the browser console, the library logs errors there.

## Why the library does not include all its own validation styles classes?

Because I wanted it to be as customizable as possible, and if the classes already existed, why create new ones?

## Why some CSS colors and/or styles are not shown?

It may be because the library does not include classes related to the validation, by default uses the styles from Bootstrap.
So if you want to use the library without changing the options, you need to include bootstrap in your project, otherwise you should to change all validation class names in the options to the ones you want.

If all the options are okay, check that all the CSS files are included correctly.

## Why the default styles classes are from Bootstrap?

Because is my favorite 🙂, but you are completely free to use another one, the library functionality will not be affected by the CSS styles.

## Can i change the default colors of the library styles?

Yes, you can change the colors by doing something like this, in a new CSS file or in a `style` tag:

```css
:root{
  --valid: green;
  --invalid: red;
}
```

These are all the available color variables related to the password info and strength meter:

- `--valid`: password info color for &#10003;.
- `--invalid`: password info color for &#10005;.
- `--very-weak`: strength meter color.
- `--weak`: strength meter color.
- `--normal`: strength meter color.
- `--strong`: strength meter color.
- `--very-strong`: strength meter color.

These are all the available color variables related to the suggestions.

- `--sgActiveBG`: background color of the active/hover option.
- `--sgActiveColor`: text color of the active/hover option.

These are all the available colors variables related to the TextArea length restriction.

- `--lengthRestrictColor`: text color of the info.

There are other available variables that allow you to make some changes without creating new classes.

- `--sgBorderWidth`: border width of the suggestions for the container and options.
- `--sgBorderRadius`: border radius of the suggestions container.

## Does the library support dark mode?

Yes, it does. The suggestions, password info and TextArea length restriction will take the background color of the `<body>`.

>:warning:Validations use external classes, so make sure they are compatible.

## Why do not validations work?

The main reasons for this could be bad configuration or wrong attribute names or values. To ensure that validations always work correctly, make sure that the following conditions are met:

- The form id list must not include CSS selectors.
- Each field to be validated must have a name attribute.
- New validators should be added before call a validate function.
- You are using the correct attribute names.
- You are using the correct default values.

>:warning:If you change the attribute name in the options, be sure to use the new ones.

Do not forget to read the [validator docs](./validators.md) and see the [examples](./examples/validators.md).

## Why do not modifiers work?

This may be because all modifiers depend on validation functions, so it is necessary to use `validate` or `fromJSON` even if no validators are configured. To ensure that validations always work correctly, make sure that the following conditions are met:

- The form id list must not include CSS selectors.
- New modifiers should be added before call a validate function.
- You are using the correct attribute names.
- You are using the correct default values.

>:warning:If you change the attribute name in the options, be sure to use the new ones.

Do not forget to read the [modifier docs](./modifiers.md) and see the [examples](./examples/modifiers.md).

## Why do not validation events work?

It may be because the validation events should be added before calling a validate function, if added after, it will never work.

## Is the order in the list of validators important?

Yes, it is important, the validators will be triggered in the order you listed them.

>:memo:The same applies to modifiers and form list.
