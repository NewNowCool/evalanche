# Evalanche Smart Forms API

Useful helpers to work with the evalanche smart forms API.

Currently only deals with the data aggregation from the form to submit to the API.

https://help.evalanche.cloud/hc/de/articles/360045204331-SmartForms-API-REST-Beta

## Usage

Generate the form and add the corresponding data type.
When submitting the form, use `getData(formElement)` to aggregate all form field data and POST it to the API.
See `impl/` for an example implementation.

### Data Types
```
data-evalanche-type="simple"
data-evalanche-type="boolean"
data-evalanche-type="checkbox"
data-evalanche-type="radio"
data-evalanche-type="date"
```

### Implementation Example
```html
<input type="text" name="text" data-evalanche-type="simple" />
<textarea name="textarea" data-evalanche-type="simple"></textarea>
<select name="select" data-evalanche-type="simple">
  <option value="">empty</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
</select>
<input type="checkbox" name="boolean" value="1" data-evalanche-type="boolean" />
<input
  type="checkbox"
  name="checkbox"
  value="1"
  data-evalanche-type="checkbox"
/>
<input
  type="checkbox"
  name="checkbox"
  value="2"
  data-evalanche-type="checkbox"
/>
<input type="radio" name="radio" value="1" data-evalanche-type="radio" />
<input type="radio" name="radio" value="2" data-evalanche-type="radio" />
<input type="date" name="date" data-evalanche-type="date" />
<input type="datetime-local" name="datetime" data-evalanche-type="date" />
```
