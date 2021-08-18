const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const check = urlParams.get('check');
const form = document.form;

if(form) {
  const action = form.action;

  if(check){
    form.action = "check-answers"
  } else {
    form.action = action
  }
}
