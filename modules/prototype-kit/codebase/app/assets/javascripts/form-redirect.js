const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const check = urlParams.get('check');
const form = document.form;

console.log('hello')

function saveContinue() {
  if(form) {
    const action = form.action;
    if(check){
      form.action = "check-answers"
    } else {
      form.action = action
    }
  }
}

function saveExit() {
  console.log('exit')
  if(form) {
    form.action = '../tasklist'
  }
}
