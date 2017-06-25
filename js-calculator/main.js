function perfom_operation(op1, op2, operand){
  op1 = Number(op1);
  op2 = Number(op2);
  switch (operand) {
    case '+':
      return op1 + op2;
    case '-':
      return op1 - op2;
    case 'x':
      return op1 * op2;
    case '/':
      return op1 / op2;
    case '%':
      return op1 % op2;
  }
}

function greater(op1, op2) {
  if (op1 == 'x'){
    return true;
  }
  if (op2 == 'x'){
    return false;
  }
  if (op1 == '/'){
    return true;
  }
  if (op2 == '/'){
    return false;
  }
  if (op1 == '+'){
    return true;
  }
  if (op2 == '+'){
    return false;
  }
  return true;
}
var values = [];
var operands = [];

function clearStack() {
  values.length = 0;
  operands.length = 0;
}

function calculateValue() {
  var ans = '';
  if (values.length == 1){
    ans = values[0];
  } else {
    ans = 0;
  }

  while (operands.length != 0) {
    console.log(operands, values);
    if (operands.length == 1){
      ans = perfom_operation(values[0], values[1], operands[0]);
      operands.splice(0, 1);
      values.splice(0, 2);
      values.unshift(ans);
    } else if (greater(operands[0], operands[1])){
      ans = perfom_operation(values[0], values[1], operands[0]);
      values.splice(0, 2);
      operands.splice(0, 1);
      values.unshift(ans);
    } else {
      ans = perfom_operation(values[1], values[2], operands[1]);
      values.splice(1, 2);
      operands.splice(1, 1);
      values.splice(1, 0, ans);
    }
    if (ans == Infinity || ans !== ans){
      clearStack();
      return ans;
    }
  }
  clearStack();
  values.push(ans);
  return ans;
}

function isOperator(v){
  return (v === 'x' || v === '/' || v === '+' || v === '-' || v === '%');
}

function pushValue(val) {
  console.log(val);
  if (val == 'AC' || val == 'CE'){
    clearStack();
    updateDisplay(' ');
    return;
  } else if (val == '='){
    var ans = calculateValue();
    if (ans !== ans || ans == Infinity){
      updateDisplay('NAN');
    } else {
      updateDisplay(ans);
    }

    return;
  }
  if (isOperator(val)){
    if (values.length == 1 + operands.length){
      operands.push(val);
      updateStackDisplay(' ' + val + ' ');
      return true;
    }
  } else {
    if (values.length > operands.length){
      values[values.length - 1] += val;
      updateStackDisplay(val);
      return true;
    } else if (values.length == operands.length){
      values.push(val);
      updateStackDisplay(val);
      return true;
    }
  }
  return false;
}

function updateStackDisplay(val) {
  var current = $('.ext-muted').text()+ val;
  $('.ext-muted').text(current);
}

function updateDisplay(val) {
  $('#answer').text(val);
  $('.ext-muted').text(val);
}
