"use strict";

//"use strict";
var toBeCalculated = "",
    array = [],
    answer = undefined,
    stored_number = false,
    number_val = undefined,
    calc_val = undefined,
    first_is_zero = false,
    just_nums = "",
    regex_calc_symb = /(\+|\/|\-|\*)/g,
    answer_ = document.getElementById("answer");

function check_if_length_over_21() {
  if (toBeCalculated.length < 20) {
    answer_.style.fontSize = "25px";
  }
  if (toBeCalculated.length >= 20 && toBeCalculated.length <= 59) {
    answer_.style.fontSize = "16px";
    //answer_.stlye.
  }
}

//button click between 1-9 gets the value of the button id and adds it to string.
function add_one_to_nine(clicked_id) {
  check_if_length_over_21();
  if (toBeCalculated.length > 59) {
    return;
  }
  number_val = clicked_id;

  if (just_nums.charAt(0) === "0" && just_nums.length === 1) {
    just_nums = "";
    toBeCalculated = toBeCalculated.slice(0, -1);
    toBeCalculated += number_val;
    just_nums += number_val;
    answer_.innerHTML = toBeCalculated;
  } else {
    toBeCalculated += number_val;
    just_nums += number_val;
    answer_.innerHTML = toBeCalculated;
  }
}
function check_stored_number() {
  if (stored_number) {
    answer_.innerHTML = "0";
    stored_number = "";
  } else {
    return;
  }
  answer_.innerHTML = toBeCalculated;
}
function add_sub_div_or_mul(one_of_the_four) {
  if (toBeCalculated.length > 59) {
    return;
  }
  check_if_length_over_21();
  check_stored_number();
  var e = toBeCalculated.charAt(toBeCalculated.length - 1);

  calc_val = one_of_the_four;
  if (e === "+" || e === "/" || e === "*" || e === "-" || !e.length) {
    return;
  } else {
    just_nums = "";
    toBeCalculated += calc_val;
    answer_.innerHTML = toBeCalculated;
  }
}
function maybe_add_zero() {
  if (toBeCalculated.length > 59) {
    return;
  }
  check_if_length_over_21();
  if (just_nums.length === 0) {
    toBeCalculated += "0";
    just_nums += "0";
    answer_.innerHTML = toBeCalculated;
  }
  if (just_nums.charAt(0) === "0") {
    return;
  } else {
    toBeCalculated += "0";
    just_nums += "0";
    answer_.innerHTML = toBeCalculated;
  }
}

function maybe_add_dot() {
  if (toBeCalculated.length > 59) {
    return;
  }
  check_if_length_over_21();

  if (just_nums.length === 0) {
    return;
  }
  if (just_nums.indexOf(".") > -1) {
    return;
  } else {
    toBeCalculated += ".";
    just_nums += ".";
  }
  answer_.innerHTML = toBeCalculated;
}

// Press the "AC" button and it displays "0" and then the string is back to "" for next input.
var deleteArray = function deleteArray() {
  toBeCalculated = "";
  just_nums = "";
  check_if_length_over_21();
  answer_.innerHTML = "0";
};

function cancelLastInput() {
  if (regex_calc_symb.test(toBeCalculated.charAt(toBeCalculated.length - 1))) {
    toBeCalculated = toBeCalculated.slice(0, -1);
    just_nums = get_last_string_nums();
    answer_.innerHTML = toBeCalculated;
  } else {
    just_nums = get_last_string_nums();
    var just_nums_length = just_nums.length;
    toBeCalculated = toBeCalculated.slice(0, -just_nums_length);
    answer_.innerHTML = toBeCalculated;
  }
}
function get_last_string_nums() {
  var plus_ = toBeCalculated.lastIndexOf("+"),
      minus_ = toBeCalculated.lastIndexOf("-"),
      times_ = toBeCalculated.lastIndexOf("*"),
      div_ = toBeCalculated.lastIndexOf("/");
  var e = [];
  e.push(plus_, minus_, times_, div_);
  e.sort();
  var j = e[e.length - 1];
  var temp = toBeCalculated;
  var i = toBeCalculated.length - 1;
  var z = "";
  do {
    z += temp.charAt(temp.length - 1);
    temp = temp.slice(0, -1);
    i--;
  } while (i > j);
  return z.split("").reverse().join("");
}

// use eval to evaluate string
var evaluateArray = function evaluateArray() {
  var h = toBeCalculated.charAt(toBeCalculated.length - 1);
  if (h === "+" || h === "-" || h === "*" || h === "/") {
    stored_number = "";
    return;
  }
  if (h.length === 0) {
    return;
  }
  if (!Number(eval(toBeCalculated))) {
    return;
  } else {
    var _answer = eval(toBeCalculated);
    stored_number = _answer;
    toBeCalculated = _answer.toString();
    check_if_length_over_21();
    just_nums = "";
    answer_.innerHTML = _answer;
    toBeCalculated = "";
  }
};
// "OFF" button displays empty string and sets string to empty string
var turnOff = function turnOff() {
  toBeCalculated = "";
  just_nums = "";
  answer_.innerHTML = "";
};