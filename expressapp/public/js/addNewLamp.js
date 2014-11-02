

$("a.add-new-control").click(function(){
   addNewLamp();
 });

function addNewLamp() {
  console.log("*** adding a new lamp ***");
  var ctrl_name = $( "#ctrl-name").val().toLowerCase();
  var ctrl_type = $( "#ctrl-type option:selected").text().toLowerCase();
  var ctrl_brand = $( "#ctrl-brand option:selected").text().toLowerCase();
  var ctrlToValidate = {name:ctrl_name, type:ctrl_type, brand:ctrl_brand};
  var ctrl = validateInput(ctrlToValidate);
  addLamp(ctrl);
};

function validateInput(ctrlToValidate){

  if(ctrlToValidate.type == "on/off"){
    ctrlToValidate.type = "simple";
  }
  ctrlToValidate.state = 0; // set state to off as first value

  console.log(ctrlToValidate.name);
  console.log(ctrlToValidate.type);
  console.log(ctrlToValidate.brand);
  console.log(ctrlToValidate.state);
  return ctrlToValidate;
};
